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

/** true – заявка принята CRM */
export async function sendLead(lead: Lead): Promise<boolean> {
	try {
		const r = await fetch('/api/lead', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ...lead, page: location.href, utm: utm() })
		});
		const j = await r.json().catch(() => ({}));
		return r.ok && j.ok === true;
	} catch {
		return false;
	}
}
