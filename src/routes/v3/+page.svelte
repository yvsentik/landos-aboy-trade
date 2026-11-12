<script lang="ts">
	import { prod, catalogSize, brand } from '#lib/data.ts';
	import Header from '#lib/components/Header.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import Calculator from '#lib/components/Calculator.svelte';
	import Pains from '#lib/components/Pains.svelte';
	import ProductTiles from '#lib/components/ProductTiles.svelte';
	import UtpGrid from '#lib/components/UtpGrid.svelte';
	import ColorGuarantee from '#lib/components/ColorGuarantee.svelte';
	import StyleGrid from '#lib/components/StyleGrid.svelte';
	import RoomRow from '#lib/components/RoomRow.svelte';
	import Materials from '#lib/components/Materials.svelte';
	import Steps from '#lib/components/Steps.svelte';
	import Production from '#lib/components/Production.svelte';
	import OwnImage from '#lib/components/OwnImage.svelte';
	import Faq from '#lib/components/Faq.svelte';
	import LeadForm from '#lib/components/LeadForm.svelte';
	import Footer from '#lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Фотообои и фрески на заказ по размеру стены – {brand.name}</title>
	<meta
		name="description"
		content="Рассчитайте стоимость фотообоев или фрески по размеру стены за 10 секунд. Производство в Москве, печать от 3 дней, гарантия цвета, бесплатный пробник."
	/>
</svelte:head>

<Header calcHref="#calc" />

<!-- Вариант 3 «Расчёт»: цена в первом экране + снятие страхов -->
<div class="hero" style:--bg="url({prod('print-table')})">
	<div class="wrap inner">
		<div class="txt">
			<span class="badge">Производство в Москве</span>
			<h1>Фотообои и фрески от производителя – по размеру вашей стены</h1>
			<ul>
				<li><Icon name="palette" size={22} />Цвет точь-в-точь – или перепечатаем бесплатно</li>
				<li><Icon name="leaf" size={22} />Без запаха, можно в детскую</li>
				<li><Icon name="clock" size={22} />Печать от 3 дней, доставка по Москве</li>
				<li><Icon name="image" size={22} />{catalogSize} дизайнов или ваше изображение</li>
			</ul>
		</div>
		<Calculator />
	</div>
</div>

<Pains />
<ProductTiles />
<ColorGuarantee />
<StyleGrid />
<RoomRow />
<Materials />
<Steps />
<Production />
<UtpGrid title="Почему заказывают у нас" />
<OwnImage />
<Faq />
<LeadForm />
<Footer />

<style>
	.hero {
		color: #fff;
		background:
			linear-gradient(90deg, rgb(0 30 90 / 0.94) 0%, rgb(0 30 90 / 0.8) 55%, rgb(0 30 90 / 0.55) 100%),
			var(--bg) center / cover;
	}

	.inner {
		display: grid;
		grid-template-columns: 1.1fr 430px;
		gap: 48px;
		align-items: center;
		padding-top: 56px;
		padding-bottom: 56px;
	}

	.txt {
		display: grid;
		gap: 20px;
		justify-items: start;
	}

	h1 {
		font-size: clamp(30px, 4.2vw, 50px);
		font-weight: 800;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 12px;
		font-size: 18px;
	}

	li {
		display: flex;
		gap: 12px;
		align-items: center;
	}

	li :global(svg) {
		flex: none;
		color: #9fd35f;
	}

	@media (max-width: 980px) {
		.inner {
			grid-template-columns: 1fr;
			gap: 28px;
		}
	}

	@media (max-width: 720px) {
		.inner {
			padding-top: 28px;
			padding-bottom: 28px;
		}
		ul {
			font-size: 16px;
		}
	}
</style>
