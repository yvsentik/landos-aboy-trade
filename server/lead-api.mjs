// Приём заявок с сайта: контакт + сделка в Битрикс24 (воронка «Лендинг фрески + фотообои»).
// CRM работает в простом режиме (без лидов), поэтому сразу создаём сделку в нужной воронке.
// Без зависимостей: Node 18+ (встроенный fetch). Слушает только 127.0.0.1, наружу – через nginx /api/lead.
// Адрес вебхука берётся из переменной окружения BITRIX_WEBHOOK (файл /etc/landos/lead-api.env), в репозитории его нет.
import { createServer } from 'node:http';

const PORT = Number(process.env.PORT || 8787);
const WEBHOOK = (process.env.BITRIX_WEBHOOK || '').replace(/\/+$/, '');
const SITE = 'fotooboi.oboitrade.ru';
// Воронка и стадия сделки: 6 – «Лендинг фрески + фотообои», C6:NEW – «Новая»
const CATEGORY = Number(process.env.BITRIX_DEAL_CATEGORY || 6);
const STAGE = process.env.BITRIX_DEAL_STAGE || `C${CATEGORY}:NEW`;

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

function buildLead(d) {
	const phone = clip(d.phone, 40);
	const digits = phone.replace(/\D/g, '');
	if (digits.length < 10) throw new Error('phone');
	const form = FORMS[d.form] ? d.form : 'lead';
	const items = Array.isArray(d.items) ? d.items.slice(0, 30) : [];

	const lines = [];
	if (d.size) lines.push(`Размер стены: ${clip(d.size, 80)}`);
	if (d.city) lines.push(`Город: ${clip(d.city, 120)}`);
	if (d.comment) lines.push(`Комментарий: ${clip(d.comment, 1500)}`);
	if (items.length) {
		lines.push('', 'Позиции:');
		for (const i of items) {
			lines.push(
				`– ${clip(i.title, 120)} арт. ${clip(i.art, 40)}, ${clip(i.w, 6)}×${clip(i.h, 6)} см, ` +
					`${clip(i.texture, 60) || 'фактура не выбрана'}, ${fmt(i.perM)} ₽/м² × ${clip(i.qty, 3) || 1} = ${fmt(i.sum)} ₽` +
					(i.url ? `\n  ${clip(i.url, 300)}` : '')
			);
		}
		if (d.total) lines.push(`Итого: ${fmt(d.total)} ₽`);
	}
	if (d.page) lines.push('', `Страница: ${clip(d.page, 300)}`);

	const utm = d.utm && typeof d.utm === 'object' ? d.utm : {};
	const source = form === 'lead' ? 'WEB' : 'STORE';
	const name = clip(d.name, 100) || 'Без имени';
	return {
		phone,
		contact: {
			NAME: name,
			PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }],
			SOURCE_ID: source,
			SOURCE_DESCRIPTION: SITE,
			OPENED: 'Y'
		},
		deal: {
			TITLE: `${FORMS[form]} – ${SITE}`,
			CATEGORY_ID: CATEGORY,
			STAGE_ID: STAGE,
			SOURCE_ID: source,
			SOURCE_DESCRIPTION: `${SITE}: ${FORMS[form]}`,
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

createServer(async (req, res) => {
	if (req.method !== 'POST' || !req.url?.startsWith('/api/lead')) return send(res, 404, { ok: false });

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

	// Ловушка для ботов: скрытое поле должно быть пустым
	if (d.website) return send(res, 200, { ok: true });

	const ip = String(req.headers['x-real-ip'] || req.socket.remoteAddress || '');
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
		console.log('Сделка создана', id, 'контакт', cid, lead.deal.TITLE);
		return send(res, 200, { ok: true, id });
	} catch (e) {
		console.error('Битрикс: ошибка', e?.message);
		return send(res, 502, { ok: false, error: 'crm' });
	}
}).listen(PORT, '127.0.0.1', () => console.log(`lead-api слушает 127.0.0.1:${PORT}`));

export { buildLead };
