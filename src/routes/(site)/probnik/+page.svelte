<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import InfoBlocks from '#lib/components/InfoBlocks.svelte';
	import ColorGuarantee from '#lib/components/ColorGuarantee.svelte';
	import LeadForm from '#lib/components/LeadForm.svelte';
	import { brand } from '#lib/data.ts';

	const why = [
		{ title: 'Мониторы искажают цвет', text: 'На экране оттенок один, на стене – другой. Пробник показывает настоящий цвет.' },
		{ title: 'Видно фактуру', text: 'Можно потрогать рельеф и посмотреть, как он играет на свету в вашей комнате.' },
		{ title: 'Подберёте отделку', text: 'По пробнику легко подобрать краску или обои для остальных стен.' }
	];
</script>

<svelte:head>
	<title>Бесплатный пробник и цветопроба фрески – {brand.name}</title>
	<meta name="description" content="Бесплатный пробник фрески или фотообоев: печатаем фрагмент на выбранной фактуре до оплаты. Гарантируем, что итог совпадёт с пробником." />
</svelte:head>

<PageHero
	title="Бесплатный пробник"
	sub="Печатаем фрагмент вашего изображения на выбранной фактуре – до оплаты. Итог совпадёт с пробником."
	badge="Бесплатно"
	photo="colors"
/>

<section>
	<div class="wrap">
		<h2>Зачем нужен пробник</h2>
		<div class="cards">
			{#each why as w}
				<div class="card"><h3>{w.title}</h3><p>{w.text}</p></div>
			{/each}
		</div>
	</div>
</section>

<InfoBlocks show={['probnik']} />
<ColorGuarantee lite />
<LeadForm title="Закажите пробник бесплатно" text="Пришлите изображение или оставьте телефон – подготовим цветопробу." />
