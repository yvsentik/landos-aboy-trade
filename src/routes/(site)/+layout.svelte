<script lang="ts">
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import FloatChat from '#lib/components/FloatChat.svelte';
	import CaptchaGate from '#lib/components/CaptchaGate.svelte';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { shop } from '#lib/shop.svelte.ts';
	import { captureUtm } from '#lib/lead.ts';
	import { hit, goal } from '#lib/metrika.ts';
	import type { LayoutProps } from './$types';

	// Каркас основного сайта fotooboi.oboitrade.ru: шапка, подвал, плавающая кнопка связи
	let { children }: LayoutProps = $props();
	// Новая страница всегда открывается сверху (кроме переходов по якорю и «назад»)
	afterNavigate(({ type, from, to }) => {
		// просмотр страницы в Метрику (первый заход считает сам счётчик)
		if (type !== 'enter' && to && from?.url.pathname !== to.url.pathname) {
			setTimeout(() => hit(to.url.href, from?.url.href));
		}
		if (type === 'popstate' || type === 'enter' || to?.url.hash) return;
		window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
	});

	onMount(() => {
		shop.init();
		captureUtm();

		// Цели Метрики на клики по контактам: Макс, Telegram, телефон
		const onClick = (e: MouseEvent) => {
			const a = (e.target as HTMLElement | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
			if (!a) return;
			const href = a.getAttribute('href') ?? '';
			if (/^https?:\/\/(www\.)?max\.ru\//.test(href)) goal('click_max');
			else if (/^https?:\/\/(t|telegram)\.me\//.test(href)) goal('click_telegram');
			else if (href.startsWith('tel:')) goal('click_phone');
			else return;
			goal('click_contact');
		};
		document.addEventListener('click', onClick, true);
		return () => document.removeEventListener('click', onClick, true);
	});
</script>

<Header lite />
{@render children()}
<Footer />
<FloatChat />
<CaptchaGate />
