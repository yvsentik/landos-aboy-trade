<script lang="ts">
	import '../app.css';
	import { asset } from '$app/paths';

	// Фавиконка Обоитрейда (с oboitrade.ru)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const favicon = asset('/favicon.png' as any);
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" href={favicon} />
	<link rel="apple-touch-icon" href={favicon} />
</svelte:head>

{@render children()}
