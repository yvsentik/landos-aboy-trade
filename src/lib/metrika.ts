// Яндекс Метрика: счётчик 114270840 (код подключён в app.html)
const ID = 114270840;

type Ym = (id: number, method: string, ...args: unknown[]) => void;
const ym = (): Ym | undefined => (typeof window !== 'undefined' ? (window as unknown as { ym?: Ym }).ym : undefined);

/** Просмотр страницы при переходе внутри сайта (без перезагрузки) */
export function hit(url: string, referer?: string) {
	ym()?.(ID, 'hit', url, { referer, title: document.title });
}

/** Цель: lead_sent, lead_lead, lead_oneclick, lead_cart */
export function goal(name: string, params?: Record<string, unknown>) {
	ym()?.(ID, 'reachGoal', name, params);
}
