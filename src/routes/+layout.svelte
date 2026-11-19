<script lang="ts">
	import '@fontsource-variable/montserrat/wght.css';
	import '../app.css';
	import { asset } from '$app/paths';

	// Фавиконка Обоитрейда (с oboitrade.ru)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const favicon = asset('/favicon.png' as any);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const faviconIco = asset('/favicon.ico' as any);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const favicon120 = asset('/favicon-120.png' as any);
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={faviconIco} sizes="any" />
	<link rel="icon" type="image/png" sizes="120x120" href={favicon120} />
	<link rel="apple-touch-icon" href={favicon} />
</svelte:head>

{@render children()}
