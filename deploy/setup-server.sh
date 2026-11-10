#!/bin/bash
# Разовая настройка сервера (Ubuntu/Debian) под лендинг landos-aboy-trade.
# Запуск от root:  bash setup-server.sh
set -euo pipefail

REPO=https://github.com/yvsentik/landos-aboy-trade.git
SRC=/opt/landos
WEB=/var/www/landos

# 1. Пакеты: nginx, git, rsync, Node.js 24
apt-get update
apt-get install -y nginx git rsync curl ca-certificates
if ! node -v 2>/dev/null | grep -q '^v24'; then
  curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
  apt-get install -y nodejs
fi

# 2. Исходники
[ -d "$SRC/.git" ] || git clone "$REPO" "$SRC"
mkdir -p "$WEB"

# 3. Скрипт деплоя: собирает и выкладывает, только если в main появился новый коммит
cat > /usr/local/bin/landos-deploy <<'EOF'
#!/bin/bash
set -euo pipefail
exec 9>/run/landos-deploy.lock
flock -n 9 || exit 0
cd /opt/landos
git fetch -q origin main
NEW=$(git rev-parse origin/main)
OLD=$(cat .deployed 2>/dev/null || true)
if [ "$NEW" = "$OLD" ] && [ "${1:-}" != "--force" ]; then exit 0; fi
git reset -q --hard origin/main
npm ci --no-audit --no-fund
npm run build
rsync -a --delete build/ /var/www/landos/
echo "$NEW" > .deployed
echo "Выложен коммит $NEW"
EOF
chmod +x /usr/local/bin/landos-deploy

# 4. nginx
cat > /etc/nginx/sites-available/landos <<'EOF'
server {
    listen 80 default_server;
    server_name _;
    root /var/www/landos;
    index index.html;

    location /_app/immutable/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    location / {
        try_files $uri $uri/ $uri.html /404.html;
    }

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
}
EOF
rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/landos /etc/nginx/sites-enabled/landos
nginx -t
systemctl enable --now nginx
systemctl reload nginx

# 5. Автодеплой: проверка репозитория каждую минуту
cat > /etc/systemd/system/landos-deploy.service <<'EOF'
[Unit]
Description=Сборка и выкладка landos-aboy-trade
After=network-online.target

[Service]
Type=oneshot
ExecStart=/usr/local/bin/landos-deploy
EOF
cat > /etc/systemd/system/landos-deploy.timer <<'EOF'
[Unit]
Description=Проверка новых коммитов landos-aboy-trade раз в минуту

[Timer]
OnBootSec=1min
OnUnitActiveSec=1min

[Install]
WantedBy=timers.target
EOF
systemctl daemon-reload
systemctl enable --now landos-deploy.timer

# 6. Первая выкладка
/usr/local/bin/landos-deploy --force

# 7. Файрвол, если включён ufw
if command -v ufw >/dev/null && ufw status | grep -q active; then
  ufw allow 'Nginx Full'
fi

echo
echo "Готово: http://$(hostname -I | awk '{print $1}')/"
