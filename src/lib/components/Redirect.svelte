<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	// Переадресация со старого адреса (статическая сборка: meta refresh + переход на клиенте)
	let { to = '/' }: { to?: string } = $props();
	onMount(() => goto(to, { replaceState: true }));
</script>

<svelte:head>
	<meta http-equiv="refresh" content="0; url={to}" />
	<link rel="canonical" href={to} />
	<meta name="robots" content="noindex" />
</svelte:head>

<p style="padding: 24px">Переходим на <a href={to}>главную</a>…</p>
