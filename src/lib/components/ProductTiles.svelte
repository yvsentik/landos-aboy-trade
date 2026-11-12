<script lang="ts">
	import { products } from '#lib/data.ts';
</script>

<!-- Плитки разделов с синей плашкой – приём с главной okonti.ru -->
<section id="catalog">
	<div class="wrap">
		<div class="section-head">
			<div>
				<h2>Что мы печатаем</h2>
				<p>Контролируем весь процесс – от макета до упаковки</p>
			</div>
		</div>
		<div class="grid">
			{#each products as p}
				<a class="tile" href="#lead">
					<img src={p.src} alt={p.name} loading="lazy" />
					<div class="bar">
						<b>{p.name}</b>
						<span>{p.note}</span>
						<em>{p.price}</em>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
	}

	.tile {
		border-radius: var(--radius);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		background: var(--navy);
		color: #fff;
		transition: transform 0.2s;
	}

	.tile:hover {
		transform: translateY(-3px);
	}

	img {
		aspect-ratio: 4 / 3.3;
		object-fit: cover;
		width: 100%;
	}

	.bar {
		padding: 16px 18px 18px;
		display: grid;
		gap: 4px;
	}

	b {
		font-size: 19px;
		text-transform: uppercase;
		letter-spacing: 0.01em;
	}

	span {
		font-size: 14px;
		opacity: 0.8;
	}

	em {
		font-style: normal;
		font-weight: 700;
		color: #b9d3ff;
		margin-top: 4px;
	}

	@media (max-width: 980px) {
		.grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.grid {
			gap: 10px;
		}
		.bar {
			padding: 12px;
		}
		b {
			font-size: 15px;
		}
		span {
			display: none;
		}
	}
</style>
