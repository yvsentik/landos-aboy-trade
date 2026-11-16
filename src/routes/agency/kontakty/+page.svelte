<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { tg, max, channel, maxChannel, address } from '#lib/agency.ts';

	// Контакты агентства: мессенджеры, канал, адрес офиса и фото.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const pic = (f: string) => asset(`/img/agency/${f}` as any);
	const photos = [
		['2354-2.jpg', 'Офис агентства в Петербурге'],
		['2342-1.jpg', 'Встреча перед стартом проекта'],
		['2339-1.jpg', 'Среда, десять вечера'],
		['2349-1.jpg', 'Клиенты, с которыми давно дружим']
	];
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
		</div>

		<section class="meet">
			<h2>Работаем лично: встречаемся и показываем</h2>
			<p>Ковид доказал, что агентство спокойно живёт онлайн. Но если есть возможность встретиться с клиентом лично – я её не упускаю. Ничего не продаёт наши услуги лучше, чем разговор с глазу на глаз: можно рассказать про кейс и тут же показать его внутрянку с личного компьютера.</p>
			<p>Офис – {address}. Просьба написать за день до приезда.</p>
			<div class="photos">
				{#each photos as [img, cap]}
					<figure><img src={pic(img)} alt={cap} loading="lazy" /><figcaption>{cap}</figcaption></figure>
				{/each}
			</div>
		</section>
	</div>
</main>

<style>
	.phero { margin-top: 28px; background: var(--navy); color: #fff; border-radius: 16px; padding: 36px 44px; display: grid; gap: 12px; }
	.crumbs { font-size: 14px; opacity: 0.8; }
	.crumbs a:hover { text-decoration: underline; }
	h1 { font-size: clamp(28px, 3.6vw, 44px); font-weight: 800; text-transform: uppercase; line-height: 1.1; }
	.phero p:last-child { font-size: 18px; }

	.grid { margin-top: 24px; }
	.cards { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
	.card { display: grid; gap: 4px; border: 1px solid var(--line); border-radius: 12px; padding: 18px 20px; }
	a.card:hover { border-color: var(--blue); }
	.card b { font-size: 20px; }
	.card span { color: var(--blue); font-weight: 600; }
	div.card span { color: var(--muted); }
	.meet { padding-top: 56px; display: grid; gap: 12px; }
	.meet h2 { font-size: clamp(24px, 3vw, 32px); }
	.meet p { max-width: 900px; font-size: 17px; }
	.photos { margin-top: 12px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
	figure { margin: 0; display: grid; gap: 8px; align-content: start; }
	.photos img { width: 100%; aspect-ratio: 3 / 4; object-fit: cover; border-radius: 12px; }
	figcaption { color: var(--muted); font-size: 14px; }

	@media (max-width: 1000px) {
		.cards { grid-template-columns: 1fr 1fr; }
		.photos { grid-template-columns: 1fr 1fr; }
	}
	@media (max-width: 640px) {
		.phero { padding: 22px 18px; margin-top: 16px; }
		.meet { padding-top: 40px; }
	}
</style>
