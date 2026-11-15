<script lang="ts">
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import FloatChat from '#lib/components/FloatChat.svelte';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { shop } from '#lib/shop.svelte.ts';
	import { captureUtm } from '#lib/lead.ts';
	import type { LayoutProps } from './$types';

	// Каркас основного сайта fotooboi.oboitrade.ru: шапка, подвал, плавающая кнопка связи
	let { children }: LayoutProps = $props();
	// Новая страница всегда открывается сверху (кроме переходов по якорю и «назад»)
	afterNavigate(({ type, to }) => {
		if (type === 'popstate' || type === 'enter' || to?.url.hash) return;
		window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
	});

	onMount(() => {
		shop.init();
		captureUtm();
	});
</script>

<Header lite />
{@render children()}
<Footer />
<FloatChat />
