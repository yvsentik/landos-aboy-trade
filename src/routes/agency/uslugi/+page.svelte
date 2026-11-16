<script lang="ts">
	import { resolve } from '$app/paths';
	import { directions, groups } from '#lib/agency.ts';

	// Услуги агентства: 6 направлений и каталог из 54 услуг с ценами (вкладки по группам).
	let tab = $state(0);
	const total = groups.reduce((n, g) => n + g.items.length, 0);
</script>

<svelte:head>
	<title>Услуги и цены – агентство «Фальков»</title>
	<meta name="description" content="Продвижение сайтов, Яндекс Директ, Telegram Ads, разработка, CRM и рассылки. {total} услуг с составом работ и ценами." />
</svelte:head>

<main>
	<div class="wrap">
		<div class="phero">
			<p class="crumbs"><a href={resolve('/agency')}>Главная</a> / Услуги</p>
			<h1>Услуги и цены</h1>
			<p>Шесть направлений. Можно взять одно, можно отдать маркетинг под ключ.</p>
		</div>

		<div class="dirs">
			{#each directions as d}
				<div class="dir">
					<span class="dn">{d.n}</span>
					<h2>{d.name}</h2>
					<small>{d.sub}</small>
					<p>{d.text}</p>
					<ul>{#each d.points as pt}<li>{pt}</li>{/each}</ul>
					{#if d.stat}<div class="dstat"><b>{d.stat[0]}</b><span>{d.stat[1]}</span></div>{/if}
				</div>
			{/each}
		</div>

		<section>
			<h2 class="h2">Все {total} услуги с ценами</h2>
			<div class="tabs" role="tablist">
				{#each groups as g, i}
					<button type="button" role="tab" aria-selected={tab === i} class:on={tab === i} onclick={() => (tab = i)}>{g.name}<span>{g.items.length}</span></button>
				{/each}
			</div>
			<p class="gtext">{groups[tab].text}</p>
			<div class="svc">
				{#each groups[tab].items as [name, text, price, per]}
					<div class="srow">
						<div><b>{name}</b><span>{text}</span></div>
						<div class="sprice"><b>{price}</b><span>{per}</span></div>
					</div>
				{/each}
			</div>
		</section>

		<section class="choose">
			<h2>Как выбрать услугу</h2>
			<p>Заявки нужны в этом месяце – начинайте с Яндекс Директа, он даёт обращения с первой недели. Есть запас в несколько месяцев и дорогой клик в нише – вкладывайтесь в продвижение сайта в поиске. Трафик идёт, а заявок мало – смотрите на сайт и учёт обращений. База клиентов лежит без дела – подключайте рассылки.</p>
			<a class="btn btn-outline" href={resolve('/agency/keysy')}>Смотреть кейсы</a>
		</section>
	</div>
</main>

<style>
	.phero { margin-top: 28px; background: var(--navy); color: #fff; border-radius: 16px; padding: 36px 44px; display: grid; gap: 12px; }
	.crumbs { font-size: 14px; opacity: 0.8; }
	.crumbs a:hover { text-decoration: underline; }
	h1 { font-size: clamp(28px, 3.6vw, 44px); font-weight: 800; text-transform: uppercase; line-height: 1.1; }
	.phero p:last-child { font-size: 18px; }
	section { padding-top: 56px; }
	.h2 { font-size: clamp(24px, 3vw, 32px); }
	.btn { border-radius: 8px; }

	.dirs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
	.dir { background: #e8eefa; border-radius: 12px; padding: 22px; display: flex; flex-direction: column; gap: 6px; min-width: 0; }
	.dn { color: var(--blue); font-weight: 800; font-size: 14px; }
	.dir h2 { font-size: 22px; }
	.dir small { color: var(--navy); font-weight: 600; }
	.dir p { color: var(--muted); margin-top: 4px; }
	.dir ul { margin: 6px 0 0; padding-left: 18px; display: grid; gap: 4px; }
	.dstat { margin-top: auto; padding-top: 14px; display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
	.dstat b { font-size: 26px; font-weight: 800; color: var(--blue); white-space: nowrap; }
	.dstat span { color: var(--muted); font-size: 14px; }

	.tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px; }
	.tabs button { font: inherit; font-weight: 600; cursor: pointer; border: 1px solid var(--line); background: #fff; color: inherit; border-radius: 8px; padding: 10px 14px; display: flex; gap: 8px; align-items: center; }
	.tabs button span { color: var(--muted); font-size: 13px; }
	.tabs button.on { background: var(--blue); border-color: var(--blue); color: #fff; }
	.tabs button.on span { color: rgb(255 255 255 / 0.75); }
	.gtext { color: var(--muted); margin-top: 14px; }
	.svc { margin-top: 14px; border: 1px solid var(--line); border-radius: 12px; display: grid; grid-template-columns: 1fr 1fr; overflow: hidden; }
	.srow { display: flex; gap: 16px; justify-content: space-between; padding: 16px 20px; border-top: 1px solid var(--line); }
	.srow:nth-child(-n + 2) { border-top: 0; }
	.srow:nth-child(odd) { border-right: 1px solid var(--line); }
	.srow b { display: block; }
	.srow span { color: var(--muted); font-size: 14px; }
	.sprice { text-align: right; flex: none; }
	.sprice b { color: var(--blue); white-space: nowrap; }

	.choose { display: grid; gap: 12px; justify-items: start; }
	.choose h2 { font-size: 24px; }
	.choose p { color: var(--muted); max-width: 900px; }

	@media (max-width: 1000px) {
		.dirs { grid-template-columns: 1fr 1fr; }
		.svc { grid-template-columns: 1fr; }
		.srow:nth-child(odd) { border-right: 0; }
		.srow:nth-child(2) { border-top: 1px solid var(--line); }
	}
	@media (max-width: 640px) {
		.phero { padding: 22px 18px; margin-top: 16px; }
		section { padding-top: 40px; }
		.dirs { grid-template-columns: 1fr; }
		.srow { flex-direction: column; gap: 6px; padding: 14px; }
		.sprice { text-align: left; }
		.sprice b { display: inline; margin-right: 6px; }
	}
</style>
