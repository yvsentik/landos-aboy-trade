<script lang="ts">
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import FloatChat from '#lib/components/FloatChat.svelte';
	import { onMount } from 'svelte';
	import { shop } from '#lib/shop.svelte.ts';
	import { captureUtm } from '#lib/lead.ts';
	import type { LayoutProps } from './$types';

	// Каркас основного сайта fotooboi.oboitrade.ru: шапка, подвал, плавающая кнопка связи
	let { children }: LayoutProps = $props();
	onMount(() => {
		shop.init();
		captureUtm();
	});
</script>

<Header lite />
{@render children()}
<Footer />
<FloatChat />
