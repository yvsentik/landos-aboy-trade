<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { tg, max, channel, maxChannel, address } from '#lib/agency.ts';

	// Контакты агентства: мессенджеры, канал, адрес офиса и фото.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const pic = (f: string) => asset(`/img/agency/${f}` as any);
</script>

<svelte:head>
	<title>Контакты – агентство «Фальков»</title>
	<meta name="description" content="Напишите агентству «Фальков» в Telegram или Макс. Офис: {address}." />
</svelte:head>

<main>
	<div class="wrap">
		<div class="phero">
			<p class="crumbs"><a href={resolve('/agency')}>Главная</a> / Контакты</p>
			<h1>Контакты</h1>
			<p>Напишите нам в удобном мессенджере или оставьте заявку.</p>
		</div>

		<div class="grid">
			<div class="cards">
				<a class="card" href={tg} target="_blank" rel="noopener"><b>Telegram</b><span>@falkov_marketing</span></a>
				<a class="card" href={max} target="_blank" rel="noopener"><b>Макс</b><span>Написать в Макс</span></a>
				<a class="card" href={channel} target="_blank" rel="noopener"><b>Кейсы в Telegram</b><span>@falkov_agency</span></a>
				<a class="card" href={maxChannel} target="_blank" rel="noopener"><b>Кейсы в Максе</b><span>SEO КЕЙСЫ Falkov</span></a>
				<div class="card"><b>Офис</b><span>{address}</span></div>
			</div>
			<div class="photos">
				<img src={pic('2354-2.jpg')} alt="Офис агентства" loading="lazy" />
				<img src={pic('2349-1.jpg')} alt="Основатель агентства с клиентами" loading="lazy" />
			</div>
		</div>
	</div>
</main>

<style>
	.phero { margin-top: 28px; background: var(--navy); color: #fff; border-radius: 16px; padding: 36px 44px; display: grid; gap: 12px; }
	.crumbs { font-size: 14px; opacity: 0.8; }
	.crumbs a:hover { text-decoration: underline; }
	h1 { font-size: clamp(28px, 3.6vw, 44px); font-weight: 800; text-transform: uppercase; line-height: 1.1; }
	.phero p:last-child { font-size: 18px; }

	.grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 24px; margin-top: 24px; align-items: start; }
	.cards { display: grid; gap: 12px; }
	.card { display: grid; gap: 4px; border: 1px solid var(--line); border-radius: 12px; padding: 18px 20px; }
	a.card:hover { border-color: var(--blue); }
	.card b { font-size: 20px; }
	.card span { color: var(--blue); font-weight: 600; }
	div.card span { color: var(--muted); }
	.photos { display: grid; grid-template-columns: 1fr 1.6fr; gap: 12px; align-items: start; }
	.photos img { width: 100%; height: auto; border-radius: 12px; }

	@media (max-width: 1000px) {
		.grid { grid-template-columns: 1fr; }
	}
	@media (max-width: 640px) {
		.phero { padding: 22px 18px; margin-top: 16px; }
		.photos { grid-template-columns: 1fr; }
	}
</style>
