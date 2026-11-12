<script lang="ts">
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	// Синоним адреса: /v1-v2/ → /v1-2/
	const to = resolve('/v1-2');
	onMount(() => goto(to, { replaceState: true }));
</script>

<svelte:head>
	<meta http-equiv="refresh" content="0; url={to}" />
	<link rel="canonical" href={to} />
	<meta name="robots" content="noindex" />
</svelte:head>

<p style="padding: 24px">Переходим на <a href={to}>новую версию</a>…</p>
