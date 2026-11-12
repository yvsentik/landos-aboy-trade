// Каталог фресок La Stanza (lastanza.ru/catalog), спарсено 2026-11-11.
// Количество — по фильтру сайта. Ссылки ведут в наш каталог /catalog/ (данные в static/catalog.json).
import { asset } from '$app/paths';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cover = (f: string) => asset(`/img/catalog/${f}.jpg` as any);

export const catalogHome = '/catalog/';

export type CatTile = { name: string; count: number; href: string; img: string };

/** 8 главных тем — карточки с фото */
export const topics: CatTile[] = [
	{
		"name": "Цветы",
		"count": 405,
		"href": "/catalog/?Категория=Цветы",
		"img": "cat-24"
	},
	{
		"name": "Растительные",
		"count": 174,
		"href": "/catalog/?Категория=Сюжеты|Растительные",
		"img": "cat-13"
	},
	{
		"name": "Арки и лестницы",
		"count": 174,
		"href": "/catalog/?Категория=Пейзажи|Арки, лестницы",
		"img": "cat-28"
	},
	{
		"name": "Лес и деревья",
		"count": 163,
		"href": "/catalog/?Категория=Лес и деревья",
		"img": "col-3"
	},
	{
		"name": "Графика",
		"count": 171,
		"href": "/catalog/?Категория=Графика",
		"img": "cat-22"
	},
	{
		"name": "Древние фрески",
		"count": 150,
		"href": "/catalog/?Категория=Сюжеты|Древние фрески",
		"img": "cat-10"
	},
	{
		"name": "Флюиды",
		"count": 146,
		"href": "/catalog/?Категория=Флюиды",
		"img": "col-18"
	},
	{
		"name": "Тропики",
		"count": 110,
		"href": "/catalog/?Категория=Тропики",
		"img": "cat-6"
	}
];

/** Остальные темы — чипсами под карточками */
export const moreTopics = [
	{
		"name": "Абстракции",
		"count": 144,
		"href": "/catalog/?Категория=Абстракции"
	},
	{
		"name": "Орнаменты",
		"count": 119,
		"href": "/catalog/?Категория=Орнаменты"
	},
	{
		"name": "Шинуазри",
		"count": 77,
		"href": "/catalog/?Категория=Шинуазри"
	},
	{
		"name": "Line art",
		"count": 96,
		"href": "/catalog/?Категория=Line art"
	},
	{
		"name": "Птицы",
		"count": 117,
		"href": "/catalog/?Категория=Сюжеты|Птицы"
	},
	{
		"name": "Животные",
		"count": 67,
		"href": "/catalog/?Категория=Сюжеты|Животные"
	},
	{
		"name": "Морские виды",
		"count": 59,
		"href": "/catalog/?Категория=Пейзажи|Морские виды"
	},
	{
		"name": "Балконы и террасы",
		"count": 135,
		"href": "/catalog/?Категория=Пейзажи|Балконы и террасы"
	},
	{
		"name": "Водопады",
		"count": 42,
		"href": "/catalog/?Категория=Пейзажи|Водопады"
	},
	{
		"name": "Пляж и пальмы",
		"count": 24,
		"href": "/catalog/?Категория=Пейзажи|Пляж и пальмы"
	},
	{
		"name": "Восточные страны",
		"count": 23,
		"href": "/catalog/?Категория=Пейзажи|Восточные страны"
	},
	{
		"name": "Карта мира",
		"count": 80,
		"href": "/catalog/?Категория=Сюжеты|Карта мира"
	},
	{
		"name": "Ретро",
		"count": 76,
		"href": "/catalog/?Категория=Сюжеты|Ретро"
	},
	{
		"name": "Городские",
		"count": 38,
		"href": "/catalog/?Категория=Сюжеты|Городские"
	},
	{
		"name": "Современные",
		"count": 48,
		"href": "/catalog/?Категория=Сюжеты|Современные"
	},
	{
		"name": "Античные",
		"count": 27,
		"href": "/catalog/?Категория=Сюжеты|Античные"
	},
	{
		"name": "Модерн",
		"count": 13,
		"href": "/catalog/?Категория=Сюжеты|Модерн"
	},
	{
		"name": "Восточные",
		"count": 14,
		"href": "/catalog/?Категория=Сюжеты|Восточные"
	}
];

export const kidsTopics = [
	{
		"name": "Для девочки",
		"count": 135,
		"href": "/catalog/?Категория=Детские|Для девочки"
	},
	{
		"name": "Для мальчика",
		"count": 73,
		"href": "/catalog/?Категория=Детские|Для мальчика"
	},
	{
		"name": "Для подростка",
		"count": 166,
		"href": "/catalog/?Категория=Детские|Для подростка"
	}
];

/** «По назначению» на сайте */
export const lsRooms: CatTile[] = [
	{
		"name": "Гостиная",
		"count": 1175,
		"href": "/catalog/?По назначению=В гостиную",
		"img": "room-2"
	},
	{
		"name": "Спальня",
		"count": 722,
		"href": "/catalog/?По назначению=В спальню",
		"img": "room-9"
	},
	{
		"name": "Детская",
		"count": 318,
		"href": "/catalog/?По назначению=В детскую",
		"img": "room-3"
	},
	{
		"name": "Кухня",
		"count": 359,
		"href": "/catalog/?По назначению=В кухню",
		"img": "room-5"
	},
	{
		"name": "Прихожая",
		"count": 562,
		"href": "/catalog/?По назначению=В прихожую, холл, коридор",
		"img": "room-6"
	},
	{
		"name": "Ванная",
		"count": 409,
		"href": "/catalog/?По назначению=В ванную комнату",
		"img": "room-1"
	},
	{
		"name": "Кабинет",
		"count": 253,
		"href": "/catalog/?По назначению=В кабинет",
		"img": "room-4"
	},
	{
		"name": "Ресторан и кафе",
		"count": 562,
		"href": "/catalog/?По назначению=В ресторан и кафе",
		"img": "room-7"
	},
	{
		"name": "Салон красоты и СПА",
		"count": 389,
		"href": "/catalog/?По назначению=В салон красоты и спа салон",
		"img": "room-8"
	},
	{
		"name": "Бассейн",
		"count": 161,
		"href": "/catalog/?По назначению=В бассейн",
		"img": "room-0"
	},
	{
		"name": "Фасад",
		"count": 148,
		"href": "/catalog/?По назначению=На фасад",
		"img": "room-10"
	}
];

export const lsColors = [
	{
		"name": "Золото",
		"count": 77,
		"href": "/catalog/?Цвет=Золото",
		"hex": "#ffd700"
	},
	{
		"name": "Серебро",
		"count": 80,
		"href": "/catalog/?Цвет=Серебро",
		"hex": "#c0c0c0"
	},
	{
		"name": "Шампань",
		"count": 37,
		"href": "/catalog/?Цвет=Шампань",
		"hex": "#fcfcee"
	},
	{
		"name": "Красный",
		"count": 54,
		"href": "/catalog/?Цвет=Красный",
		"hex": "#ff0000"
	},
	{
		"name": "Фиолетовый",
		"count": 74,
		"href": "/catalog/?Цвет=Фиолетовый",
		"hex": "#8b00ff"
	},
	{
		"name": "Черный",
		"count": 105,
		"href": "/catalog/?Цвет=Черный",
		"hex": "#000000"
	},
	{
		"name": "Серый",
		"count": 320,
		"href": "/catalog/?Цвет=Серый",
		"hex": "#808080"
	},
	{
		"name": "Светло-серый",
		"count": 8,
		"href": "/catalog/?Цвет=Светло-серый",
		"hex": "#BBBBBB"
	},
	{
		"name": "Белый",
		"count": 74,
		"href": "/catalog/?Цвет=Белый",
		"hex": "#ffffff"
	},
	{
		"name": "Слоновая кость",
		"count": 100,
		"href": "/catalog/?Цвет=Слоновая кость",
		"hex": "#fffff0"
	},
	{
		"name": "Бежевый",
		"count": 354,
		"href": "/catalog/?Цвет=Бежевый",
		"hex": "#f5f5dc"
	},
	{
		"name": "Коричневый",
		"count": 165,
		"href": "/catalog/?Цвет=Коричневый",
		"hex": "#964b00"
	},
	{
		"name": "Розовый",
		"count": 270,
		"href": "/catalog/?Цвет=Розовый",
		"hex": "#ffc0cb"
	},
	{
		"name": "Желтый",
		"count": 64,
		"href": "/catalog/?Цвет=Желтый",
		"hex": "#ffff00"
	},
	{
		"name": "Светло-зеленый",
		"count": 133,
		"href": "/catalog/?Цвет=Светло-зеленый",
		"hex": "#90ee90"
	},
	{
		"name": "Зеленый",
		"count": 281,
		"href": "/catalog/?Цвет=Зеленый",
		"hex": "#008000"
	},
	{
		"name": "Бирюзовый",
		"count": 114,
		"href": "/catalog/?Цвет=Бирюзовый",
		"hex": "#30d5c8"
	},
	{
		"name": "Голубой",
		"count": 307,
		"href": "/catalog/?Цвет=Голубой",
		"hex": "#42aaff"
	},
	{
		"name": "Синий",
		"count": 131,
		"href": "/catalog/?Цвет=Синий",
		"hex": "#0000ff"
	},
	{
		"name": "Сиреневый",
		"count": 149,
		"href": "/catalog/?Цвет=Сиреневый",
		"hex": "#C8A2C8"
	}
];

export const collections = [
	{
		"name": "Mattina",
		"count": 57,
		"href": "/catalog/?Коллекция=Mattina",
		"img": "col-0",
		"sub": []
	},
	{
		"name": "Tesoro 2",
		"count": 105,
		"href": "/catalog/?Коллекция=Tesoro 2",
		"img": "col-1",
		"sub": []
	},
	{
		"name": "Tesoro 1",
		"count": 147,
		"href": "/catalog/?Коллекция=Tesoro 1",
		"img": "col-2",
		"sub": []
	},
	{
		"name": "ALBA",
		"count": 513,
		"href": "/catalog/?Коллекция=ALBA",
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
		"href": "/catalog/?Коллекция=Тренды",
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
