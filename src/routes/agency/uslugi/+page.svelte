<script lang="ts">
	import { resolve } from '$app/paths';
	import { directions } from '#lib/agency.ts';

	// Услуги агентства: шесть направлений кратко.
</script>

<svelte:head>
	<title>Услуги – агентство «Фальков»</title>
	<meta name="description" content="Продвижение сайтов в Яндексе и Google, Яндекс Директ, Telegram Ads, разработка сайтов, CRM и рассылки." />
</svelte:head>

<main>
	<div class="wrap">
		<div class="phero">
			<p class="crumbs"><a href={resolve('/agency')}>Главная</a> / Услуги</p>
			<h1>Услуги</h1>
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

	</div>
</main>

<style>
	.phero { margin-top: 28px; background: var(--navy); color: #fff; border-radius: 16px; padding: 36px 44px; display: grid; gap: 12px; }
	.crumbs { font-size: 14px; opacity: 0.8; }
	.crumbs a:hover { text-decoration: underline; }
	h1 { font-size: clamp(28px, 3.6vw, 44px); font-weight: 800; text-transform: uppercase; line-height: 1.1; }
	.phero p:last-child { font-size: 18px; }

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

	@media (max-width: 1000px) {
		.dirs { grid-template-columns: 1fr 1fr; }
	}
	@media (max-width: 640px) {
		.phero { padding: 22px 18px; margin-top: 16px; }
		.dirs { grid-template-columns: 1fr; }
	}
</style>
