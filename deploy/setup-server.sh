#!/bin/bash
# Разовая настройка сервера (Ubuntu/Debian) под лендинг landos-aboy-trade.
# Запуск от root:  DOMAIN=example.ru BITRIX_WEBHOOK=https://.../rest/ID/KEY/ bash setup-server.sh
# Без DOMAIN сайт работает только по HTTP на IP. Без BITRIX_WEBHOOK / SMARTCAPTCHA_SERVER_KEY остаются прежние ключи (если были).
set -euo pipefail

DOMAIN=${DOMAIN:-}
BITRIX_WEBHOOK=${BITRIX_WEBHOOK:-}
SMARTCAPTCHA_SERVER_KEY=${SMARTCAPTCHA_SERVER_KEY:-}
REPO=https://github.com/yvsentik/landos-aboy-trade.git
SRC=/opt/landos
WEB=/var/www/landos

# 1. Пакеты: nginx, git, rsync, Node.js 24
apt-get update
apt-get install -y nginx git rsync curl ca-certificates certbot python3-certbot-nginx
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
systemctl restart landos-lead-api 2>/dev/null || true
echo "$NEW" > .deployed
echo "Выложен коммит $NEW"
EOF
chmod +x /usr/local/bin/landos-deploy

# 4. nginx
cat > /etc/nginx/sites-available/landos <<'EOF'
server {
    listen 80 default_server;
    server_name __SERVER_NAME__;
    root /var/www/landos;
    index index.html;

    # Заявки с сайта → сервис lead-api → Битрикс24
    # Проверка капчи (Яндекс SmartCaptcha) – тот же сервис
    location = /api/captcha {
        proxy_pass http://127.0.0.1:8787;
        proxy_set_header X-Real-IP $remote_addr;
        client_max_body_size 16k;
    }

    location = /api/lead {
        proxy_pass http://127.0.0.1:8787;
        proxy_set_header X-Real-IP $remote_addr;
        client_max_body_size 64k;
    }

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
sed -i "s/__SERVER_NAME__/${DOMAIN:-_}/" /etc/nginx/sites-available/landos
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

# 6.1 Сервис заявок lead-api (код – server/lead-api.mjs из репозитория)
mkdir -p /etc/landos
( umask 077; [ -f /etc/landos/lead-api.env ] || : > /etc/landos/lead-api.env )
# Обновить одну переменную в файле ключей, не трогая остальные
set_env() {
  [ -n "$2" ] || return 0
  grep -v "^$1=" /etc/landos/lead-api.env > /etc/landos/lead-api.env.tmp || true
  printf '%s=%s\n' "$1" "$2" >> /etc/landos/lead-api.env.tmp
  mv /etc/landos/lead-api.env.tmp /etc/landos/lead-api.env
}
set_env BITRIX_WEBHOOK "$BITRIX_WEBHOOK"
set_env SMARTCAPTCHA_SERVER_KEY "$SMARTCAPTCHA_SERVER_KEY"
chmod 600 /etc/landos/lead-api.env
cat > /etc/systemd/system/landos-lead-api.service <<'UNIT'
[Unit]
Description=Приём заявок с сайта и отправка в Битрикс24
After=network-online.target

[Service]
EnvironmentFile=/etc/landos/lead-api.env
ExecStart=/usr/bin/node /opt/landos/server/lead-api.mjs
Restart=always
RestartSec=3
DynamicUser=yes
NoNewPrivileges=yes

[Install]
WantedBy=multi-user.target
UNIT
systemctl daemon-reload
systemctl enable landos-lead-api
systemctl restart landos-lead-api
sleep 1
systemctl is-active landos-lead-api

# 7. Файрвол, если включён ufw
if command -v ufw >/dev/null && ufw status | grep -q active; then
  ufw allow 'Nginx Full'
fi

# 8. HTTPS через Let's Encrypt (продление — certbot.timer, ставится пакетом)
if [ -n "$DOMAIN" ]; then
  certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos \
    --register-unsafely-without-email --keep-until-expiring --redirect
  systemctl enable --now certbot.timer 2>/dev/null || true
  echo
  echo "Готово: https://$DOMAIN/"
else
  echo
  echo "Готово: http://$(hostname -I | awk '{print $1}')/"
fi
