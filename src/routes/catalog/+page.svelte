<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Icon from '#lib/components/Icon.svelte';

	// Полный каталог фресок, спарсенный с lastanza.ru/catalog (static/catalog.json).
	type Item = {
		url: string;
		art: string;
		title: string;
		img: string;
		price: string;
		low: number;
		tags: Record<string, string[]>;
	};

	const GROUPS = ['Коллекция', 'Категория', 'По назначению', 'Цвет', 'По ориентации'];
	const LABEL: Record<string, string> = {
		Коллекция: 'Коллекция',
		Категория: 'Тема',
		'По назначению': 'Помещение',
		Цвет: 'Цвет',
		'По ориентации': 'Ориентация'
	};
	const PAGE = 36;

	let items = $state<Item[]>([]);
	let loading = $state(true);
	let failed = $state(false);
	let picked = $state<Record<string, string>>({});
	let q = $state('');
	let shown = $state(PAGE);
	let open = $state<string | null>('Категория');

	onMount(async () => {
		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const r = await fetch(asset('/catalog.json' as any));
			items = await r.json();
		} catch {
			failed = true;
		}
		loading = false;
		const p = new URLSearchParams(location.search);
		for (const g of GROUPS) {
			const v = p.get(g);
			if (v) picked[g] = v;
		}
		q = p.get('q') ?? '';
	});

	const clean = (v: string) => v.split('|').pop()!.trim();

	const options = $derived(
		Object.fromEntries(
			GROUPS.map((g) => {
				const m = new Map<string, number>();
				for (const it of items) for (const v of it.tags[g] ?? []) m.set(v, (m.get(v) ?? 0) + 1);
				return [g, [...m.entries()].sort((a, b) => b[1] - a[1])];
			})
		) as Record<string, [string, number][]>
	);

	const filtered = $derived(
		items.filter((it) => {
			for (const g of GROUPS) {
				const v = picked[g];
				if (v && !(it.tags[g] ?? []).some((t) => t === v || t.startsWith(v + '|'))) return false;
			}
			if (q.trim()) {
				const s = q.trim().toLowerCase();
				if (!it.art.toLowerCase().includes(s) && !it.title.toLowerCase().includes(s)) return false;
			}
			return true;
		})
	);

	function pick(g: string, v: string) {
		if (picked[g] === v) delete picked[g];
		else picked[g] = v;
		picked = { ...picked };
		shown = PAGE;
	}

	function reset() {
		picked = {};
		q = '';
		shown = PAGE;
	}

	const fmt = (n: number) => n.toLocaleString('ru-RU');
	const lead = resolve('/v1') + '#lead';
</script>

<svelte:head>
	<title>Каталог фресок и фотообоев — {fmt(items.length || 4251)} дизайнов</title>
	<meta name="description" content="Каталог фресок: коллекции Tesoro, ALBA, Mattina и Тренды. Подбор по теме, помещению, цвету и ориентации." />
</svelte:head>

<Header calcHref={lead} home="/v1/" />

<main class="wrap">
	<div class="head">
		<h1>Каталог фресок</h1>
		<p>{loading ? 'Загружаем каталог…' : `${fmt(filtered.length)} из ${fmt(items.length)} дизайнов`}</p>
	</div>

	<div class="layout">
		<aside>
			<label class="search">
				<Icon name="search" size={18} />
				<input placeholder="Артикул или коллекция" bind:value={q} oninput={() => (shown = PAGE)} />
			</label>

			{#each GROUPS as g}
				{#if options[g]?.length}
					<div class="group">
						<button class="gh" onclick={() => (open = open === g ? null : g)}>
							{LABEL[g]}
							{#if picked[g]}<em>{clean(picked[g])}</em>{/if}
							<span>{open === g ? '−' : '+'}</span>
						</button>
						{#if open === g}
							<div class="opts">
								{#each options[g] as [v, n]}
									<button class="opt" class:on={picked[g] === v} onclick={() => pick(g, v)}>
										{v.includes('|') ? v.split('|')[0].trim() + ' · ' : ''}{clean(v)}
										<small>{n}</small>
									</button>
								{/each}
							</div>
						{/if}
					</div>
				{/if}
			{/each}

			{#if Object.keys(picked).length || q}
				<button class="btn btn-outline reset" onclick={reset}>Сбросить фильтры</button>
			{/if}
		</aside>

		<section class="results">
			{#if Object.keys(picked).length}
				<div class="active">
					{#each Object.entries(picked) as [g, v]}
						<button class="chip on" onclick={() => pick(g, v)}>{clean(v)} ✕</button>
					{/each}
				</div>
			{/if}

			{#if failed}
				<p class="empty">Не удалось загрузить каталог. Обновите страницу.</p>
			{:else if !loading && !filtered.length}
				<div class="empty">
					<p>По этим фильтрам ничего нет.</p>
					<button class="btn btn-primary" onclick={reset}>Сбросить фильтры</button>
				</div>
			{/if}

			<div class="grid">
				{#each filtered.slice(0, shown) as it (it.url)}
					<article>
						<a class="pic" href={it.url} target="_blank" rel="noopener">
							<img src={it.img} alt={`${it.title} арт. ${it.art}`} loading="lazy" />
						</a>
						<div class="body">
							<small>{it.title}</small>
							<b>Арт. {it.art}</b>
							<span class="price">{it.price}</span>
							<div class="acts">
								<a class="btn btn-primary" href={lead}>Заказать</a>
								<a class="btn btn-outline" href={lead} title="Бесплатный пробник"><Icon name="gift" size={18} /></a>
							</div>
						</div>
					</article>
				{/each}
			</div>

			{#if shown < filtered.length}
				<button class="btn btn-outline more" onclick={() => (shown += PAGE)}>
					Показать ещё {Math.min(PAGE, filtered.length - shown)} из {fmt(filtered.length - shown)}
				</button>
			{/if}
		</section>
	</div>
</main>

<Footer home="/v1/" />

<style>
	main {
		padding-top: 32px;
	}

	.head {
		display: flex;
		align-items: baseline;
		gap: 16px;
		flex-wrap: wrap;
		margin-bottom: 24px;
	}

	h1 {
		font-size: clamp(26px, 3.4vw, 36px);
		color: var(--navy);
	}

	.head p {
		color: var(--muted);
	}

	.layout {
		display: grid;
		grid-template-columns: 270px 1fr;
		gap: 28px;
		align-items: start;
	}

	aside {
		position: sticky;
		top: 150px;
		display: grid;
		gap: 10px;
		max-height: calc(100vh - 170px);
		overflow-y: auto;
		padding-right: 4px;
	}

	.search {
		display: flex;
		align-items: center;
		gap: 8px;
		border: 1px solid var(--line);
		border-radius: 10px;
		padding: 0 12px;
		color: var(--muted);
	}

	.search input {
		border: 0;
		outline: 0;
		min-height: 46px;
		width: 100%;
		background: none;
	}

	.group {
		border: 1px solid var(--line);
		border-radius: 12px;
		overflow: hidden;
	}

	.gh {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 13px 14px;
		background: #fff;
		border: 0;
		font: inherit;
		font-weight: 600;
		cursor: pointer;
		text-align: left;
	}

	.gh em {
		font-style: normal;
		font-size: 12px;
		background: var(--blue);
		color: #fff;
		border-radius: 999px;
		padding: 2px 8px;
		max-width: 110px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.gh span {
		margin-left: auto;
		color: var(--blue);
		font-size: 20px;
		line-height: 1;
	}

	.opts {
		display: grid;
		padding: 0 6px 8px;
		max-height: 320px;
		overflow-y: auto;
	}

	.opt {
		display: flex;
		justify-content: space-between;
		gap: 8px;
		padding: 8px;
		border: 0;
		background: none;
		border-radius: 8px;
		font: inherit;
		font-size: 14px;
		text-align: left;
		cursor: pointer;
	}

	.opt:hover {
		background: var(--soft-2);
	}

	.opt.on {
		background: var(--blue);
		color: #fff;
	}

	.opt small {
		color: var(--muted);
	}

	.opt.on small {
		color: #cfe0ff;
	}

	.reset {
		min-height: 44px;
	}

	.active {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		margin-bottom: 16px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}

	article {
		border-radius: var(--radius);
		overflow: hidden;
		background: #fff;
		box-shadow: 0 2px 14px rgb(0 30 80 / 0.08);
		display: flex;
		flex-direction: column;
	}

	.pic img {
		width: 100%;
		aspect-ratio: 390 / 300;
		object-fit: cover;
		background: var(--soft-2);
	}

	.body {
		padding: 14px;
		display: grid;
		gap: 2px;
	}

	.body small {
		color: var(--muted);
		font-size: 12px;
	}

	.price {
		color: var(--navy);
		font-weight: 700;
		margin: 4px 0 10px;
	}

	.acts {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 8px;
	}

	.acts .btn {
		min-height: 42px;
		padding: 0 14px;
		font-size: 14px;
		width: auto;
	}

	.more {
		width: 100%;
		margin-top: 20px;
	}

	.empty {
		padding: 40px;
		text-align: center;
		background: var(--soft-2);
		border-radius: var(--radius);
		display: grid;
		gap: 14px;
		justify-items: center;
	}

	@media (max-width: 1100px) {
		.grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 820px) {
		.layout {
			grid-template-columns: 1fr;
		}
		aside {
			position: static;
			max-height: none;
		}
	}

	@media (max-width: 560px) {
		.grid {
			gap: 10px;
		}
		.body {
			padding: 10px;
		}
		.acts {
			grid-template-columns: 1fr;
		}
		.acts .btn-outline {
			display: none;
		}
	}
</style>
