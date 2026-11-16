import { goal } from './metrika.ts';

// Отправка заявок с сайта на наш сервер (/api/lead), оттуда – в Битрикс24.
const UTM_KEY = 'utm';
const UTM_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

/** Запомнить UTM-метки с первого захода (вызывать в браузере) */
export function captureUtm() {
	try {
		const p = new URLSearchParams(location.search);
		const utm = Object.fromEntries(UTM_FIELDS.filter((k) => p.get(k)).map((k) => [k, p.get(k)!]));
		if (Object.keys(utm).length) sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
	} catch {
		/* хранилище недоступно */
	}
}

function utm(): Record<string, string> {
	try {
		return JSON.parse(sessionStorage.getItem(UTM_KEY) ?? '{}');
	} catch {
		return {};
	}
}

export type LeadItem = {
	title: string;
	art: string;
	w: number;
	h: number;
	texture: string;
	perM: number;
	qty: number;
	sum: number;
	url?: string;
};

export type Lead = {
	form: 'lead' | 'oneclick' | 'cart';
	name?: string;
	phone: string;
	size?: string;
	city?: string;
	comment?: string;
	items?: LeadItem[];
	total?: number;
	website?: string; // ловушка для ботов
};

export type LeadResult = { ok: true } | { ok: false; error: 'phone' | 'rate' | 'crm' | 'network' };

/** Человеческий текст ошибки для формы */
export function leadError(r: LeadResult, phone: string): string {
	if (r.ok) return '';
	if (r.error === 'phone') return 'Проверьте номер телефона: нужно 10–11 цифр, например +7 999 123-45-67.';
	if (r.error === 'rate') return 'Слишком много заявок подряд. Попробуйте через 10 минут или позвоните ' + phone + '.';
	return 'Не получилось отправить. Позвоните ' + phone + ' или напишите в Макс.';
}

/** Проверка номера до отправки: 10–11 цифр */
export const phoneOk = (v: string) => {
	const d = v.replace(/\D/g, '');
	return d.length >= 10 && d.length <= 12;
};

export async function sendLead(lead: Lead): Promise<LeadResult> {
	if (!phoneOk(lead.phone)) return { ok: false, error: 'phone' };
	try {
		const r = await fetch('/api/lead', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ...lead, page: location.href, utm: utm() })
		});
		const j = await r.json().catch(() => ({}));
		if (r.ok && j.ok === true) {
			// цели Метрики: общая и по типу формы
			goal('lead_sent', { form: lead.form });
			goal(`lead_${lead.form}`, { total: lead.total });
			return { ok: true };
		}
		const e = j.error === 'phone' || j.error === 'rate' ? j.error : 'crm';
		return { ok: false, error: e };
	} catch {
		return { ok: false, error: 'network' };
	}
}
