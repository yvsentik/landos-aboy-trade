#!/bin/sh
# Обновление сайта на falkov-marketing.ru: забрать правки, собрать, залить статику.
# Контейнер falkov-marketing на сервере перезапускать не нужно.
set -e
cd "$(dirname "$0")"
. ~/.nvm/nvm.sh

retry() { for i in 1 2 3 4 5; do "$@" && return 0; sleep 5; done; return 1; }

git pull --ff-only
npm run build
retry rsync -az --delete -e "ssh -o ConnectTimeout=20" build/ root@91.236.199.84:/root/falkov-marketing/site/
echo "Готово: https://falkov-marketing.ru/"
