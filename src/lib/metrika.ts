// Яндекс Метрика: счётчик 114413702. Код счётчика – в app.html, запускается после капчи.
const ID = 114413702;

type Ym = (id: number, method: string, ...args: unknown[]) => void;
const ym = (): Ym | undefined => (typeof window !== 'undefined' ? (window as unknown as { ym?: Ym }).ym : undefined);

/** Просмотр страницы при переходе внутри сайта (без перезагрузки) */
export function hit(url: string, referer?: string) {
	ym()?.(ID, 'hit', url, { referer, title: document.title });
}

/** Цель: click_telegram, click_max, click_contact, form_open, lead_sent */
export function goal(name: string, params?: Record<string, unknown>) {
	ym()?.(ID, 'reachGoal', name, params);
}
