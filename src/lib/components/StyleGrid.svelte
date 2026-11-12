<script lang="ts">
	import { styles, colors, img, catalogSize } from '#lib/data.ts';
	import Icon from './Icon.svelte';

	let { title = 'Выберите стиль интерьера' }: { title?: string } = $props();
</script>

<section id="styles">
	<div class="wrap">
		<div class="section-head">
			<div>
				<h2>{title}</h2>
				<p>Начните со стиля – подберём сюжет, цвет и материал</p>
			</div>
			<a class="link" href="#lead">Весь каталог {catalogSize} →</a>
		</div>

		<div class="grid">
			{#each styles as s}
				<a class="card" href="#lead">
					<img src={img(s.photo, 600)} alt={s.name} loading="lazy" />
					<div class="cap">
						<b>{s.name}</b>
						<span>{s.count} дизайнов <Icon name="arrow" size={16} /></span>
					</div>
				</a>
			{/each}
		</div>

		<div class="colors">
			<span class="lbl">Или по цвету:</span>
			<div class="chips">
				{#each colors as c}
					<a class="chip" href="#lead"><i class="swatch" style:background={c.hex}></i>{c.name}</a>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
	}

	.card {
		position: relative;
		border-radius: var(--radius);
		overflow: hidden;
		aspect-ratio: 4 / 3;
		color: #fff;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.4s;
	}

	.card:hover img {
		transform: scale(1.05);
	}

	.cap {
		position: absolute;
		inset: auto 0 0 0;
		padding: 40px 16px 14px;
		background: linear-gradient(transparent, rgb(0 20 60 / 0.78));
		display: flex;
		justify-content: space-between;
		align-items: end;
		gap: 8px;
	}

	b {
		font-size: 18px;
	}

	.cap span {
		font-size: 13px;
		display: inline-flex;
		align-items: center;
		gap: 4px;
		opacity: 0.9;
	}

	.colors {
		margin-top: 20px;
		display: flex;
		align-items: center;
		gap: 14px;
		flex-wrap: wrap;
	}

	.lbl {
		color: var(--muted);
		font-weight: 500;
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
		.cap {
			flex-direction: column;
			align-items: start;
			padding: 30px 12px 10px;
			gap: 0;
		}
		b {
			font-size: 16px;
		}
		.colors .chips {
			flex-wrap: nowrap;
			overflow-x: auto;
			scrollbar-width: none;
			margin: 0 -16px;
			padding: 0 16px;
		}
	}
</style>
