<script lang="ts">
	import { brand, prod } from '#lib/data.ts';
	import Icon from './Icon.svelte';
	import MaxLogo from './MaxLogo.svelte';

	// Цены, пробник и доставка для v1-2. Условия – по данным oboitrade.ru (доставка и оплата, статья о фресках).
	const textures = [
		{ name: 'Матовая гладкая', level: 'Доступная', text: 'Лёгкий шелковистый отлив. Для графики, минимализма и городских пейзажей' },
		{ name: 'Песочная', level: 'Средняя', text: 'Кварцевый песок даёт глубину и скрывает мелкие неровности стены' },
		{ name: 'Холст / текстиль', level: 'Выше средней', text: 'Повторяет переплетение нитей – рисунок выглядит как картина' },
		{ name: 'Кракелюр', level: 'Премиум', text: 'Ручные микротрещины под старинную живопись – для классики и лофта' }
	];

	const delivery = [
		{ big: 'от 25 000 ₽', text: 'доставка бесплатно' },
		{ big: '1 200 ₽', text: 'внутри МКАД при заказе до 25 000 ₽, за МКАД +60 ₽/км' },
		{ big: '1–3 дня', text: 'срок доставки, ежедневно с 10:00 до 23:00' },
		{ big: '2 500 ₽', text: 'экспресс-доставка ко времени' }
	];
</script>

<section id="prices">
	<div class="wrap">
		<div class="section-head">
			<div>
				<h2>Цены</h2>
				<p>Цена зависит от фактуры и площади. Точную сумму назовём по фото за 15 минут</p>
			</div>
		</div>
		<div class="from">
			<div><span>Фотообои</span><b>от 2 300 ₽/м²</b></div>
			<div><span>Фрески</span><b>от 2 800 ₽/м²</b></div>
			<div><span>Без швов</span><b>до 3,18 м</b><small>по одной стороне</small></div>
		</div>
		<div class="tex">
			{#each textures as t}
				<div class="card">
					<small>{t.level}</small>
					<h3>{t.name}</h3>
					<p>{t.text}</p>
				</div>
			{/each}
		</div>
		<a class="btn btn-primary" href={brand.max}><MaxLogo size={20} light />Прислать фото и узнать цену</a>
	</div>
</section>

<section id="probnik">
	<div class="wrap">
		<div class="probe">
			<img src={prod('fresco-paint')} alt="Работа над фреской на производстве" loading="lazy" />
			<div>
				<span class="badge">Бесплатно</span>
				<h2>Пробник и цветопроба до печати</h2>
				<ol>
					<li>Дизайнер готовит эскиз под размер вашей стены</li>
					<li>Печатаем небольшой фрагмент на выбранной фактуре</li>
					<li>По нему видно итоговый оттенок и рельеф – и можно подобрать краску или обои для остальных стен</li>
					<li>Только после вашего «да» отправляем полотно в печать</li>
				</ol>
				<p class="note">Гарантируем: готовая фреска будет такой же, как утверждённый пробник.</p>
				<a class="btn btn-pink" href="#lead"><Icon name="gift" size={20} />Заказать пробник бесплатно</a>
			</div>
		</div>
	</div>
</section>

<section id="delivery">
	<div class="wrap">
		<h2>Доставка и монтаж</h2>
		<div class="dgrid">
			{#each delivery as d}
				<div class="dcard"><b>{d.big}</b><span>{d.text}</span></div>
			{/each}
		</div>
		<div class="drows">
			<div><Icon name="truck" size={24} /><p><b>По России и СНГ</b> – СДЭК до пункта выдачи или до двери. Стоимость зависит от веса и считается при заказе.</p></div>
			<div><Icon name="factory" size={24} /><p><b>Самовывоз</b> – из магазинов сети в Москве и области.</p></div>
			<div><Icon name="shield" size={24} /><p><b>Упаковка</b> – фреска приезжает в ударопрочном тубусе, свёрнутая по высоте – так её удобно клеить.</p></div>
			<div><Icon name="check" size={24} /><p><b>Монтаж</b> – поклейку можем организовать по запросу. Уточните у менеджера при заказе.</p></div>
		</div>
		<p class="small">Доставка – до подъезда, подъём на этаж оплачивается отдельно. Фреска изготавливается под заказ и обмену и возврату не подлежит.</p>
	</div>
</section>

<style>
	.from {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
		margin-bottom: 16px;
	}

	.from div {
		background: var(--navy);
		color: #fff;
		border-radius: var(--radius);
		padding: 20px;
		display: grid;
	}

	.from span {
		opacity: 0.8;
		font-size: 14px;
	}

	.from b {
		font-size: 28px;
		font-weight: 800;
	}

	.from small {
		opacity: 0.7;
	}

	.tex {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
		margin-bottom: 20px;
	}

	.card {
		background: var(--soft-2);
		border-radius: var(--radius);
		padding: 20px;
		display: grid;
		gap: 6px;
		align-content: start;
	}

	.card small {
		color: var(--pink);
		font-weight: 700;
		font-size: 12px;
		text-transform: uppercase;
	}

	.card p {
		color: var(--muted);
		font-size: 14px;
	}

	.probe {
		display: grid;
		grid-template-columns: 1fr 1.2fr;
		background: var(--soft);
		border-radius: 20px;
		overflow: hidden;
	}

	.probe img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		min-height: 300px;
	}

	.probe > div {
		padding: 36px;
		display: grid;
		gap: 14px;
		align-content: center;
		justify-items: start;
	}

	ol {
		margin: 0;
		padding-left: 20px;
		display: grid;
		gap: 8px;
	}

	.note {
		font-weight: 700;
		color: var(--navy);
	}

	.dgrid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
		margin: 24px 0 20px;
	}

	.dcard {
		border: 1px solid var(--line);
		border-radius: var(--radius);
		padding: 20px;
		display: grid;
		gap: 4px;
	}

	.dcard b {
		font-size: 26px;
		font-weight: 800;
		color: var(--blue);
	}

	.dcard span {
		color: var(--muted);
		font-size: 14px;
	}

	.drows {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 14px 28px;
	}

	.drows div {
		display: flex;
		gap: 12px;
		align-items: flex-start;
	}

	.drows :global(svg) {
		flex: none;
		color: var(--green);
		margin-top: 2px;
	}

	.small {
		margin-top: 16px;
		font-size: 13px;
		color: var(--muted);
	}

	@media (max-width: 900px) {
		.tex,
		.dgrid {
			grid-template-columns: 1fr 1fr;
		}
		.probe {
			grid-template-columns: 1fr;
		}
		.probe img {
			min-height: 0;
			aspect-ratio: 16 / 9;
		}
		.probe > div {
			padding: 22px 18px;
		}
	}

	@media (max-width: 600px) {
		.from {
			grid-template-columns: 1fr 1fr;
		}
		.from div:last-child {
			grid-column: span 2;
		}
		.from b {
			font-size: 22px;
		}
		.drows {
			grid-template-columns: 1fr;
		}
		.dcard b {
			font-size: 20px;
		}
	}
</style>
