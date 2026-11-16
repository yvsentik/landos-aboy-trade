<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { cases, channel } from '#lib/agency.ts';

	// Кейсы агентства: 20 проектов с цифрами. У шести есть графики из постов канала.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const pic = (f: string) => asset(`/img/agency/${f}` as any);
	const post = (img: string) => `${channel}/${img.split('-')[0]}`;
</script>

<svelte:head>
	<title>Кейсы – агентство «Фальков»</title>
	<meta name="description" content="{cases.length} проектов агентства «Фальков»: исходная точка, работы и результат в цифрах." />
</svelte:head>

<main>
	<div class="wrap">
		<div class="phero">
			<p class="crumbs"><a href={resolve('/agency')}>Главная</a> / Кейсы</p>
			<h1>Кейсы: проекты и результаты в цифрах</h1>
			<p>Названия клиентов обезличены там, где действует NDA.</p>
		</div>

		<div class="cases">
			{#each cases as c}
				<article>
					<div class="ctop"><span class="ctag">{c.tag}</span><span>{c.geo}</span></div>
					<b class="cname">{c.name}</b>
					<div class="chead"><b class="big">{c.big}</b><span>{c.title}</span></div>
					<p>{c.text}</p>
					<div class="cstats">
						{#each c.stats as [v, l]}<div><b>{v}</b><span>{l}</span></div>{/each}
					</div>
					{#if c.img}
						<a class="shot" href={post(c.img)} target="_blank" rel="noopener">
							<img src={pic(c.img)} alt="График: {c.name}" loading="lazy" />
							<span>Читать кейс в Telegram →</span>
						</a>
					{/if}
				</article>
			{/each}
		</div>

		<div class="tgband">
			<div class="tnums">
				<div><b>1 000+</b><span>подписчиков</span></div>
				<div><b>50+</b><span>кейсов</span></div>
			</div>
			<p>в нашем Telegram-канале. Разбираем проекты клиентов с цифрами и скриншотами.</p>
			<a class="btn btn-white" href={channel} target="_blank" rel="noopener">Подписаться на канал</a>
		</div>
	</div>
</main>

<style>
	.phero { margin-top: 28px; background: var(--navy); color: #fff; border-radius: 16px; padding: 36px 44px; display: grid; gap: 12px; }
	.crumbs { font-size: 14px; opacity: 0.8; }
	.crumbs a:hover { text-decoration: underline; }
	h1 { font-size: clamp(26px, 3.4vw, 42px); font-weight: 800; text-transform: uppercase; line-height: 1.1; }
	.phero p:last-child { font-size: 18px; }
	.btn { border-radius: 8px; }

	.cases { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
	article { border: 1px solid var(--line); border-radius: 12px; padding: 20px; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
	.ctop { display: flex; justify-content: space-between; gap: 10px; font-size: 13px; color: var(--muted); }
	.ctag { color: var(--navy); font-weight: 600; }
	.cname { font-size: 15px; overflow-wrap: anywhere; }
	.chead { display: grid; gap: 4px; }
	.big { font-size: 34px; font-weight: 800; color: var(--blue); line-height: 1; }
	.chead span { font-weight: 600; font-size: 17px; }
	article p { color: var(--muted); font-size: 15px; }
	.cstats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: auto; padding-top: 12px; border-top: 1px solid var(--line); }
	.cstats b { display: block; color: var(--navy); }
	.cstats span { color: var(--muted); font-size: 13px; }
	.shot { display: grid; gap: 8px; }
	.shot img { width: 100%; border: 1px solid var(--line); border-radius: 8px; }
	.shot span { color: var(--blue); font-weight: 600; font-size: 14px; }

	.tgband { margin-top: 56px; background: var(--navy); color: #fff; border-radius: 16px; padding: 36px 44px; display: flex; align-items: center; gap: 36px; }
	.tnums { display: flex; gap: 36px; flex: none; }
	.tnums div { display: grid; }
	.tnums b { font-size: 44px; font-weight: 800; line-height: 1; }
	.tnums span { opacity: 0.85; margin-top: 4px; }
	.tgband p { font-size: 18px; opacity: 0.9; }
	.tgband .btn { flex: none; margin-left: auto; }

	@media (max-width: 1000px) {
		.cases { grid-template-columns: 1fr 1fr; }
		.tgband { flex-wrap: wrap; padding: 28px; gap: 20px; }
		.tgband .btn { margin-left: 0; }
	}
	@media (max-width: 640px) {
		.phero { padding: 22px 18px; margin-top: 16px; }
		.cases { grid-template-columns: 1fr; }
		.tgband { margin-top: 40px; padding: 22px 18px; }
		.tnums b { font-size: 36px; }
		.tgband .btn { width: 100%; }
	}
</style>
