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

export const load: PageServerLoad = ({ params }) => {
	const p = products[params.slug];
	if (!p) error(404, 'Фреска не найдена');
	const colors = p.colors
		.map((s) => products[s])
		.filter(Boolean)
		.map((c) => ({ slug: c.slug, art: c.art, img: c.img }));
	return {
		p,
		textures: p.textures.map((id) => ({ id, ...textures[id] })).filter((t) => t.name),
		colors
	};
};
