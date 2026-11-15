<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Steps from '#lib/components/Steps.svelte';
	import ColorGuarantee from '#lib/components/ColorGuarantee.svelte';
	import OwnImage from '#lib/components/OwnImage.svelte';
	import Faq from '#lib/components/Faq.svelte';
	import LeadForm from '#lib/components/LeadForm.svelte';
	import { brand, steps } from '#lib/data.ts';

	const kinds = [
		{ title: 'Флизелиновые', text: 'Основа дышит, не даёт усадки и не пахнет. Подходят для спальни и детской.' },
		{ title: 'Бесшовные', text: 'Одно полотно до 3,18 м по одной стороне – без стыков на акцентной стене.' },
		{ title: 'Детские', text: 'Латексные чернила на водной основе, экосертификат. Любой сюжет для детской.' },
		{ title: 'По вашему фото', text: 'Печатаем любое изображение: пейзаж, карту, семейное фото, рисунок ребёнка.' }
	];
	const rooms = ['Гостиная', 'Спальня', 'Детская', 'Кухня', 'Прихожая', 'Кабинет', 'Офис', 'Кафе и ресторан'];
</script>

<svelte:head>
	<title>Фотообои на заказ по размеру стены – {brand.name}</title>
	<meta name="description" content="Фотообои на заказ: печать любого изображения по размеру стены от 3 дней. Без запаха, бесплатный пробник и цветопроба, доставка по всей России." />
</svelte:head>

<PageHero
	title="Фотообои на заказ"
	sub="Напечатаем любое изображение по размеру вашей стены. Без запаха – можно в детскую. Пробник и цветопроба бесплатно."
	badge="от 2 300 ₽/м²"
	photo="print-table"
/>

<section>
	<div class="wrap">
		<h2>Какие фотообои печатаем</h2>
		<div class="cards">
			{#each kinds as k}
				<div class="card"><h3>{k.title}</h3><p>{k.text}</p></div>
			{/each}
		</div>
	</div>
</section>

<section>
	<div class="wrap">
		<h2>Для любых помещений</h2>
		<p class="sub">Подберём материал под влажность и нагрузку: для спальни, детской, кафе и офиса</p>
		<div class="chips" style="margin-top: 18px">
			{#each rooms as r}<span class="chip">{r}</span>{/each}
		</div>
	</div>
</section>

<Steps {steps} />
<ColorGuarantee lite />
<OwnImage lite />
<Faq mode="tips" />
<LeadForm title="Пришлите изображение – рассчитаем фотообои за 15 минут" />
