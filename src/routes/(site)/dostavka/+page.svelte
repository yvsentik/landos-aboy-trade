<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import InfoBlocks from '#lib/components/InfoBlocks.svelte';
	import LeadForm from '#lib/components/LeadForm.svelte';
	import { brand } from '#lib/data.ts';

	const pay = [
		{ title: 'Наличными', text: 'При получении заказа' },
		{ title: 'Картой', text: 'Онлайн или при получении' },
		{ title: 'По счёту', text: 'Банковский перевод для компаний, предоплата 100%' }
	];
</script>

<svelte:head>
	<title>Доставка и монтаж фотообоев и фресок – {brand.name}</title>
	<meta name="description" content="Доставка фотообоев и фресок курьером и СДЭК по всей России и СНГ. Бесплатно от 25 000 ₽. Упаковка в ударопрочный тубус, поклейка по запросу." />
</svelte:head>

<PageHero
	title="Доставка и монтаж"
	sub="Курьером по Москве и области за 1–3 дня, по России и СНГ – СДЭК. Бесплатно при заказе от 25 000 ₽."
	photo="tubes"
/>

<InfoBlocks show={['delivery']} />

<section>
	<div class="wrap">
		<h2>Оплата</h2>
		<div class="cards">
			{#each pay as p}
				<div class="card"><h3>{p.title}</h3><p>{p.text}</p></div>
			{/each}
		</div>
	</div>
</section>

<LeadForm title="Рассчитаем заказ и доставку" text="Пришлите изображение и город – назовём цену с доставкой." />
