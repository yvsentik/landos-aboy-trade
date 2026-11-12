<script lang="ts">
	import { brand } from '#lib/data.ts';
	import Icon from './Icon.svelte';
	import MaxLogo from './MaxLogo.svelte';
	import { asset } from '$app/paths';

	// lite — версия без каталога (v1-2): официальный логотип, только «Позвонить» и «Написать»
	let { calcHref = '#lead', home = '', lite = false }: { calcHref?: string; home?: string; lite?: boolean } =
		$props();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const logo = asset('/img/icons/oboitrade-logo.png' as any);
	const at = (h: string) => (h.startsWith('#') ? home + h : h);
	let open = $state(false);

	const liteNav = [
		{ label: 'Фотообои', href: '#catalog' },
		{ label: 'Фрески', href: '#catalog' },
		{ label: 'Обои на заказ', href: '#own' },
		{ label: 'Цены', href: '#catalog' },
		{ label: 'Доставка и монтаж', href: '#steps' },
		{ label: 'Бесплатный пробник', href: '#lead', dot: true }
	];

	const fullNav = [
		{ label: 'Фотообои', href: '/catalog/' },
		{ label: 'Фрески', href: '/catalog/' },
		{ label: 'Каталог', href: '/catalog/' },
		{ label: 'Стили', href: '#styles' },
		{ label: 'Цены', href: '#materials' },
		{ label: 'Доставка и монтаж', href: '#steps' },
		{ label: 'Бесплатный пробник', href: '#lead', dot: true }
	];
	const nav = $derived(lite ? liteNav : fullNav);
</script>

<!-- Мобильная панель действий, как у okonti.ru: всегда сверху -->
<div class="mbar" class:two={lite}>
	{#if !lite}<a href={calcHref}><Icon name="calc" size={26} />Рассчитать</a>{/if}
	<a href={brand.phoneHref}><Icon name="phone" size={26} />Позвонить</a>
	<a href={brand.max}><MaxLogo size={24} light />Написать</a>
</div>

<header class:lite>
	<div class="top wrap">
		<span><Icon name="factory" size={16} />{lite ? 'Производство в Москве' : 'Собственное производство в Москве'}</span>
		<span><Icon name="clock" size={16} />{brand.hours}</span>
	</div>

	<div class="main wrap">
		{#if lite}
			<a class="logo" href="./"><img class="ologo" src={logo} alt="Обоитрейд" width="214" height="40" /></a>
		{:else}
			<a class="logo" href="./">
				<span class="mark" aria-hidden="true"><i></i><i></i><i></i></span>
				<span class="word">
					<b>{brand.name}</b>
					<small>{brand.tagline}</small>
				</span>
			</a>

			<a href={at('#lead')} class="gift"><Icon name="gift" size={16} />Пробник бесплатно</a>
		{/if}

		<a class="phone" href={brand.phoneHref}>
			{brand.phone}
			<small>{brand.hours}</small>
		</a>

		<div class="actions">
			{#if !lite}<a href={calcHref}><Icon name="calc" size={21} />Рассчитать</a>{/if}
			<a href={brand.phoneHref}><Icon name="phone" size={21} />Позвонить</a>
			<a href={brand.max}><MaxLogo size={20} light />Написать</a>
		</div>

		<button class="burger" aria-label="Меню" aria-expanded={open} onclick={() => (open = !open)}>
			<Icon name="menu" />
		</button>
	</div>

	<nav class="wrap" class:open>
		{#each nav as item}
			<a href={at(item.href)} onclick={() => (open = false)}>
				{item.label}
				{#if item.dot}<i class="dot"></i>{/if}
			</a>
		{/each}
	</nav>
</header>

<style>
	.mbar {
		display: none;
		position: sticky;
		top: 0;
		z-index: 30;
		background: var(--blue);
		grid-template-columns: repeat(3, 1fr);
	}

	.mbar a {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		color: #fff;
		font-weight: 600;
		font-size: 18px;
		padding: 18px 4px;
	}

	.mbar.two {
		grid-template-columns: repeat(2, 1fr);
	}

	.ologo {
		height: 40px;
		width: auto;
		display: block;
	}

	.mbar a + a {
		box-shadow: inset 1px 0 0 rgb(255 255 255 / 0.2);
	}

	header {
		background: #fff;
		border-bottom: 1px solid var(--line);
		position: sticky;
		top: 0;
		z-index: 20;
	}

	.top {
		display: flex;
		gap: 28px;
		font-size: 13px;
		color: var(--muted);
		padding-top: 10px;
		padding-bottom: 6px;
	}

	.top span,
	.top a {
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}

	.top :global(svg) {
		color: var(--green);
	}

	.gift {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		background: var(--pink);
		color: #fff;
		font-weight: 600;
		font-size: 14px;
		padding: 6px 12px;
		border-radius: 8px;
		white-space: nowrap;
	}

	.main {
		display: flex;
		align-items: center;
		gap: 24px;
		padding-top: 10px;
		padding-bottom: 14px;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.mark {
		width: 42px;
		height: 42px;
		border: 3px solid var(--navy);
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2px;
		padding: 3px;
	}

	.mark i:nth-child(1) {
		background: var(--blue);
	}
	.mark i:nth-child(2) {
		background: var(--pink);
	}
	.mark i:nth-child(3) {
		background: var(--green);
	}

	.word b {
		display: block;
		font-size: 22px;
		font-weight: 800;
		color: var(--navy);
		line-height: 1;
		letter-spacing: -0.02em;
	}

	.word small {
		display: block;
		font-size: 12px;
		color: var(--muted);
		margin-top: 3px;
	}

	.phone {
		font-size: 22px;
		font-weight: 700;
		color: var(--navy);
		line-height: 1.1;
		margin-left: auto;
		white-space: nowrap;
	}

	.phone small {
		display: block;
		font-size: 12px;
		font-weight: 400;
		color: var(--muted);
	}

	.actions {
		display: flex;
		background: var(--blue);
		border-radius: 10px;
		padding: 4px;
	}

	.actions a {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #fff;
		font-weight: 700;
		font-size: 15px;
		padding: 13px 17px;
		border-radius: 8px;
	}

	.actions a:hover {
		background: var(--blue-d);
	}

	.burger {
		display: none;
		background: none;
		border: 0;
		color: var(--navy);
		padding: 6px;
		cursor: pointer;
	}

	nav {
		display: flex;
		gap: 28px;
		padding-bottom: 14px;
		font-size: 15px;
		font-weight: 500;
	}

	nav a {
		position: relative;
	}

	nav a:hover {
		color: var(--blue);
	}

	.dot {
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--pink);
		vertical-align: middle;
		margin-left: 4px;
	}

	@media (max-width: 1100px) {
		.actions {
			display: none;
		}
		nav {
			gap: 18px;
			font-size: 14px;
		}
	}

	@media (max-width: 820px) {
		.mbar {
			display: grid;
		}
		header {
			position: relative;
		}
		.top {
			display: none;
		}
		.main {
			gap: 12px;
		}
		.phone {
			font-size: 16px;
		}
		.phone small,
		.word small {
			display: none;
		}
		.burger {
			display: block;
		}
		.ologo {
			height: 30px;
		}
		header.lite {
			display: none;
		}
		nav {
			display: none;
			flex-direction: column;
			gap: 0;
			padding-bottom: 8px;
		}
		nav.open {
			display: flex;
		}
		nav a {
			padding: 12px 0;
			border-top: 1px solid var(--line);
		}
	}

	@media (max-width: 600px) {
		.mbar a {
			font-size: 15px;
			gap: 5px;
			padding: 16px 2px;
		}
		.mbar :global(svg) {
			width: 20px;
			height: 20px;
		}
		.gift {
			font-size: 12px;
			padding: 5px 8px;
		}
		.phone {
			display: none;
		}
		.burger {
			margin-left: auto;
		}
	}

	@media (max-width: 400px) {
		.phone {
			display: none;
		}
		.burger {
			margin-left: auto;
		}
	}
</style>
