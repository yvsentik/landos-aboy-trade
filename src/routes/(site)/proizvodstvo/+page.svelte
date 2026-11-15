<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Production from '#lib/components/Production.svelte';
	import Steps from '#lib/components/Steps.svelte';
	import LeadForm from '#lib/components/LeadForm.svelte';
	import { brand } from '#lib/data.ts';

	const facts = [
		{ num: 'с 2011', title: 'Работаем онлайн', text: 'Первый заказ на oboitrade.ru – 2 января 2011 года.' },
		{ num: '7', title: 'Магазинов', text: 'Розничные магазины и пункты самовывоза в Москве и области.' },
		{ num: 'от 3 дней', title: 'Печать', text: 'Широкоформатная печать латексными чернилами.' },
		{ num: 'Россия и СНГ', title: 'Доставка', text: 'Собственная курьерская служба и СДЭК.' }
	];
</script>

<svelte:head>
	<title>Производство фотообоев и фресок полного цикла – {brand.name}</title>
	<meta name="description" content="Производство полного цикла: печать, ручная доработка фресок, ретушь, раскрой и упаковка. Обоитрейд – с 2011 года." />
</svelte:head>

<PageHero
	title="Производство полного цикла"
	sub="Печать, ручная доработка, ретушь, раскрой и упаковка – контролируем каждый этап от макета до тубуса."
	photo="warehouse-hd"
/>

<section>
	<div class="wrap">
		<h2>Обоитрейд в цифрах</h2>
		<div class="cards">
			{#each facts as f}
				<div class="card"><span class="num">{f.num}</span><h3>{f.title}</h3><p>{f.text}</p></div>
			{/each}
		</div>
	</div>
</section>

<Production title="Как устроено производство" sub="" />
<Steps />
<LeadForm title="Пришлите изображение – возьмём в работу" />
