<script lang="ts">
	import { production, prod } from '#lib/data.ts';

	let {
		title = 'Наше производство в Москве',
		sub = 'Вы заказываете напрямую у фабрики – без посредников и наценок'
	}: { title?: string; sub?: string } = $props();
</script>

<section id="production">
	<div class="wrap">
		<div class="section-head">
			<div>
				<h2>{title}</h2>
				{#if sub}<p>{sub}</p>{/if}
			</div>
		</div>
		<div class="grid">
			{#each production as p, i}
				<figure class:big={i === 0}>
					<img src={prod(p.photo)} alt={p.title} loading="lazy" />
					<figcaption>
						<b>{p.title}</b>
						<span>{p.text}</span>
					</figcaption>
				</figure>
			{/each}
		</div>
	</div>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-auto-rows: 210px;
		gap: 12px;
	}

	figure {
		margin: 0;
		position: relative;
		border-radius: 14px;
		overflow: hidden;
	}

	.big {
		grid-column: span 2;
		grid-row: span 2;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	figcaption {
		position: absolute;
		inset: auto 0 0 0;
		padding: 36px 14px 12px;
		background: linear-gradient(transparent, rgb(0 20 60 / 0.8));
		color: #fff;
		display: grid;
	}

	figcaption span {
		font-size: 13px;
		opacity: 0.85;
	}

	@media (max-width: 820px) {
		.grid {
			grid-template-columns: repeat(2, 1fr);
			grid-auto-rows: 160px;
		}
		/* «Печать» на телефоне вдвое ниже: на всю ширину, одна строка */
		.big {
			grid-row: span 1;
		}
		figcaption span {
			display: none;
		}
	}
</style>
