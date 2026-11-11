// Каталог фресок La Stanza (lastanza.ru/catalog), спарсено 2026-11-11.
// Количество — по фильтру сайта. Ссылки ведут в каталог на lastanza.ru.
import { asset } from '$app/paths';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cover = (f: string) => asset(`/img/catalog/${f}.jpg` as any);

export const catalogHome = 'https://lastanza.ru/catalog/';

export type CatTile = { name: string; count: number; href: string; img: string };

/** 8 главных тем — карточки с фото */
export const topics: CatTile[] = [
	{
		"name": "Цветы",
		"count": 405,
		"href": "https://lastanza.ru/catalog/freski-cvety/",
		"img": "cat-24"
	},
	{
		"name": "Растительные",
		"count": 174,
		"href": "https://lastanza.ru/catalog/freski-rastitelnye/",
		"img": "cat-13"
	},
	{
		"name": "Арки и лестницы",
		"count": 174,
		"href": "https://lastanza.ru/catalog/freski-arki-lestnicy/",
		"img": "cat-28"
	},
	{
		"name": "Лес и деревья",
		"count": 163,
		"href": "https://lastanza.ru/catalog/filter/category-is-les_dereviy/apply/",
		"img": "col-3"
	},
	{
		"name": "Графика",
		"count": 171,
		"href": "https://lastanza.ru/catalog/freski-grafika/",
		"img": "cat-22"
	},
	{
		"name": "Древние фрески",
		"count": 150,
		"href": "https://lastanza.ru/catalog/freski-drevnie/",
		"img": "cat-10"
	},
	{
		"name": "Флюиды",
		"count": 146,
		"href": "https://lastanza.ru/catalog/freski-flyuidy/",
		"img": "col-18"
	},
	{
		"name": "Тропики",
		"count": 110,
		"href": "https://lastanza.ru/catalog/freski-tropiki/",
		"img": "cat-6"
	}
];

/** Остальные темы — чипсами под карточками */
export const moreTopics = [
	{
		"name": "Абстракции",
		"count": 144,
		"href": "https://lastanza.ru/catalog/filter/category-is-abstract/apply/"
	},
	{
		"name": "Орнаменты",
		"count": 119,
		"href": "https://lastanza.ru/catalog/filter/category-is-ornamenty/apply/"
	},
	{
		"name": "Шинуазри",
		"count": 77,
		"href": "https://lastanza.ru/catalog/freski-shinuazri/"
	},
	{
		"name": "Line art",
		"count": 96,
		"href": "https://lastanza.ru/catalog/filter/category-is-line_art/apply/"
	},
	{
		"name": "Птицы",
		"count": 117,
		"href": "https://lastanza.ru/catalog/filter/category-is-syuzhety_pticy/apply/"
	},
	{
		"name": "Животные",
		"count": 67,
		"href": "https://lastanza.ru/catalog/filter/category-is-syuzhety_jivotnye/apply/"
	},
	{
		"name": "Морские виды",
		"count": 59,
		"href": "https://lastanza.ru/catalog/freski-more/"
	},
	{
		"name": "Балконы и террасы",
		"count": 135,
		"href": "https://lastanza.ru/catalog/freski-balkony-terrasy/"
	},
	{
		"name": "Водопады",
		"count": 42,
		"href": "https://lastanza.ru/catalog/freski-vodopady/"
	},
	{
		"name": "Пляж и пальмы",
		"count": 24,
		"href": "https://lastanza.ru/catalog/freski-plyazh-palmy/"
	},
	{
		"name": "Восточные страны",
		"count": 23,
		"href": "https://lastanza.ru/catalog/freski-vostochnye-strany/"
	},
	{
		"name": "Карта мира",
		"count": 80,
		"href": "https://lastanza.ru/catalog/freski-karty-mira/"
	},
	{
		"name": "Ретро",
		"count": 76,
		"href": "https://lastanza.ru/catalog/freski-retro/"
	},
	{
		"name": "Городские",
		"count": 38,
		"href": "https://lastanza.ru/catalog/freski-gorod/"
	},
	{
		"name": "Современные",
		"count": 48,
		"href": "https://lastanza.ru/catalog/freski-sovremennye/"
	},
	{
		"name": "Античные",
		"count": 27,
		"href": "https://lastanza.ru/catalog/freski-antichnye/"
	},
	{
		"name": "Модерн",
		"count": 13,
		"href": "https://lastanza.ru/catalog/freski-modern/"
	},
	{
		"name": "Восточные",
		"count": 14,
		"href": "https://lastanza.ru/catalog/freski-vostochnye/"
	}
];

export const kidsTopics = [
	{
		"name": "Для девочки",
		"count": 135,
		"href": "https://lastanza.ru/catalog/freski-v-komnatu-devochke/"
	},
	{
		"name": "Для мальчика",
		"count": 73,
		"href": "https://lastanza.ru/catalog/filter/category-is-detskie_malchici/apply/"
	},
	{
		"name": "Для подростка",
		"count": 166,
		"href": "https://lastanza.ru/catalog/freski-v-komnatu-podrostka/"
	}
];

/** «По назначению» на сайте */
export const lsRooms: CatTile[] = [
	{
		"name": "Гостиная",
		"count": 1175,
		"href": "https://lastanza.ru/catalog/freski-v-gostinuyu/",
		"img": "room-2"
	},
	{
		"name": "Спальня",
		"count": 722,
		"href": "https://lastanza.ru/catalog/freski-v-spalnyu/",
		"img": "room-9"
	},
	{
		"name": "Детская",
		"count": 318,
		"href": "https://lastanza.ru/catalog/freska-v-detskuyu-komnatu/",
		"img": "room-3"
	},
	{
		"name": "Кухня",
		"count": 359,
		"href": "https://lastanza.ru/catalog/freski-na-kuhnyu/",
		"img": "room-5"
	},
	{
		"name": "Прихожая",
		"count": 562,
		"href": "https://lastanza.ru/catalog/freski-v-prihozhuyu/",
		"img": "room-6"
	},
	{
		"name": "Ванная",
		"count": 409,
		"href": "https://lastanza.ru/catalog/freski-v-vannuyu-komnatu/",
		"img": "room-1"
	},
	{
		"name": "Кабинет",
		"count": 253,
		"href": "https://lastanza.ru/catalog/freski-v-kabinet/",
		"img": "room-4"
	},
	{
		"name": "Ресторан и кафе",
		"count": 562,
		"href": "https://lastanza.ru/catalog/freski-v-restoran-i-kafe/",
		"img": "room-7"
	},
	{
		"name": "Салон красоты и СПА",
		"count": 389,
		"href": "https://lastanza.ru/catalog/freski-v-salon-krasoty-i-spa-salon/",
		"img": "room-8"
	},
	{
		"name": "Бассейн",
		"count": 161,
		"href": "https://lastanza.ru/catalog/freska-v-basseyn/",
		"img": "room-0"
	},
	{
		"name": "Фасад",
		"count": 148,
		"href": "https://lastanza.ru/catalog/freski-na-fasad/",
		"img": "room-10"
	}
];

export const lsColors = [
	{
		"name": "Золото",
		"count": 77,
		"href": "https://lastanza.ru/catalog/freski-zolotye/",
		"hex": "#ffd700"
	},
	{
		"name": "Серебро",
		"count": 80,
		"href": "https://lastanza.ru/catalog/filter/color_hl-is-silver/apply/",
		"hex": "#c0c0c0"
	},
	{
		"name": "Шампань",
		"count": 37,
		"href": "https://lastanza.ru/catalog/freski-cveta-shampan/",
		"hex": "#fcfcee"
	},
	{
		"name": "Красный",
		"count": 54,
		"href": "https://lastanza.ru/catalog/freski-krasnye/",
		"hex": "#ff0000"
	},
	{
		"name": "Фиолетовый",
		"count": 74,
		"href": "https://lastanza.ru/catalog/freski-fioletovye/",
		"hex": "#8b00ff"
	},
	{
		"name": "Черный",
		"count": 105,
		"href": "https://lastanza.ru/catalog/freski-chernyy/",
		"hex": "#000000"
	},
	{
		"name": "Серый",
		"count": 320,
		"href": "https://lastanza.ru/catalog/freski-seryy/",
		"hex": "#808080"
	},
	{
		"name": "Светло-серый",
		"count": 8,
		"href": "https://lastanza.ru/catalog/freski-svetlo-serye/",
		"hex": "#BBBBBB"
	},
	{
		"name": "Белый",
		"count": 74,
		"href": "https://lastanza.ru/catalog/freski-belyy/",
		"hex": "#ffffff"
	},
	{
		"name": "Слоновая кость",
		"count": 100,
		"href": "https://lastanza.ru/catalog/freski-cveta-slonovoy-kosti/",
		"hex": "#fffff0"
	},
	{
		"name": "Бежевый",
		"count": 354,
		"href": "https://lastanza.ru/catalog/freski-bezhevyy/",
		"hex": "#f5f5dc"
	},
	{
		"name": "Коричневый",
		"count": 165,
		"href": "https://lastanza.ru/catalog/freski-korichnevye/",
		"hex": "#964b00"
	},
	{
		"name": "Розовый",
		"count": 270,
		"href": "https://lastanza.ru/catalog/freski-rozovye/",
		"hex": "#ffc0cb"
	},
	{
		"name": "Желтый",
		"count": 64,
		"href": "https://lastanza.ru/catalog/freski-zheltye/",
		"hex": "#ffff00"
	},
	{
		"name": "Светло-зеленый",
		"count": 133,
		"href": "https://lastanza.ru/catalog/freski-svetlo-zelenye/",
		"hex": "#90ee90"
	},
	{
		"name": "Зеленый",
		"count": 281,
		"href": "https://lastanza.ru/catalog/freski-zelenyy/",
		"hex": "#008000"
	},
	{
		"name": "Бирюзовый",
		"count": 114,
		"href": "https://lastanza.ru/catalog/freski-biryuzovye/",
		"hex": "#30d5c8"
	},
	{
		"name": "Голубой",
		"count": 307,
		"href": "https://lastanza.ru/catalog/freski-golubye/",
		"hex": "#42aaff"
	},
	{
		"name": "Синий",
		"count": 131,
		"href": "https://lastanza.ru/catalog/freski-sinie/",
		"hex": "#0000ff"
	},
	{
		"name": "Сиреневый",
		"count": 149,
		"href": "https://lastanza.ru/catalog/freski-sirenevye/",
		"hex": "#C8A2C8"
	}
];

export const collections = [
	{
		"name": "Mattina",
		"count": 57,
		"href": "https://lastanza.ru/catalog/filter/collection-is-mattina/apply/",
		"img": "col-0",
		"sub": []
	},
	{
		"name": "Tesoro 2",
		"count": 105,
		"href": "https://lastanza.ru/catalog/filter/collection-is-tesoro_2/apply/",
		"img": "col-1",
		"sub": []
	},
	{
		"name": "Tesoro 1",
		"count": 147,
		"href": "https://lastanza.ru/catalog/filter/collection-is-tesoro_1/apply/",
		"img": "col-2",
		"sub": []
	},
	{
		"name": "ALBA",
		"count": 513,
		"href": "https://lastanza.ru/catalog/filter/collection-is-alba_flora-or-alba_dreams-or-alba_natura-or-alba_tropic-or-alba_textures-or-alba_graphics-or-alba_abstract-or-alba_ornamental/apply/",
		"img": "col-3",
		"sub": [
			"Flora",
			"Dreams",
			"Natura",
			"Tropic",
			"Textures",
			"Graphics",
			"Abstract",
			"Ornamental"
		]
	},
	{
		"name": "Тренды",
		"count": 558,
		"href": "https://lastanza.ru/catalog/filter/collection-is-trendy_simple-solution-or-trendy_chinoiserie-or-trendy_floriano-or-trendy_ornamental-or-trendy_mystic-or-trendy_marrakesh/apply/",
		"img": "col-11",
		"sub": [
			"Простые решения",
			"Шинуазри",
			"Флориано",
			"Орнаменталь",
			"Мистика",
			"Марракеш",
			"Симфония текстур",
			"Граффити"
		]
	}
];
