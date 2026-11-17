<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
	import Icon from '#lib/components/Icon.svelte';
	import AgencyForm from '#lib/components/agency/AgencyForm.svelte';
	import AgencyModal from '#lib/components/agency/AgencyModal.svelte';
	import { ask } from '#lib/agencyModal.svelte.ts';
	import { afterNavigate } from '$app/navigation';
	import { tg, max, channel, maxChannel, address, directions } from '#lib/agency.ts';
	import type { LayoutProps } from './$types';

	// Общий каркас сайта агентства «Фальков»: закреплённая шапка, форма заявки, футер.
	let { children }: LayoutProps = $props();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const a = (f: string) => asset(f as any);
	const home = resolve('/agency');
	const nav: [string, string][] = [
		['SEO-аудит', resolve('/agency/seo-audit')],
		['Услуги', resolve('/agency/uslugi')],
		['Кейсы', resolve('/agency/keysy')],
		['Контакты', resolve('/agency/kontakty')]
	];
	const here = (href: string) => page.url.pathname.startsWith(href);

	// Плавное появление блоков при прокрутке (без скриптов блоки просто видны).
	afterNavigate(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const io = new IntersectionObserver(
			(es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))),
			{ rootMargin: '0px 0px -8% 0px' }
		);
		document.querySelectorAll<HTMLElement>('main section, main .banner, main .phero, section.lead').forEach((el) => {
			if (el.classList.contains('rv')) return;
			if (el.getBoundingClientRect().top < innerHeight) return; // уже на экране – не прячем
			el.classList.add('rv');
			io.observe(el);
		});
		return () => io.disconnect();
	});
</script>

<header>
	<div class="wrap main">
		<a class="logo" href={home} aria-label="falkov – на главную">falkov<small>маркетинг</small></a>
		<nav>{#each nav as [label, href]}<a {href} class:on={here(href)}>{label}</a>{/each}</nav>
		<div class="acts">
			<span class="lbl">Написать:</span>
			<a href={tg} target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#29a9eb" /><path fill="#fff" d="M5.400 11.700l11.300-4.400c.5-.2 1 .1.800.9l-1.900 9c-.1.600-.5.800-1 .5l-2.900-2.100-1.400 1.300c-.2.2-.3.300-.6.300l.2-3 5.400-4.900c.2-.2 0-.3-.3-.1l-6.700 4.200-2.900-.9c-.6-.2-.6-.6 0-.8z" /></svg>Telegram</a>
			<a href={max} target="_blank" rel="noopener"><img src={a('/img/icons/max.png')} alt="" />Макс</a>
			<button type="button" onclick={() => ask(true)}><Icon name="send" size={20} /><span class="lg">Форма заявки</span><span class="sm">Заявка</span></button>
		</div>
	</div>
</header>

{@render children()}

<section class="lead">
	<div class="wrap"><AgencyForm /></div>
</section>

<AgencyModal />

<footer>
	<div class="wrap cols">
		<div class="about">
			<a class="flogo" href={home}>falkov</a>
			<p>SEO-агентство. Выводим сайты в ТОП Яндекса и Google и показываем результат до договора.</p>
			<p class="addr">{address}</p>
		</div>
		<div>
			<b>Разделы</b>
			<a href={home}>Главная</a>
			{#each nav as [label, href]}<a {href}>{label}</a>{/each}
		</div>
		<div>
			<b>Услуги</b>
			{#each directions as d}<a href={nav[1][1]}>{d.name}</a>{/each}
		</div>
		<div>
			<b>Связаться</b>
			<a href={tg} target="_blank" rel="noopener">Написать в Telegram</a>
			<a href={max} target="_blank" rel="noopener">Написать в Макс</a>
			<a href={channel} target="_blank" rel="noopener">Кейсы в Telegram @falkov_agency</a>
			<a href={maxChannel} target="_blank" rel="noopener">Кейсы в Максе</a>
			<a href="#zayavka">Форма заявки</a>
		</div>
	</div>
	<div class="wrap copy">© {new Date().getFullYear()} Агентство «Фальков»</div>
</footer>

<style>
	header { position: sticky; top: 0; z-index: 30; background: #fff; border-bottom: 1px solid var(--line); }
	.main { display: flex; align-items: center; gap: 28px; padding-top: 8px; padding-bottom: 8px; }
	.logo { flex: none; display: flex; align-items: baseline; gap: 6px; color: #111; font-size: 26px; font-weight: 800; letter-spacing: -0.02em; line-height: 1; white-space: nowrap; }
	.logo small { font-size: 12px; font-weight: 600; letter-spacing: 0; color: var(--muted); }
	nav { display: flex; gap: 24px; font-weight: 600; white-space: nowrap; }
	nav a:hover, nav a.on { color: var(--blue); }

	.acts { margin-left: auto; display: flex; align-items: center; gap: 8px; flex: none; background: var(--blue); border-radius: 12px; padding: 6px 6px 6px 16px; }
	.lbl { font-weight: 800; color: #fff; margin-right: 4px; }
	:global(a), :global(button), :global(summary) { -webkit-tap-highlight-color: transparent; }
	:global(.rv) { opacity: 0; transform: translateY(26px); transition: opacity 0.55s ease, transform 0.55s ease; }
	:global(.rv.in) { opacity: 1; transform: none; }
	.acts a, .acts button { font: inherit; border: 0; cursor: pointer; display: flex; gap: 8px; align-items: center; font-weight: 800; color: var(--navy); padding: 9px 14px; border-radius: 8px; background: #fff; white-space: nowrap; }
	.acts a:hover, .acts button:hover { background: var(--soft); }
	.acts svg, .acts img { width: 22px; height: 22px; flex: none; }
	.sm { display: none; }

	.lead { padding-top: 64px; }

	footer { margin-top: 64px; background: var(--navy); color: #c9d6f2; padding: 44px 0 24px; font-size: 15px; }
	.cols { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1.3fr; gap: 32px; }
	.cols div { display: grid; gap: 8px; align-content: start; }
	.cols b { color: #fff; margin-bottom: 4px; }
	.cols a:hover { color: #fff; text-decoration: underline; }
	.flogo { color: #fff; font-size: 22px; font-weight: 800; }
	.addr { color: #fff; }
	.copy { margin-top: 32px; padding-top: 20px; border-top: 1px solid rgb(255 255 255 / 0.18); font-size: 13px; }

	@media (max-width: 1180px) {
		nav { gap: 16px; }
		.main { gap: 16px; }
		.lg { display: none; }
		.sm { display: inline; }
		.logo small { display: none; }
	}
	@media (max-width: 1000px) {
		.main { flex-wrap: wrap; gap: 8px 20px; }
		nav { order: 3; width: 100%; }
		.cols { grid-template-columns: 1fr 1fr; }
	}
	@media (max-width: 640px) {
		.logo { font-size: 20px; }
		.logo small { font-size: 10px; }
		.main { gap: 8px 10px; }
		nav { order: 0; width: auto; margin-left: auto; gap: 10px; font-size: 13px; }
		.acts { order: 3; margin: 0; width: 100%; gap: 6px; padding: 5px 5px 5px 10px; }
		.lbl { font-size: 12px; margin-right: 0; }
		.acts a, .acts button { flex: 1; min-width: 0; justify-content: center; padding: 8px 2px; font-size: 12px; gap: 4px; }
		.acts button :global(svg) { display: none; }
		.acts a:first-of-type { flex: 1.35; }
		.acts svg, .acts img { width: 16px; height: 16px; }
		.lg { display: none; }
		.sm { display: inline; }
		.lead { padding-top: 44px; }
		footer { margin-top: 44px; }
		.cols { grid-template-columns: 1fr; gap: 24px; }
	}
</style>
