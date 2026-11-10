<script lang="ts">
	import { prod, catalogSize, brand } from '#lib/data.ts';
	import Header from '#lib/components/Header.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import UtpGrid from '#lib/components/UtpGrid.svelte';
	import ProductTiles from '#lib/components/ProductTiles.svelte';
	import StyleGrid from '#lib/components/StyleGrid.svelte';
	import RoomRow from '#lib/components/RoomRow.svelte';
	import ColorGuarantee from '#lib/components/ColorGuarantee.svelte';
	import Steps from '#lib/components/Steps.svelte';
	import Production from '#lib/components/Production.svelte';
	import Materials from '#lib/components/Materials.svelte';
	import OwnImage from '#lib/components/OwnImage.svelte';
	import Faq from '#lib/components/Faq.svelte';
	import LeadForm from '#lib/components/LeadForm.svelte';
	import Footer from '#lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Фотообои и фрески от производителя в Москве — {brand.name}</title>
	<meta
		name="description"
		content="Фотообои и фрески от производителя. Печать по размеру стены за 2 дня, без запаха, бесплатный пробник и гарантия цвета. Доставка по Москве."
	/>
</svelte:head>

<Header />

<!-- Вариант 1 «Производство»: структура главной okonti.ru -->
<div class="hero" style:--bg="url({prod('warehouse')})">
	<div class="wrap inner">
		<span class="badge">Собственное производство в Москве</span>
		<h1>Фотообои и фрески <br />от производителя</h1>
		<p class="lead">
			Печатаем по размеру вашей стены за 2 дня. Без запаха — можно в детскую. Привезём по Москве
			бесплатный пробник до оплаты.
		</p>
		<div class="ctas">
			<a class="btn btn-primary" href="#styles">Выбрать из {catalogSize} дизайнов</a>
			<a class="btn btn-white" href="#lead"><Icon name="gift" size={20} />Бесплатный пробник</a>
		</div>
		<ul class="facts">
			<li><b>2 дня</b>печать</li>
			<li><b>{catalogSize}</b>дизайнов</li>
			<li><b>100%</b>гарантия цвета</li>
		</ul>
	</div>
</div>

<UtpGrid compact />
<ProductTiles />
<StyleGrid />
<RoomRow />
<ColorGuarantee />
<Steps />
<Production />
<Materials />
<OwnImage />
<Faq mode="tips" />
<Faq />
<LeadForm />
<Footer />

<style>
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
		.hero {
			background:
				linear-gradient(180deg, rgb(0 30 90 / 0.75), rgb(0 30 90 / 0.95)),
				var(--bg) center / cover;
		}
		.inner {
			padding-top: 40px;
			padding-bottom: 36px;
			gap: 16px;
		}
		h1 {
			font-size: 30px;
		}
		h1 br {
			display: none;
		}
		.lead {
			font-size: 16px;
		}
		.ctas {
			width: 100%;
		}
		.facts {
			gap: 20px;
		}
		.facts b {
			font-size: 22px;
		}
	}
</style>
