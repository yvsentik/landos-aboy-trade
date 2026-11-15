<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Steps from '#lib/components/Steps.svelte';
	import OwnImage from '#lib/components/OwnImage.svelte';
	import LeadForm from '#lib/components/LeadForm.svelte';
	import { brand, steps } from '#lib/data.ts';

	const what = [
		{ title: 'Фото', text: 'Семейное фото, пейзаж из путешествия, снимок вашего дома.' },
		{ title: 'Картина или рисунок', text: 'Репродукция, детский рисунок, эскиз художника.' },
		{ title: 'Референс', text: 'Скриншот из Pinterest или журнала – подберём похожий лицензионный сюжет.' },
		{ title: 'Просто идея', text: 'Опишите словами – дизайнер предложит варианты.' }
	];
	const designer = [
		'Подгонит изображение под пропорции стены',
		'Проверит, чтобы главное не ушло за шкаф, кровать или телевизор',
		'При необходимости поменяет цвет или уберёт лишние детали',
		'Добавит 5–10 мм на подрезку, чтобы полотна точно хватило'
	];
</script>

<svelte:head>
	<title>Обои на заказ по вашему изображению – {brand.name}</title>
	<meta name="description" content="Обои и фрески по вашему фото, рисунку или идее. Дизайнер бесплатно подготовит макет под размер стены. Пришлите изображение в Макс или Telegram." />
</svelte:head>

<PageHero
	title="Обои на заказ по вашей идее"
	sub="Пришлите фото, картину или просто опишите идею – дизайнер подготовит макет под вашу стену и рассчитает цену."
	badge="Макет бесплатно"
	photo="retouch"
/>

<section>
	<div class="wrap">
		<h2>Что можно прислать</h2>
		<div class="cards">
			{#each what as w}
				<div class="card"><h3>{w.title}</h3><p>{w.text}</p></div>
			{/each}
		</div>
	</div>
</section>

<section>
	<div class="wrap prose">
		<h2>Каким должно быть изображение</h2>
		<p>
			Картинка увеличивается в десятки раз, поэтому нужен файл высокого разрешения: от 300 DPI или в
			векторе. Обычная картинка из поиска при печати станет размытой.
		</p>
		<p>
			Не уверены в качестве? Пришлите как есть – дизайнер проверит и, если нужно, подберёт похожий
			лицензионный сюжет в фотобанке.
		</p>
		<h2 style="margin-top: 32px">Что сделает дизайнер</h2>
		<ul>
			{#each designer as d}<li>{d}</li>{/each}
		</ul>
	</div>
</section>

<Steps {steps} />
<OwnImage lite />
<LeadForm title="Пришлите изображение – рассчитаем за 15 минут" />
