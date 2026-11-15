import data from '#lib/server/catalog.json';
import type { PageServerLoad } from './$types';

type Texture = { name: string; price: number; priceDesign: number; desc: string; img: string };

// Материалы (фактуры) из каталога: 13 штук, по группам и по цене
const GROUPS: { title: string; note: string; match: (t: Texture) => boolean }[] = [
	{
		title: 'Фактурные фрески',
		note: 'Флизелин и декоративная штукатурка – от гладкой матовой до рельефа природного камня',
		match: (t) => !/Фасад/.test(t.name) && !/обои/i.test(t.desc)
	},
	{
		title: 'Дизайнерские с блеском',
		note: 'Гладкие материалы с перламутром и металлическим отливом – только для интерьера',
		match: (t) => /обои/i.test(t.desc)
	},
	{
		title: 'Фасадные',
		note: 'Основа из стекловолокна повышенной прочности – для улицы',
		match: (t) => /Фасад/.test(t.name)
	}
];

export const load: PageServerLoad = () => {
	const all = Object.values(data.textures as Record<string, Texture>).map((t) => ({ ...t, name: t.name.trim() }));
	return {
		groups: GROUPS.map((g) => ({
			title: g.title,
			note: g.note,
			items: all.filter(g.match).sort((a, b) => a.price - b.price)
		})).filter((g) => g.items.length)
	};
};
