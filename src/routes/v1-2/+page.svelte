<script lang="ts">
	import { prod, brand } from '#lib/data.ts';
	import MaxLogo from '#lib/components/MaxLogo.svelte';
	import Header from '#lib/components/Header.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import UtpGrid from '#lib/components/UtpGrid.svelte';
	import ProductTiles from '#lib/components/ProductTiles.svelte';
	import ColorGuarantee from '#lib/components/ColorGuarantee.svelte';
	import Steps from '#lib/components/Steps.svelte';
	import Production from '#lib/components/Production.svelte';
	import OwnImage from '#lib/components/OwnImage.svelte';
	import Faq from '#lib/components/Faq.svelte';
	import LeadForm from '#lib/components/LeadForm.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import FloatChat from '#lib/components/FloatChat.svelte';
	import type { Utp } from '#lib/data.ts';

	// v1-2: без каталога. Клиент присылает изображение или идею в мессенджер — получает расчёт и пробник.
	const steps = [
		{ title: 'Пришлите изображение', text: 'Фото, картину, референс или идею — в Макс или Telegram' },
		{ title: 'Получите расчёт и пробник', text: 'Посчитаем цену и бесплатно привезём образец с цветопробой' },
		{ title: 'Утвердите макет', text: 'Подгоним изображение под размер стены, окна и розетки' },
		{ title: 'Печать от 3 дней', text: 'Печатаем на производстве в Москве' },
		{ title: 'Доставка и монтаж', text: 'Доставим по Москве и России, при желании поклеим' }
	];

	const utp: Utp[] = [
		{ icon: 'leaf', title: 'Не пахнут — можно в детскую', text: '' },
		{ icon: 'palette', title: 'Цвет точь-в-точь', text: '' },
		{ icon: 'ruler', title: 'Замер по Москве', text: '' },
		{ icon: 'truck', title: 'Доставка по Москве и России', text: '' }
	];
</script>

<svelte:head>
	<title>Фотообои и фрески на заказ от производителя в Москве — {brand.name}</title>
	<meta
		name="description"
		content="Фотообои и фрески от производителя. Печать по размеру стены от 3 дней, без запаха, бесплатный пробник и гарантия цвета. Доставка по Москве."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="mont">
<Header lite />

<!-- Вариант 1-2: v1 без каталога, всё ведёт к отправке своего изображения -->
<div class="hero" style:--bg="url({prod('warehouse-hd')})">
	<div class="wrap inner">
		<span class="badge">Производство в Москве</span>
		<h1><span class="d">Фотообои</span><span class="m">Обои</span> и фрески <br />от производителя</h1>
		<p class="lead">
			Напечатаем любое изображение или вашу идею по размеру стены от 3 дней. Без запаха — можно
			в детскую. Привезём по Москве бесплатный пробник до оплаты.
		</p>
		<div class="ctas">
			<a class="btn btn-primary" href={brand.max}><MaxLogo size={20} light />Отправить изображение</a>
			<a class="btn btn-white" href="#lead"><Icon name="gift" size={20} />Бесплатный пробник</a>
		</div>
		<ul class="facts">
			<li><b>от 3 дней</b>печать</li>
			<li><b>Любой</b>дизайн на заказ</li>
			<li><b>100%</b>гарантия цвета</li>
		</ul>
	</div>
</div>

<UtpGrid compact items={utp} />
<Production title="Производство в Москве" sub="" />
<OwnImage lite />
<Steps {steps} />
<ColorGuarantee lite />
<ProductTiles />
<Faq mode="tips" />
<Faq />
<LeadForm
	title="Пришлите изображение — рассчитаем за 15 минут"
	text="Или оставьте телефон: дизайнер свяжется, подберёт материал и привезёт бесплатный пробник с цветопробой."
/>
<Footer lite />
<FloatChat />
</div>

<style>
	/* Шрифт только для этой страницы */
	.mont {
		display: contents;
		font-family: 'Montserrat', system-ui, sans-serif;
	}

	.mont :global(*) {
		font-family: inherit;
	}

	:global(body:has(.mont)) {
		font-family: 'Montserrat', system-ui, sans-serif;
	}

	.m {
		display: none;
	}

	.hero {
		position: relative;
		color: #fff;
		background:
			linear-gradient(90deg, rgb(0 30 90 / 0.92) 0%, rgb(0 30 90 / 0.7) 45%, rgb(0 30 90 / 0.15) 100%),
			var(--bg) center / cover;
	}

	.inner {
		padding-top: 72px;
		padding-bottom: 64px;
		display: grid;
		gap: 20px;
		justify-items: start;
	}

	h1 {
		font-size: clamp(34px, 5.4vw, 64px);
		font-weight: 800;
		letter-spacing: -0.02em;
		text-transform: uppercase;
	}

	.lead {
		font-size: 19px;
		max-width: 560px;
		opacity: 0.92;
	}

	.ctas {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
		margin-top: 6px;
	}

	.facts {
		list-style: none;
		padding: 0;
		margin: 18px 0 0;
		display: flex;
		gap: 36px;
	}

	.facts li {
		display: grid;
		font-size: 14px;
		opacity: 0.9;
	}

	.facts b {
		font-size: 28px;
		font-weight: 800;
	}

	@media (max-width: 720px) {
		/* на телефоне: фото рулонов видно между заголовком и кнопками, длинный текст скрыт */
		.hero {
			background:
				linear-gradient(
					180deg,
					rgb(0 30 90 / 0.9) 0%,
					rgb(0 30 90 / 0.55) 30%,
					rgb(0 30 90 / 0.15) 50%,
					rgb(0 30 90 / 0.6) 72%,
					rgb(0 30 90 / 0.92) 100%
				),
				var(--bg) center / cover;
		}
		.inner {
			padding-top: 28px;
			padding-bottom: 30px;
			gap: 8px;
		}
		.d {
			display: none;
		}
		.m {
			display: inline;
		}
		.lead {
			display: none;
		}
		h1 {
			font-size: 30px;
		}
		h1 br {
			display: none;
		}
		.ctas {
			width: 100%;
			margin-top: 190px;
		}
		.facts {
			gap: 16px;
			margin-top: 12px;
		}
		.facts li {
			font-size: 12px;
		}
		.facts b {
			font-size: 19px;
			white-space: nowrap;
		}
	}
</style>
