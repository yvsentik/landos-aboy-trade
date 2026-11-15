<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import InfoBlocks from '#lib/components/InfoBlocks.svelte';
	import Calculator from '#lib/components/Calculator.svelte';
	import LeadForm from '#lib/components/LeadForm.svelte';
	import { brand } from '#lib/data.ts';

	const included = [
		{ title: 'Макет дизайнера', text: 'Подгонка изображения под стену – бесплатно' },
		{ title: 'Пробник и цветопроба', text: 'Фрагмент на выбранной фактуре до оплаты – бесплатно' },
		{ title: 'Печать по размеру', text: 'Без лишних рулонов и обрезков' },
		{ title: 'Упаковка в тубус', text: 'Полотно не мнётся при доставке' }
	];
	const factors = [
		'Площадь стены',
		'Фактура: от матовой гладкой до кракелюра и холста',
		'Ручная доработка художником',
		'Нужна ли подготовка изображения (ретушь, смена цвета)'
	];
</script>

<svelte:head>
	<title>Цены на фотообои и фрески на заказ – {brand.name}</title>
	<meta name="description" content="Цены на фотообои от 2 300 ₽/м² и фрески от 2 800 ₽/м². Рассчитайте стоимость по размеру стены. Макет и пробник бесплатно." />
</svelte:head>

<PageHero
	title="Цены"
	sub="Фотообои от 2 300 ₽/м², фрески от 2 800 ₽/м². Точную сумму назовём по фото за 15 минут."
	photo="cutting"
/>

<section>
	<div class="wrap calcwrap">
		<div>
			<h2>Рассчитайте стоимость</h2>
			<p class="sub">Укажите размер стены – покажем ориентир. Итог зависит от фактуры.</p>
			<div class="prose">
				<h3 style="margin-top: 24px">Что влияет на цену</h3>
				<ul>
					{#each factors as f}<li>{f}</li>{/each}
				</ul>
			</div>
		</div>
		<Calculator />
	</div>
</section>

<InfoBlocks show={['prices']} />

<section>
	<div class="wrap">
		<h2>Что входит в цену</h2>
		<div class="cards">
			{#each included as c}
				<div class="card"><h3>{c.title}</h3><p>{c.text}</p></div>
			{/each}
		</div>
	</div>
</section>

<LeadForm title="Пришлите изображение – назовём точную цену" />

<style>
	.calcwrap {
		display: grid;
		grid-template-columns: 1fr 430px;
		gap: 40px;
		align-items: start;
	}

	@media (max-width: 900px) {
		.calcwrap {
			grid-template-columns: 1fr;
		}
	}
</style>
