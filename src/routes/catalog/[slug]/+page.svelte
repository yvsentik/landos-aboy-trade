<script lang="ts">
	import { resolve } from '$app/paths';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import MaxLogo from '#lib/components/MaxLogo.svelte';
	import { brand } from '#lib/data.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const p = $derived(data.p);

	const LABEL: Record<string, string> = {
		Коллекция: 'Коллекция',
		Категория: 'Тема',
		'По назначению': 'Помещение',
		Цвет: 'Цвет',
		'По ориентации': 'Ориентация'
	};

	let photo = $state<'int' | 'full'>('int');
	let size = $state('');
	let tex = $state('');
	let w = $state(0);
	let h = $state(0);

	$effect(() => {
		// сброс выбора при переходе на другую карточку
		size = p.sizes[0] ?? '';
		tex = data.textures[0]?.id ?? '';
		photo = 'int';
	});

	$effect(() => {
		const [a, b] = size.split('x').map(Number);
		if (a && b) {
			w = a;
			h = b;
		}
	});

	const t = $derived(data.textures.find((x) => x.id === tex));
	const area = $derived(Math.max(0, (w * h) / 10000));
	const perM = $derived(t?.price || p.price);
	const total = $derived(Math.round(area * perM));
	const fmt = (n: number) => n.toLocaleString('ru-RU');
	const clean = (v: string) => v.split('|').pop()!.trim();
	const cat = (g: string, v: string) => `${resolve('/catalog')}?${encodeURIComponent(g)}=${encodeURIComponent(v)}`;
	const lead = resolve('/v1') + '#lead';
</script>

<svelte:head>
	<title>{p.h1} — купить фреску от {fmt(p.price)} ₽/м²</title>
	<meta name="description" content="{p.h1}. Печать по вашему размеру, {data.textures.length} фактур на выбор. Бесплатный пробник и доставка по Москве." />
</svelte:head>

<Header calcHref={lead} home="/v1/" />

<main class="wrap">
	<nav class="crumbs">
		<a href={resolve('/v1')}>Главная</a> / <a href={resolve('/catalog')}>Каталог</a>
		{#if p.tags['Коллекция']}/ <a href={cat('Коллекция', p.tags['Коллекция'][0])}>{clean(p.tags['Коллекция'][0])}</a>{/if}
		/ <span>Арт. {p.art}</span>
	</nav>

	<div class="top">
		<div class="gallery">
			<div class="main">
				{#if photo === 'int' || !p.full}
					<img src={p.img.replace('/390_300_1/', '/800_800_1/')} onerror={(e) => ((e.currentTarget as HTMLImageElement).src = p.img)} alt="{p.h1} в интерьере" />
				{:else}
					<img src={p.full} alt={p.h1} />
				{/if}
			</div>
			{#if p.full}
				<div class="thumbs">
					<button class:on={photo === 'int'} onclick={() => (photo = 'int')}><img src={p.img} alt="В интерьере" /></button>
					<button class:on={photo === 'full'} onclick={() => (photo = 'full')}><img src={p.full} alt="Изображение" /></button>
				</div>
			{/if}
			{#if p.video}
				<video src={p.video} controls muted playsinline preload="none" poster={p.img}></video>
			{/if}
		</div>

		<div class="info">
			<h1>{p.h1}</h1>
			<div class="tags">
				{#each Object.entries(p.tags) as [g, vs]}
					{#each vs as v}
						<a class="chip" href={cat(g, v)} title={LABEL[g]}>{clean(v)}</a>
					{/each}
				{/each}
			</div>

			{#if p.sizes.length}
				<label class="lbl" for="size">Размер, см (ширина × высота)</label>
				<div class="sizerow">
					<select id="size" class="field" bind:value={size}>
						{#each p.sizes as s}<option value={s}>{s.replace('x', ' × ')}</option>{/each}
					</select>
					<input class="field" type="number" min="30" bind:value={w} aria-label="Ширина, см" />
					<input class="field" type="number" min="30" bind:value={h} aria-label="Высота, см" />
				</div>
				<p class="hint">Напечатаем по вашему размеру — укажите свои ширину и высоту</p>
			{/if}

			{#if data.textures.length}
				<p class="lbl">Материал (фактура)</p>
				<div class="tex">
					{#each data.textures as x}
						<button class:on={tex === x.id} onclick={() => (tex = x.id)}>
							<img src={x.img} alt={x.name} loading="lazy" />
							<b>{x.name}</b>
							<span>{fmt(x.price)} ₽/м²</span>
						</button>
					{/each}
				</div>
				{#if t?.desc}<p class="desc">{t.desc}</p>{/if}
			{/if}

			<div class="sum">
				<div>
					<span>{area.toFixed(2).replace('.', ',')} м² × {fmt(perM)} ₽</span>
					<b>{fmt(total)} ₽</b>
				</div>
				<a class="btn btn-pink" href={lead}><Icon name="gift" size={20} />Заказать + бесплатный пробник</a>
				<div class="alt">
					<a href={brand.phoneHref}><Icon name="phone" size={18} />{brand.phone}</a>
					<a href={brand.max}><MaxLogo size={18} />Написать в Макс</a>
				</div>
			</div>

			<ul class="pros">
				<li><Icon name="palette" size={20} />Цвет точь-в-точь — бесплатная цветопроба до печати</li>
				<li><Icon name="clock" size={20} />Печать от 3 дней</li>
				<li><Icon name="truck" size={20} />Бесплатная доставка по Москве от 30 000 ₽</li>
			</ul>
		</div>
	</div>

	{#if data.colors.length}
		<section>
			<h2>Другие цвета этого изображения</h2>
			<div class="colors">
				{#each data.colors as c}
					<a href={resolve('/catalog/[slug]', { slug: c.slug })}>
						<img src={c.img} alt="Арт. {c.art}" loading="lazy" />
						<span>Арт. {c.art}</span>
					</a>
				{/each}
			</div>
		</section>
	{/if}
</main>

<Footer home="/v1/" />

<style>
	main {
		padding-top: 20px;
	}

	.crumbs {
		font-size: 14px;
		color: var(--muted);
		margin-bottom: 18px;
	}

	.crumbs a:hover {
		color: var(--blue);
	}

	.top {
		display: grid;
		grid-template-columns: 1.15fr 1fr;
		gap: 36px;
		align-items: start;
	}

	.gallery {
		display: grid;
		gap: 12px;
		position: sticky;
		top: 150px;
	}

	.main img {
		width: 100%;
		border-radius: var(--radius);
		background: var(--soft-2);
	}

	.thumbs {
		display: flex;
		gap: 10px;
	}

	.thumbs button {
		width: 96px;
		height: 72px;
		padding: 0;
		border: 2px solid transparent;
		border-radius: 10px;
		overflow: hidden;
		cursor: pointer;
		background: none;
	}

	.thumbs button.on {
		border-color: var(--blue);
	}

	.thumbs img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	video {
		width: 100%;
		border-radius: 12px;
		background: #000;
	}

	h1 {
		font-size: clamp(24px, 3vw, 32px);
		color: var(--navy);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin: 14px 0 22px;
	}

	.tags .chip {
		font-size: 13px;
		padding: 6px 12px;
	}

	.lbl {
		display: block;
		font-weight: 600;
		margin: 18px 0 8px;
	}

	.sizerow {
		display: grid;
		grid-template-columns: 1.4fr 1fr 1fr;
		gap: 8px;
	}

	.hint {
		font-size: 13px;
		color: var(--muted);
		margin-top: 6px;
	}

	.tex {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
		gap: 8px;
	}

	.tex button {
		display: grid;
		gap: 2px;
		padding: 6px;
		border: 2px solid var(--line);
		border-radius: 12px;
		background: #fff;
		font: inherit;
		text-align: left;
		cursor: pointer;
	}

	.tex button.on {
		border-color: var(--blue);
		background: var(--soft);
	}

	.tex img {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		border-radius: 8px;
		margin-bottom: 4px;
	}

	.tex b {
		font-size: 13px;
	}

	.tex span {
		font-size: 12px;
		color: var(--navy);
		font-weight: 600;
	}

	.desc {
		font-size: 14px;
		color: var(--muted);
		margin-top: 10px;
	}

	.sum {
		margin-top: 22px;
		background: var(--soft);
		border-radius: var(--radius);
		padding: 20px;
		display: grid;
		gap: 14px;
	}

	.sum > div:first-child {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 10px;
	}

	.sum span {
		color: var(--muted);
	}

	.sum b {
		font-size: 30px;
		color: var(--navy);
	}

	.alt {
		display: flex;
		gap: 20px;
		flex-wrap: wrap;
	}

	.alt a {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-weight: 600;
		color: var(--navy);
	}

	.pros {
		list-style: none;
		padding: 0;
		margin: 18px 0 0;
		display: grid;
		gap: 8px;
	}

	.pros li {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.pros :global(svg) {
		color: var(--green);
		flex: none;
	}

	.colors {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 12px;
		margin-top: 18px;
	}

	.colors a {
		display: grid;
		gap: 6px;
		font-size: 14px;
		font-weight: 600;
	}

	.colors img {
		width: 100%;
		aspect-ratio: 390 / 300;
		object-fit: cover;
		border-radius: 12px;
	}

	@media (max-width: 900px) {
		.top {
			grid-template-columns: 1fr;
		}
		.gallery {
			position: static;
		}
		.colors {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 560px) {
		.sizerow {
			grid-template-columns: 1fr 1fr;
		}
		.sizerow select {
			grid-column: span 2;
		}
		.colors {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
