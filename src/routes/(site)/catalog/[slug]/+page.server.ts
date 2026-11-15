import { error } from '@sveltejs/kit';
import data from '#lib/server/catalog.json';
import type { EntryGenerator, PageServerLoad } from './$types';

type Texture = { name: string; price: number; priceDesign: number; desc: string; img: string };
type Product = {
	slug: string;
	art: string;
	title: string;
	h1: string;
	img: string;
	full: string;
	video: string;
	price: number;
	priceText: string;
	tags: Record<string, string[]>;
	sizes: string[];
	textures: string[];
	colors: string[];
	src: string;
};

const products = data.products as Record<string, Product>;
const textures = data.textures as Record<string, Texture>;

export const prerender = true;

// Все 4 251 карточки собираются в статические страницы
export const entries: EntryGenerator = () => Object.keys(products).map((slug) => ({ slug }));

const all = Object.values(products);
const card = (c: Product) => ({ slug: c.slug, art: c.art, img: c.img, price: c.price });

// 12 похожих: та же группа фильтра, без самой фрески и её цветовых вариантов
function related(p: Product, group: string, value: string | undefined) {
	if (!value) return [];
	const skip = new Set([p.slug, ...p.colors]);
	return all
		.filter((c) => !skip.has(c.slug) && (c.tags[group] ?? []).includes(value))
		.slice(0, 12)
		.map(card);
}

export const load: PageServerLoad = ({ params }) => {
	const p = products[params.slug];
	if (!p) error(404, 'Фреска не найдена');
	const colors = p.colors.map((s) => products[s]).filter(Boolean).map(card);
	const collection = p.tags['Коллекция']?.[0];
	const theme = p.tags['Категория']?.[0];
	return {
		p,
		textures: p.textures.map((id) => ({ id, ...textures[id] })).filter((t) => t.name),
		colors,
		sameCollection: { name: collection, items: related(p, 'Коллекция', collection) },
		sameTheme: { name: theme, items: related(p, 'Категория', theme) }
	};
};
