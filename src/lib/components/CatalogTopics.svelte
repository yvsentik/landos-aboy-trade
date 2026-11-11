<script lang="ts">
	import { topics, moreTopics, kidsTopics, lsColors, cover, catalogHome } from '#lib/lastanza.ts';
	import Icon from './Icon.svelte';

	const fmt = (n: number) => n.toLocaleString('ru-RU');
</script>

<!-- Та же структура, что блок стилей на v1, но темы и цифры — из каталога lastanza.ru -->
<section id="styles">
	<div class="wrap">
		<div class="section-head">
			<div>
				<h2>Выберите тему фрески</h2>
				<p>Начните с сюжета — подберём цвет, фактуру и размер под вашу стену</p>
			</div>
			<a class="link" href={catalogHome}>Весь каталог →</a>
		</div>

		<div class="grid">
			{#each topics as t}
				<a class="card" href={t.href}>
					<img src={cover(t.img)} alt={t.name} loading="lazy" />
					<div class="cap">
						<b>{t.name}</b>
						<span>{fmt(t.count)} дизайнов <Icon name="arrow" size={16} /></span>
					</div>
				</a>
			{/each}
		</div>

		<div class="row">
			<span class="lbl">Ещё темы:</span>
			<div class="chips">
				{#each moreTopics as t}
					<a class="chip" href={t.href}>{t.name}<small>{t.count}</small></a>
				{/each}
			</div>
		</div>

		<div class="row">
			<span class="lbl">Детские:</span>
			<div class="chips">
				{#each kidsTopics as t}
					<a class="chip" href={t.href}>{t.name}<small>{t.count}</small></a>
				{/each}
			</div>
		</div>

		<div class="row">
			<span class="lbl">По цвету:</span>
			<div class="chips">
				{#each lsColors as c}
					<a class="chip" href={c.href}><i class="swatch" style:background={c.hex}></i>{c.name}</a>
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
		white-space: nowrap;
	}

	.row {
		margin-top: 16px;
		display: flex;
		align-items: flex-start;
		gap: 14px;
	}

	.row:first-of-type {
		margin-top: 20px;
	}

	.lbl {
		color: var(--muted);
		font-weight: 500;
		flex: none;
		width: 90px;
		padding-top: 9px;
	}

	.chip small {
		color: var(--muted);
		font-size: 12px;
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
		.row {
			flex-direction: column;
			align-items: start;
			gap: 8px;
		}
		.row .chips {
			flex-wrap: nowrap;
			overflow-x: auto;
			scrollbar-width: none;
			margin: 0 -16px;
			padding: 0 16px;
			width: calc(100% + 32px);
		}
	}
</style>
