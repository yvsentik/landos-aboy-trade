<script lang="ts">
	import { faq, tips } from '#lib/data.ts';

	let { mode = 'faq' }: { mode?: 'faq' | 'tips' } = $props();
	const items = $derived(mode === 'faq' ? faq : tips);
</script>

<!-- Вместо длинной SEO-простыни okonti – короткие ответы на ключевые вопросы -->
<section>
	<div class="wrap">
		<h2>{mode === 'faq' ? 'Частые вопросы' : 'Как выбрать фотообои за 2 минуты'}</h2>
		{#if mode === 'tips'}
			<div class="tips">
				{#each items as t}
					<div class="tip">
						<h3>{t.q}</h3>
						<p>{t.a}</p>
					</div>
				{/each}
			</div>
		{:else}
			<div class="list">
				{#each items as f}
					<details>
						<summary>{f.q}</summary>
						<p>{f.a}</p>
					</details>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	h2 {
		margin-bottom: 20px;
	}

	.tips {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
	}

	.tip {
		border-top: 3px solid var(--blue);
		padding-top: 14px;
	}

	.tip h3 {
		margin-bottom: 6px;
		font-size: 17px;
	}

	.tip p,
	details p {
		color: var(--muted);
		font-size: 15px;
	}

	.list {
		display: grid;
		gap: 10px;
		max-width: 860px;
	}

	details {
		border: 1px solid var(--line);
		border-radius: 12px;
		padding: 0 18px;
	}

	summary {
		cursor: pointer;
		font-weight: 600;
		padding: 16px 0;
		list-style: none;
		display: flex;
		justify-content: space-between;
		gap: 12px;
	}

	summary::after {
		content: '+';
		color: var(--blue);
		font-size: 22px;
		line-height: 1;
	}

	details[open] summary::after {
		content: '−';
	}

	details p {
		padding-bottom: 16px;
	}

	@media (max-width: 900px) {
		.tips {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 560px) {
		.tips {
			grid-template-columns: 1fr;
		}
	}
</style>
