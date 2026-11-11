<script lang="ts">
	import { utp } from '#lib/data.ts';
	import Icon from './Icon.svelte';

	let { compact = false, title = '' }: { compact?: boolean; title?: string } = $props();
</script>

<section>
	<div class="wrap">
		{#if title}<h2>{title}</h2>{/if}
		<div class="grid" class:compact>
			{#each utp as u}
				<div class="item">
					<span class="ic"><Icon name={u.icon} size={compact ? 36 : 28} /></span>
					<div>
						<h3>{u.title}</h3>
						{#if !compact}<p>{u.text}</p>{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	h2 {
		margin-bottom: 24px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}

	.item {
		display: flex;
		gap: 16px;
		padding: 22px;
		border-radius: var(--radius);
		background: var(--soft-2);
	}

	.ic {
		flex: none;
		width: 52px;
		height: 52px;
		border-radius: 14px;
		display: grid;
		place-items: center;
		background: #fff;
		color: var(--green);
		box-shadow: 0 2px 8px rgb(0 53 149 / 0.08);
	}

	h3 {
		margin-bottom: 6px;
	}

	p {
		color: var(--muted);
		font-size: 15px;
	}

	.compact {
		grid-template-columns: repeat(6, 1fr);
		gap: 12px;
	}

	.compact .item {
		flex-direction: column;
		align-items: center;
		text-align: center;
		background: none;
		padding: 8px;
	}

	.compact h3 {
		font-size: 21px;
		font-weight: 600;
	}

	.compact .ic {
		width: 78px;
		height: 78px;
		border-radius: 20px;
	}

	@media (max-width: 980px) {
		.grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.compact {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 600px) {
		.grid {
			grid-template-columns: 1fr;
		}
		.item {
			padding: 16px;
		}
		.compact {
			grid-template-columns: 1fr;
			gap: 10px;
		}
		.compact .item {
			flex-direction: row;
			text-align: left;
			gap: 10px;
			padding: 10px;
			background: var(--soft-2);
			border-radius: 12px;
		}
		.compact .ic {
			width: 54px;
			height: 54px;
			border-radius: 14px;
		}
		.compact h3 {
			font-size: 18px;
			line-height: 1.25;
		}
	}
</style>
