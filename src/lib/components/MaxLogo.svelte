<script lang="ts">
	import { asset } from '$app/paths';

	// Логотип мессенджера Макс. light – белый (для синих кнопок и тёмного фона).
	let { size = 24, light = false }: { size?: number; light?: boolean } = $props();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const src = asset('/img/icons/max.png' as any);
</script>

<img {src} alt="Макс" width={size} height={size} class:light />

<style>
	img {
		display: inline-block;
		flex: none;
		object-fit: contain;
	}

	.light {
		filter: brightness(0) invert(1);
	}
</style>
