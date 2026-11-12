<script lang="ts">
	import Icon from './Icon.svelte';

	// ЗАГЛУШКА: цены за м² – заменить на реальные
	const options = [
		{ name: 'Фотообои на флизелине', price: 990 },
		{ name: 'Фотообои на виниле', price: 1290 },
		{ name: 'Бесшовные обои', price: 1590 },
		{ name: 'Фреска', price: 2490 }
	];

	let width = $state(3);
	let height = $state(2.7);
	let pick = $state(0);

	const area = $derived(Math.max(0, (Number(width) || 0) * (Number(height) || 0)));
	const total = $derived(Math.round(area * options[pick].price));
	const fmt = (n: number) => n.toLocaleString('ru-RU');
</script>

<div class="calc" id="calc">
	<h3><Icon name="calc" size={22} />Рассчитайте стоимость</h3>
	<div class="row">
		<label>
			<span>Ширина стены, м</span>
			<input class="field" type="number" min="0.5" max="20" step="0.1" bind:value={width} />
		</label>
		<label>
			<span>Высота, м</span>
			<input class="field" type="number" min="0.5" max="6" step="0.1" bind:value={height} />
		</label>
	</div>
	<div class="opts">
		{#each options as o, i}
			<button class="chip" class:on={pick === i} onclick={() => (pick = i)} type="button">{o.name}</button>
		{/each}
	</div>
	<div class="sum">
		<span>{area.toFixed(1).replace('.', ',')} м² × {fmt(options[pick].price)} ₽</span>
		<b>≈ {fmt(total)} ₽</b>
	</div>
	<a class="btn btn-pink" href="#lead"><Icon name="gift" size={20} />Зафиксировать цену + пробник</a>
	<small>Точную цену подтвердит дизайнер после макета. Пробник и цветопроба – бесплатно.</small>
</div>

<style>
	.calc {
		background: #fff;
		color: var(--text);
		border-radius: 18px;
		padding: 24px;
		display: grid;
		gap: 14px;
		box-shadow: 0 20px 50px rgb(0 20 60 / 0.25);
	}

	h3 {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 20px;
	}

	h3 :global(svg) {
		color: var(--blue);
	}

	.row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}

	label span {
		display: block;
		font-size: 13px;
		color: var(--muted);
		margin-bottom: 4px;
	}

	.opts .chip,
	.opts {
		font-size: 13px;
	}

	.opts {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.sum {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 10px;
		padding: 14px 16px;
		background: var(--soft);
		border-radius: 12px;
	}

	.sum span {
		color: var(--muted);
		font-size: 14px;
	}

	.sum b {
		font-size: 26px;
		color: var(--navy);
	}

	small {
		color: var(--muted);
		font-size: 12px;
	}

	.btn {
		width: 100%;
	}
</style>
