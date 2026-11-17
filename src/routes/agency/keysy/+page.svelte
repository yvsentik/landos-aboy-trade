<script lang="ts">
	import { asset } from '$app/paths';
	import { cases, channel, maxChannel, ag } from '#lib/agency.ts';
	import ChannelBand from '#lib/components/agency/ChannelBand.svelte';

	// Кейсы агентства: проекты с цифрами, скриншоты и ссылки на посты в канале @falkov_agency.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const pic = (f: string) => asset(`/img/agency/${f}` as any);
	let all = $state(false); // на телефоне сначала видны 6 кейсов
</script>

<svelte:head>
	<title>Кейсы – агентство «Фальков»</title>
	<meta name="description" content="{cases.length} проектов агентства «Фальков»: исходная точка, работы и результат в цифрах." />
</svelte:head>

<main>
	<div class="wrap">
		<div class="phero">
			<p class="crumbs"><a href={ag()}>Главная</a> / Кейсы</p>
			<h1>Кейсы: проекты и результаты в цифрах</h1>
			<p>Названия клиентов обезличены там, где действует NDA.</p>
		</div>

		<div class="cases" class:all>
			{#each cases as c}
				<article>
					<div class="ctop"><span class="ctag">{c.tag}</span><span>{c.geo}</span></div>
					<div class="cn">{#if c.logo}<img src={pic(c.logo)} alt="" />{/if}<b class="cname">{c.name}</b></div>
					<div class="chead"><b class="big">{c.big}</b><span>{c.title}</span></div>
					<p>{c.text}</p>
					{#if c.stats}
						<div class="cstats">
							{#each c.stats as [v, l]}<div><b>{v}</b><span>{l}</span></div>{/each}
						</div>
					{/if}
					{#if c.img}<img class="shot" src={pic(c.img)} alt="Скриншот: {c.name}" loading="lazy" />{/if}
					<div class="links">
						{#if c.post}<a class="btn btn-primary" href="{channel}/{c.post}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#fff" /><path fill="#29a9eb" d="M5.400 11.700l11.300-4.400c.5-.2 1 .1.800.9l-1.900 9c-.1.600-.5.800-1 .5l-2.900-2.100-1.400 1.300c-.2.2-.3.300-.6.300l.2-3 5.400-4.900c.2-.2 0-.3-.3-.1l-6.700 4.200-2.900-.9c-.6-.2-.6-.6 0-.8z" /></svg>Читать кейс в Telegram</a>{/if}
						{#if c.post}<a class="btn btn-outline" href={c.maxPost ?? maxChannel} target="_blank" rel="noopener"><img src={asset('/img/icons/max.png' as any)} alt="" />Читать кейс в Максе</a>{/if}
						{#if c.site}<a class="btn btn-outline" href="https://{c.site}" target="_blank" rel="noopener">Открыть сайт</a>{/if}
					</div>
				</article>
			{/each}
		</div>

		{#if !all}
			<button type="button" class="btn btn-primary more" onclick={() => (all = true)}>Показать все {cases.length} кейса</button>
		{/if}
		<div class="bandw"><ChannelBand /></div>
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
	.cn { display: flex; align-items: center; gap: 12px; min-height: 36px; }
	.cn img { max-height: 34px; max-width: 110px; width: auto; flex: none; }
	.cname { font-size: 15px; overflow-wrap: anywhere; }
	.chead { display: grid; gap: 4px; }
	.big { font-size: 34px; font-weight: 800; color: var(--blue); line-height: 1; }
	.chead span { font-weight: 600; font-size: 17px; }
	article p { color: var(--muted); font-size: 15px; }
	.cstats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding-top: 12px; border-top: 1px solid var(--line); }
	.cstats b { display: block; color: var(--navy); }
	.cstats span { color: var(--muted); font-size: 13px; }
	.shot { width: 100%; aspect-ratio: 3 / 2; object-fit: cover; object-position: top left; border: 1px solid var(--line); border-radius: 8px; }
	.links { margin-top: auto; padding-top: 6px; display: flex; gap: 8px; flex-wrap: wrap; }
	.links .btn { flex: 1 1 100%; min-height: 0; padding: 9px 10px; font-size: 14px; white-space: nowrap; gap: 8px; }
	.links svg, .links img { width: 22px; height: 22px; flex: none; }

	.more { display: none; width: 100%; margin-top: 14px; font: inherit; font-weight: 600; cursor: pointer; }
	.bandw { margin-top: 56px; }

	@media (max-width: 1000px) {
		.cases { grid-template-columns: 1fr 1fr; }
	}
	@media (max-width: 640px) {
		.phero { padding: 22px 18px; margin-top: 16px; }
		.cases { grid-template-columns: 1fr; }
		.cases:not(.all) article:nth-child(n + 7) { display: none; }
		.more { display: flex; }
		.bandw { margin-top: 40px; }
	}
</style>
