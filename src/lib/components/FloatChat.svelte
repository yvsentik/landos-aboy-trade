<script lang="ts">
	import { brand } from '#lib/data.ts';
	import Icon from './Icon.svelte';
	import MaxLogo from './MaxLogo.svelte';

	// Плавающая кнопка связи в правом нижнем углу: телефон, Макс, Telegram
	let open = $state(false);
</script>

<div class="fc" class:open>
	{#if open}
		<div class="menu">
			<a href={brand.phoneHref}><span class="i ph"><Icon name="phone" size={20} /></span>Позвонить</a>
			<a href={brand.max}><span class="i mx"><MaxLogo size={20} light /></span>Макс</a>
			<a href={brand.telegram}><span class="i tg"><Icon name="send" size={20} /></span>Telegram</a>
		</div>
	{/if}
	<button class="main" aria-label={open ? 'Закрыть' : 'Связаться с нами'} aria-expanded={open} onclick={() => (open = !open)}>
		{#if open}
			<span class="x">✕</span>
		{:else}
			<span class="swap"><Icon name="phone" size={28} /></span>
			<span class="swap s2"><Icon name="chat" size={28} /></span>
		{/if}
	</button>
</div>

<style>
	.fc {
		position: fixed;
		right: 18px;
		bottom: 18px;
		z-index: 40;
		display: grid;
		justify-items: end;
		gap: 10px;
	}

	.main {
		position: relative;
		width: 62px;
		height: 62px;
		border-radius: 50%;
		border: 0;
		background: var(--pink);
		color: #fff;
		cursor: pointer;
		display: grid;
		place-items: center;
		box-shadow: 0 8px 24px rgb(229 25 125 / 0.45);
	}

	.fc:not(.open) .main::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 50%;
		border: 2px solid var(--pink);
		animation: ring 2s ease-out infinite;
	}

	/* иконки телефона и чата сменяют друг друга */
	.swap {
		grid-area: 1 / 1;
		display: grid;
		animation: swap 4s infinite;
	}

	.s2 {
		animation-delay: -2s;
	}

	.x {
		font-size: 22px;
	}

	.menu {
		background: #fff;
		border-radius: 16px;
		padding: 8px;
		box-shadow: 0 10px 30px rgb(0 20 60 / 0.2);
		display: grid;
		min-width: 190px;
	}

	.menu a {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px;
		border-radius: 10px;
		font-weight: 600;
		color: var(--text);
	}

	.menu a:hover {
		background: var(--soft-2);
	}

	.i {
		width: 38px;
		height: 38px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		color: #fff;
	}

	.ph {
		background: var(--green);
	}
	.mx {
		background: #1f1f1f;
	}
	.tg {
		background: #2aabee;
	}

	@keyframes ring {
		from {
			transform: scale(1);
			opacity: 0.8;
		}
		to {
			transform: scale(1.6);
			opacity: 0;
		}
	}

	@keyframes swap {
		0%,
		45% {
			opacity: 1;
			transform: scale(1);
		}
		50%,
		95% {
			opacity: 0;
			transform: scale(0.6);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.swap,
		.main::after {
			animation: none;
		}
		.s2 {
			display: none;
		}
	}
</style>
