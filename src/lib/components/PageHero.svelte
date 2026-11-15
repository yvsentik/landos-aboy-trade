<script lang="ts">
	import { brand, prod } from '#lib/data.ts';
	import Icon from './Icon.svelte';
	import MaxLogo from './MaxLogo.svelte';

	// Первый экран внутренней страницы в стиле главной
	let {
		title,
		sub = '',
		badge = '',
		photo = 'warehouse-hd',
		crumb = ''
	}: { title: string; sub?: string; badge?: string; photo?: string; crumb?: string } = $props();
</script>

<div class="hero" style:--bg="url({prod(photo)})">
	<div class="wrap inner">
		<nav class="crumbs"><a href="/">Главная</a> / <span>{crumb || title}</span></nav>
		{#if badge}<span class="badge">{badge}</span>{/if}
		<h1>{title}</h1>
		{#if sub}<p class="lead">{sub}</p>{/if}
		<div class="ctas">
			<a class="btn btn-primary" href={brand.max}><MaxLogo size={20} light />Отправить изображение</a>
			<a class="btn btn-white" href="/probnik/"><Icon name="gift" size={20} />Бесплатный пробник</a>
		</div>
	</div>
</div>

<style>
	.hero {
		color: #fff;
		background:
			linear-gradient(90deg, rgb(0 30 90 / 0.94) 0%, rgb(0 30 90 / 0.75) 50%, rgb(0 30 90 / 0.3) 100%),
			var(--bg) center / cover;
	}

	.inner {
		padding-top: 36px;
		padding-bottom: 52px;
		display: grid;
		gap: 16px;
		justify-items: start;
	}

	.crumbs {
		font-size: 13px;
		opacity: 0.8;
	}

	.crumbs a:hover {
		text-decoration: underline;
	}

	h1 {
		font-size: clamp(28px, 4.4vw, 50px);
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: -0.01em;
		max-width: 820px;
	}

	.lead {
		font-size: 18px;
		max-width: 620px;
		opacity: 0.92;
	}

	.ctas {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
		margin-top: 6px;
	}

	@media (max-width: 720px) {
		.inner {
			padding-top: 20px;
			padding-bottom: 32px;
			gap: 12px;
		}
		h1 {
			font-size: 26px;
		}
		.lead {
			font-size: 15px;
		}
		.ctas {
			width: 100%;
		}
	}
</style>
