<script lang="ts">
	import { materials } from '#lib/data.ts';
	import Icon from './Icon.svelte';
</script>

<!-- Карточки материалов – по образцу «серий» окон на okonti.ru -->
<section id="materials">
	<div class="wrap">
		<div class="section-head">
			<div>
				<h2>Материалы и цены</h2>
				<p>Цена за м² уже с печатью по вашему размеру</p>
			</div>
		</div>
		<div class="hscroll">
			{#each materials as m}
				<div class="card" style:background={m.tone}>
					<h3>{m.name}</h3>
					<ul>
						{#each m.points as p}
							<li><Icon name="check" size={16} />{p}</li>
						{/each}
					</ul>
					<p class="best">Лучше всего: {m.best}</p>
					<a class="btn btn-primary" href="#lead">{m.price}</a>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.hscroll {
		grid-auto-columns: minmax(250px, 1fr);
	}

	.card {
		border-radius: var(--radius);
		padding: 22px;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.card ul {
		flex: 1;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 6px;
		font-size: 15px;
	}

	li {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	li :global(svg) {
		color: var(--green);
	}

	.best {
		font-size: 13px;
		color: var(--muted);
	}

	.btn {
		width: 100%;
		min-height: 46px;
	}
</style>
