// Корзина и избранное. Хранятся в браузере покупателя (localStorage), без регистрации.

export type CartItem = {
	id: string; // slug + размер + фактура
	slug: string;
	art: string;
	title: string;
	img: string;
	w: number; // см
	h: number; // см
	texture: string;
	perM: number; // ₽ за м²
	qty: number;
};

const CART = 'cart';
const FAV = 'fav';

function load<T>(key: string, fallback: T): T {
	try {
		const raw = localStorage.getItem(key);
		return raw ? (JSON.parse(raw) as T) : fallback;
	} catch {
		return fallback;
	}
}

function save(key: string, value: unknown) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {
		/* хранилище недоступно – живёт до перезагрузки */
	}
}

class Shop {
	cart = $state<CartItem[]>([]);
	fav = $state<string[]>([]);
	#ready = false;

	/** Подгрузить сохранённое (вызывать в браузере) */
	init() {
		if (this.#ready || typeof window === 'undefined') return;
		this.#ready = true;
		this.cart = load<CartItem[]>(CART, []);
		this.fav = load<string[]>(FAV, []);
		// синхронизация между вкладками
		window.addEventListener('storage', (e) => {
			if (e.key === CART) this.cart = load<CartItem[]>(CART, []);
			if (e.key === FAV) this.fav = load<string[]>(FAV, []);
		});
	}

	get count() {
		return this.cart.reduce((s, i) => s + i.qty, 0);
	}

	get total() {
		return this.cart.reduce((s, i) => s + lineTotal(i), 0);
	}

	add(item: Omit<CartItem, 'id' | 'qty'>) {
		const id = `${item.slug}|${item.w}x${item.h}|${item.texture}`;
		const found = this.cart.find((i) => i.id === id);
		if (found) found.qty += 1;
		else this.cart.push({ ...item, id, qty: 1 });
		save(CART, this.cart);
	}

	setQty(id: string, qty: number) {
		const it = this.cart.find((i) => i.id === id);
		if (!it) return;
		it.qty = Math.max(1, Math.min(99, Math.round(qty) || 1));
		save(CART, this.cart);
	}

	remove(id: string) {
		this.cart = this.cart.filter((i) => i.id !== id);
		save(CART, this.cart);
	}

	clear() {
		this.cart = [];
		save(CART, this.cart);
	}

	isFav(slug: string) {
		return this.fav.includes(slug);
	}

	toggleFav(slug: string) {
		this.fav = this.isFav(slug) ? this.fav.filter((s) => s !== slug) : [...this.fav, slug];
		save(FAV, this.fav);
	}
}

export const lineTotal = (i: CartItem) => Math.round(((i.w * i.h) / 10000) * i.perM) * i.qty;

export const shop = new Shop();
