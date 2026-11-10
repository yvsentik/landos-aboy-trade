<script lang="ts">
	import { pains } from '#lib/data.ts';
	import Icon from './Icon.svelte';
</script>

<section>
	<div class="wrap">
		<h2>Чего боятся при заказе фотообоев — и что мы с этим делаем</h2>
		<div class="grid">
			{#each pains as p}
				<div class="card">
					<p class="fear">{p.fear}</p>
					<p class="fix"><Icon name="shield" size={20} />{p.fix}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	h2 {
		margin-bottom: 24px;
		max-width: 760px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 14px;
	}

	.card {
		border: 1px solid var(--line);
		border-radius: var(--radius);
		padding: 20px;
		display: grid;
		gap: 12px;
		align-content: start;
	}

	.fear {
		font-size: 17px;
		font-weight: 600;
		color: var(--muted);
		text-decoration: line-through;
		text-decoration-color: var(--pink);
		text-decoration-thickness: 2px;
	}

	.fix {
		display: flex;
		gap: 10px;
		font-weight: 500;
	}

	.fix :global(svg) {
		flex: none;
		color: var(--green);
	}

	@media (max-width: 900px) {
		.grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 560px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
