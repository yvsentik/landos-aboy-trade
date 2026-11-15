<script lang="ts">
	import { resolve, asset } from '$app/paths';
	import { onMount } from 'svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { shop } from '#lib/shop.svelte.ts';
	import { brand } from '#lib/data.ts';

	// Избранное: карточки берём из общего каталога static/catalog.json
	type Item = { s: string; a: string; t: string; i: string; p: number };
	let all = $state<Item[]>([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			all = await (await fetch(asset('/catalog.json' as any))).json();
		} catch {
			all = [];
		}
		loading = false;
	});

	const items = $derived(shop.fav.map((s) => all.find((x) => x.s === s)).filter((x): x is Item => !!x));
	const fmt = (n: number) => n.toLocaleString('ru-RU');
</script>

<svelte:head>
	<title>Избранное – {brand.name}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="wrap">
	<nav class="crumbs"><a href="/">Главная</a> / <span>Избранное</span></nav>
	<h1>Избранное {#if shop.fav.length}<small>{shop.fav.length}</small>{/if}</h1>

	{#if !loading && !items.length}
		<div class="empty">
			<Icon name="heart" size={44} />
			<h2>Здесь пока пусто</h2>
			<p>Нажмите на сердечко у понравившейся фрески – она появится здесь.</p>
			<a class="btn btn-primary" href="/catalog/">Перейти в каталог</a>
		</div>
	{:else}
		<div class="grid">
			{#each items as it (it.s)}
				<article>
					<div class="picw">
						<a href={resolve('/(site)/catalog/[slug]', { slug: it.s })}><img src={it.i} alt="Арт. {it.a}" loading="lazy" /></a>
						<button class="heart" onclick={() => shop.toggleFav(it.s)} aria-label="Убрать из избранного"><Icon name="heart" size={18} /></button>
					</div>
					<div class="body">
						<small>{it.t}</small>
						<b>Арт. {it.a}</b>
						<span>от {fmt(it.p)} ₽/м²</span>
						<a class="btn btn-primary" href={resolve('/(site)/catalog/[slug]', { slug: it.s })}>Выбрать размер</a>
					</div>
				</article>
			{/each}
		</div>
	{/if}
</main>

<style>
	main {
		padding-top: 24px;
	}

	.crumbs {
		font-size: 14px;
		color: var(--muted);
		margin-bottom: 12px;
	}

	h1 {
		font-size: clamp(26px, 3.4vw, 36px);
		color: var(--navy);
		margin-bottom: 24px;
	}

	h1 small {
		font-size: 18px;
		color: var(--muted);
	}

	.empty {
		background: var(--soft-2);
		border-radius: var(--radius);
		padding: 48px 24px;
		display: grid;
		justify-items: center;
		gap: 12px;
		text-align: center;
	}

	.empty :global(svg) {
		color: var(--pink);
	}

	.empty p {
		color: var(--muted);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
	}

	article {
		border-radius: var(--radius);
		overflow: hidden;
		box-shadow: 0 2px 14px rgb(0 30 80 / 0.08);
	}

	.picw {
		position: relative;
	}

	.picw img {
		width: 100%;
		aspect-ratio: 390 / 300;
		object-fit: cover;
	}

	.heart {
		position: absolute;
		top: 10px;
		right: 10px;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		border: 0;
		background: var(--pink);
		color: #fff;
		display: grid;
		place-items: center;
		cursor: pointer;
	}

	.body {
		padding: 14px;
		display: grid;
		gap: 4px;
	}

	.body small {
		color: var(--muted);
		font-size: 12px;
	}

	.body span {
		color: var(--navy);
		font-weight: 700;
		margin-bottom: 8px;
	}

	.body .btn {
		min-height: 42px;
		font-size: 14px;
	}

	@media (max-width: 980px) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 640px) {
		.grid {
			grid-template-columns: 1fr 1fr;
			gap: 10px;
		}
	}
</style>
