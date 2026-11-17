// Приём заявок с сайта: контакт + сделка в Битрикс24 (воронка «Лендинг фрески + фотообои»).
// CRM работает в простом режиме (без лидов), поэтому сразу создаём сделку в нужной воронке.
// Без зависимостей: Node 18+ (встроенный fetch). Слушает только 127.0.0.1, наружу – через nginx /api/lead.
// Адрес вебхука берётся из переменной окружения BITRIX_WEBHOOK (файл /etc/landos/lead-api.env), в репозитории его нет.
// Своя капча «выберите похожий цвет»: GET /api/captcha – задание, POST /api/captcha – проверка ответа.
import { createServer } from 'node:http';
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const PORT = Number(process.env.PORT || 8787);
const WEBHOOK = (process.env.BITRIX_WEBHOOK || '').replace(/\/+$/, '');
const SITE = 'fotooboi.oboitrade.ru';
// Воронка и стадия сделки: 6 – «Лендинг фрески + фотообои», C6:NEW – «Новая»
const CATEGORY = Number(process.env.BITRIX_DEAL_CATEGORY || 6);
const STAGE = process.env.BITRIX_DEAL_STAGE || `C${CATEGORY}:NEW`;
// Секрет подписи заданий капчи: из окружения или случайный при запуске сервиса
const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET || randomBytes(32).toString('hex');

if (!WEBHOOK) {
	console.error('BITRIX_WEBHOOK не задан – заявки не будут уходить в CRM');
}

// Простое ограничение частоты: не больше 20 заявок с одного IP за 10 минут (офис может сидеть за одним IP)
const hits = new Map();
function limited(ip) {
	const now = Date.now();
	const list = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
	list.push(now);
	hits.set(ip, list);
	return list.length > 20;
}

const clip = (v, n = 500) => String(v ?? '').trim().slice(0, n);
const fmt = (n) => Math.round(Number(n) || 0).toLocaleString('ru-RU');

const FORMS = {
	lead: 'Заявка с сайта',
	oneclick: 'Купить в 1 клик',
	cart: 'Заказ из корзины'
};

// Человеческое название страницы, с которой пришла заявка
const PAGES = {
	'/': 'Главная',
	'/cart/': 'Корзина',
	'/catalog/': 'Каталог',
	'/fotooboi/': 'Фотообои',
	'/freski/': 'Фрески',
	'/oboi-na-zakaz/': 'Обои на заказ',
	'/ceny/': 'Цены',
	'/dostavka/': 'Доставка и монтаж',
	'/probnik/': 'Бесплатный пробник',
	'/proizvodstvo/': 'Производство',
	'/kontakty/': 'Контакты'
};

function pageName(url, items) {
	let path = '/';
	try {
		path = new URL(String(url)).pathname;
	} catch {
		/* нет адреса – считаем главной */
	}
	if (!path.endsWith('/')) path += '/';
	if (PAGES[path]) return PAGES[path];
	if (path.startsWith('/catalog/')) {
		const art = items[0]?.art ? ` арт. ${clip(items[0].art, 40)}` : '';
		return `Карточка фрески${art}`;
	}
	return path;
}

function buildLead(d) {
	const phone = clip(d.phone, 40);
	const digits = phone.replace(/\D/g, '');
	if (digits.length < 10) throw new Error('phone');
	const form = FORMS[d.form] ? d.form : 'lead';
	const items = (Array.isArray(d.items) ? d.items.slice(0, 30) : []).map((i) => {
		const qty = Math.max(1, Math.min(99, Math.round(Number(i.qty) || 1)));
		const sum = Math.round(Number(i.sum) || 0);
		return {
			title: clip(i.title, 120),
			art: clip(i.art, 40),
			w: clip(i.w, 6),
			h: clip(i.h, 6),
			texture: clip(i.texture, 60),
			perM: Math.round(Number(i.perM) || 0),
			qty,
			sum,
			url: clip(i.url, 300)
		};
	});
	const page = pageName(d.page, items);
	const pcs = items.reduce((n, i) => n + i.qty, 0);

	const lines = [`Откуда: ${page} (${FORMS[form]})`];
	if (d.size) lines.push(`Размер стены: ${clip(d.size, 80)}`);
	if (d.city) lines.push(`Город: ${clip(d.city, 120)}`);
	if (d.comment) lines.push(`Комментарий: ${clip(d.comment, 1500)}`);
	if (items.length) {
		lines.push('', `Позиций: ${items.length}, всего штук: ${pcs}`);
		items.forEach((i, n) => {
			lines.push(
				`${n + 1}. ${i.title} арт. ${i.art} – ${i.w}×${i.h} см, ${i.texture || 'фактура не выбрана'}, ` +
					`${fmt(i.perM)} ₽/м², ${i.qty} шт. = ${fmt(i.sum)} ₽` +
					(i.url ? `\n   ${i.url}` : '')
			);
		});
		if (d.total) lines.push(`Итого: ${fmt(d.total)} ₽`);
	}
	if (d.page) lines.push('', `Адрес страницы: ${clip(d.page, 300)}`);

	// Строки товаров для вкладки «Товары» сделки
	const rows = items.map((i) => ({
		PRODUCT_NAME: `${i.title} арт. ${i.art}, ${i.w}×${i.h} см${i.texture ? `, ${i.texture}` : ''}`,
		PRICE: Math.round(i.sum / i.qty),
		QUANTITY: i.qty
	}));

	const utm = d.utm && typeof d.utm === 'object' ? d.utm : {};
	const source = form === 'lead' ? 'WEB' : 'STORE';
	const name = clip(d.name, 100) || 'Без имени';
	return {
		phone,
		rows,
		contact: {
			NAME: name,
			PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }],
			SOURCE_ID: source,
			SOURCE_DESCRIPTION: SITE,
			OPENED: 'Y'
		},
		deal: {
			TITLE: (form === 'cart' ? FORMS.cart : `${FORMS[form]}: ${page}`) + (pcs ? ` – ${pcs} шт.` : ''),
			CATEGORY_ID: CATEGORY,
			STAGE_ID: STAGE,
			SOURCE_ID: source,
			SOURCE_DESCRIPTION: `${SITE}: ${page}`,
			COMMENTS: [`Имя: ${name}`, `Телефон: ${phone}`, ...lines].join('\n'),
			OPPORTUNITY: d.total ? Math.round(Number(d.total) || 0) : undefined,
			CURRENCY_ID: 'RUB',
			OPENED: 'Y',
			UTM_SOURCE: clip(utm.utm_source, 100) || undefined,
			UTM_MEDIUM: clip(utm.utm_medium, 100) || undefined,
			UTM_CAMPAIGN: clip(utm.utm_campaign, 100) || undefined,
			UTM_CONTENT: clip(utm.utm_content, 100) || undefined,
			UTM_TERM: clip(utm.utm_term, 100) || undefined
		}
	};
}

async function bx(method, body) {
	const r = await fetch(`${WEBHOOK}/${method}.json`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
		signal: AbortSignal.timeout(15000)
	});
	const j = await r.json();
	if (!r.ok || j.error) throw new Error(`${method}: ${r.status} ${j.error || ''} ${j.error_description || ''}`);
	return j.result;
}

// Найти контакт по телефону (самый свежий) или создать новый
async function contactId(lead) {
	try {
		const dup = await bx('crm.duplicate.findbycomm', { type: 'PHONE', values: [lead.phone], entity_type: 'CONTACT' });
		const ids = Array.isArray(dup?.CONTACT) ? dup.CONTACT : [];
		if (ids.length) return Math.max(...ids);
	} catch (e) {
		console.error('Поиск контакта не удался', e?.message);
	}
	return bx('crm.contact.add', { fields: lead.contact, params: { REGISTER_SONET_EVENT: 'N' } });
}

function send(res, code, body) {
	res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
	res.end(JSON.stringify(body));
}

// ---------- Капча «выберите похожий цвет» ----------
// Задание: целевой цвет и 4 варианта (один – оттенок того же цвета, три – другие цвета).
// Правильный ответ знает только сервер: он зашит в подписанный токен.
const FAMILIES = [
	{ h: 0 }, // красный
	{ h: 28 }, // оранжевый
	{ h: 52 }, // жёлтый
	{ h: 125 }, // зелёный
	{ h: 178 }, // бирюзовый
	{ h: 215 }, // синий
	{ h: 275 }, // фиолетовый
	{ h: 325 } // розовый
];
const rnd = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function hsl2hex(h, s, l) {
	h = ((h % 360) + 360) % 360;
	s /= 100;
	l /= 100;
	const k = (n) => (n + h / 30) % 12;
	const a = s * Math.min(l, 1 - l);
	const f = (n) => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))));
	return '#' + [f(0), f(8), f(4)].map((x) => x.toString(16).padStart(2, '0')).join('');
}

const sign = (data) => createHmac('sha256', CAPTCHA_SECRET).update(data).digest('base64url');

function makeChallenge() {
	const fam = pick(FAMILIES);
	const target = hsl2hex(fam.h, rnd(70, 85), rnd(45, 55));
	// правильный: тот же цвет, заметно другой оттенок
	const close = hsl2hex(fam.h + rnd(-10, 10), rnd(55, 90), rnd(30, 42) + (Math.random() < 0.5 ? 0 : 26));
	// неправильные: цвета не ближе 70° по кругу, иногда чёрный/белый/серый
	const far = FAMILIES.filter((f) => {
		const d = Math.abs(f.h - fam.h) % 360;
		return Math.min(d, 360 - d) >= 70;
	}).sort(() => Math.random() - 0.5);
	const wrong = [hsl2hex(far[0].h, rnd(65, 85), rnd(40, 55)), hsl2hex(far[1].h, rnd(65, 85), rnd(40, 55))];
	wrong.push(Math.random() < 0.5 ? hsl2hex(0, 0, rnd(8, 16)) : hsl2hex(far[2].h, rnd(65, 85), rnd(40, 55)));
	const options = [close, ...wrong].sort(() => Math.random() - 0.5);
	const answer = options.indexOf(close);
	const payload = Buffer.from(
		JSON.stringify({ e: Date.now() + 10 * 60 * 1000, n: randomBytes(8).toString('hex'), a: sign(`ans:${answer}`) })
	).toString('base64url');
	return { target, options, token: `${payload}.${sign(payload)}` };
}

const usedNonces = new Map();

function checkAnswer(token, choice) {
	const [payload, sig] = String(token || '').split('.');
	if (!payload || !sig) return false;
	const good = Buffer.from(sign(payload));
	const got = Buffer.from(sig);
	if (good.length !== got.length || !timingSafeEqual(good, got)) return false;
	let d;
	try {
		d = JSON.parse(Buffer.from(payload, 'base64url').toString());
	} catch {
		return false;
	}
	if (!d || Date.now() > d.e) return false;
	// токен одноразовый: после любой попытки он сгорает (перебрать 4 варианта нельзя)
	if (usedNonces.has(d.n)) return false;
	usedNonces.set(d.n, d.e);
	if (usedNonces.size > 50000) for (const [k, e] of usedNonces) if (Date.now() > e) usedNonces.delete(k);
	return d.a === sign(`ans:${Number(choice)}`);
}

// Не больше 30 попыток капчи с одного IP за 10 минут
const capHits = new Map();
function capLimited(ip) {
	const now = Date.now();
	const list = (capHits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
	list.push(now);
	capHits.set(ip, list);
	return list.length > 30;
}

createServer(async (req, res) => {
	const isCaptcha = req.url?.startsWith('/api/captcha');
	if (isCaptcha && req.method === 'GET') {
		res.setHeader('Cache-Control', 'no-store');
		return send(res, 200, makeChallenge());
	}
	if (req.method !== 'POST' || !(isCaptcha || req.url?.startsWith('/api/lead'))) return send(res, 404, { ok: false });

	let raw = '';
	for await (const chunk of req) {
		raw += chunk;
		if (raw.length > 50_000) return send(res, 413, { ok: false });
	}

	let d;
	try {
		d = JSON.parse(raw);
	} catch {
		return send(res, 400, { ok: false, error: 'json' });
	}

	const ip = String(req.headers['x-real-ip'] || req.socket.remoteAddress || '');

	if (isCaptcha) {
		if (capLimited(ip)) return send(res, 429, { ok: false, error: 'rate' });
		const ok = checkAnswer(d.token, d.choice);
		return send(res, ok ? 200 : 403, { ok });
	}

	// Ловушка для ботов: скрытое поле должно быть пустым
	if (d.website) return send(res, 200, { ok: true });

	if (limited(ip)) return send(res, 429, { ok: false, error: 'rate' });

	let lead;
	try {
		lead = buildLead(d);
	} catch {
		return send(res, 400, { ok: false, error: 'phone' });
	}

	if (!WEBHOOK) return send(res, 503, { ok: false, error: 'crm' });
	try {
		const cid = await contactId(lead);
		const id = await bx('crm.deal.add', {
			fields: { ...lead.deal, CONTACT_ID: cid },
			params: { REGISTER_SONET_EVENT: 'Y' }
		});
		if (lead.rows.length) {
			try {
				await bx('crm.deal.productrows.set', { id, rows: lead.rows });
			} catch (e) {
				// позиции всё равно есть в комментарии сделки
				console.error('Товары в сделку не добавились', e?.message);
			}
		}
		console.log('Сделка создана', id, 'контакт', cid, lead.deal.TITLE);
		return send(res, 200, { ok: true, id });
	} catch (e) {
		console.error('Битрикс: ошибка', e?.message);
		return send(res, 502, { ok: false, error: 'crm' });
	}
}).listen(PORT, '127.0.0.1', () => console.log(`lead-api слушает 127.0.0.1:${PORT}`));

export { buildLead };
