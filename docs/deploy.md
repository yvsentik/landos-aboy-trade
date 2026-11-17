# Выкладка сайта агентства на falkov-marketing.ru

Инструкция для сессии Claude Code на компьютере Константина, где есть вход по SSH-ключу
на `root@91.236.199.84`. Облачная сессия, которая делала сайт, на этот сервер зайти не может.

## Что выкладываем

Сайт агентства из ветки `falkov-agency` репозитория `yvsentik/landos-aboy-trade`.
В этой ветке лежит только он, сборка кладёт сайт в корень домена:

```sh
source ~/.nvm/nvm.sh
npm ci
npm run build   # результат: build/
```

В `build/` лежит готовая статика: `index.html`, `seo-audit/`, `uslugi/`, `keysy/`,
`spb/`, `msk/`, `_app/`, `img/`, `video/`, `404.html`. Сервер нужен только чтобы её отдавать.

Проверка перед выкладкой: `npx serve build` и открыть главную, `/keysy/`, `/msk/`.

## Что известно о сервере

- `root@91.236.199.84` (Selectel). SSH иногда рвётся на старте соединения: команды повторять.
- Перед контейнерами стоит nginx-proxy с Let's Encrypt.
- Там же живут CRM (`falkov-crm`, `/root/crm`), kalispera и редиректы. **Их не трогать**,
  кроме одного: редирект `falkov-marketing.ru → marketingovoe-agentstvo-spb.ru` нужно снять –
  Константин попросил об этом прямо (17.11.2026).

## Шаги

Точное устройство nginx-proxy и редиректов в облачной сессии не проверялось. Сначала
посмотреть, как всё настроено, и только потом менять.

1. **Разведка, ничего не меняя.**
   ```sh
   ssh root@91.236.199.84 'docker ps --format "{{.Names}}\t{{.Image}}\t{{.Ports}}"'
   ssh root@91.236.199.84 'docker inspect falkov-crm --format "{{json .Config.Env}} {{json .NetworkSettings.Networks}}"'
   ```
   Из вывода понять: какие переменные задают домен и сертификат у `falkov-crm`
   (обычно `VIRTUAL_HOST`, `LETSENCRYPT_HOST`), в какой docker-сети он стоит и какой
   контейнер сейчас отвечает за `falkov-marketing.ru` (редирект).

2. **Залить статику.**
   ```sh
   ssh root@91.236.199.84 'mkdir -p /root/falkov-marketing/site'
   rsync -az --delete build/ root@91.236.199.84:/root/falkov-marketing/site/
   ```

3. **Снять редирект** с `falkov-marketing.ru` и `www.falkov-marketing.ru` в том контейнере или
   конфиге, где он найден на шаге 1. Остальные редиректы оставить как есть.

4. **Поднять контейнер со статикой** по образцу `falkov-crm`: та же сеть, те же имена
   переменных. Если это стандартная связка nginx-proxy + acme-companion, получится так:
   ```sh
   docker run -d --name falkov-marketing --restart unless-stopped \
     --network <сеть как у falkov-crm> \
     -e VIRTUAL_HOST=falkov-marketing.ru,www.falkov-marketing.ru \
     -e LETSENCRYPT_HOST=falkov-marketing.ru,www.falkov-marketing.ru \
     -v /root/falkov-marketing/site:/usr/share/nginx/html:ro \
     nginx:alpine
   ```
   Стандартный конфиг `nginx:alpine` отдаёт `index.html` из папок, этого достаточно:
   все адреса сайта заканчиваются на `/`. Для страницы ошибки добавить в конфиг
   `error_page 404 /404.html;`.

5. **Проверить** в браузере через Claude in Chrome (без curl):
   `https://falkov-marketing.ru/`, `/seo-audit/`, `/uslugi/`, `/keysy/`, `/spb/`, `/msk/`.
   На главной: открывается окно по кнопке «Форма заявки», переключатель Яндекс / Google
   меняет запросы, видео запускается.

## Обновление сайта потом

После правок в репозитории: `git pull`, `npm run build`, шаг 2 (rsync).
Контейнер перезапускать не нужно. Удобно завести в репозитории `deploy.sh`
из этих трёх команд, когда шаги проверены на сервере.

## Что ещё не сделано

- Формы заявок никуда не отправляют данные (в коде стоит `TODO`). Заявки приходят только
  через Telegram и Макс.
- Счётчика Метрики на сайте агентства нет.
- Старый адрес `fotooboi.oboitrade.ru/agency/` продолжает работать. После переезда его
  стоит закрыть или перенаправить на новый домен, чтобы не было двух копий сайта в поиске.
