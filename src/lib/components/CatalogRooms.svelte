<script lang="ts">
	import { lsRooms, collections, cover } from '#lib/lastanza.ts';

	const fmt = (n: number) => n.toLocaleString('ru-RU');
</script>

<section>
	<div class="wrap">
		<div class="section-head">
			<h2>Подбор по помещению</h2>
		</div>
		<div class="hscroll">
			{#each lsRooms as r}
				<a class="room" href={r.href}>
					<img src={cover(r.img)} alt={r.name} loading="lazy" />
					<b>{r.name}</b>
					<span>{fmt(r.count)} дизайнов</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<section>
	<div class="wrap">
		<div class="section-head">
			<h2>Коллекции</h2>
		</div>
		<div class="cols">
			{#each collections as c}
				<a class="col" href={c.href}>
					<img src={cover(c.img)} alt={c.name} loading="lazy" />
					<div>
						<b>{c.name}</b>
						<span>{fmt(c.count)} дизайнов</span>
						{#if c.sub.length}<small>{c.sub.join(' · ')}</small>{/if}
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.hscroll {
		grid-auto-columns: minmax(150px, 1fr);
	}

	.room {
		display: grid;
		gap: 4px;
	}

	.room img {
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
		border-radius: 14px;
		margin-bottom: 4px;
	}

	.room b {
		font-weight: 600;
	}

	.room span {
		font-size: 13px;
		color: var(--muted);
	}

	.room:hover b,
	.col:hover b {
		color: var(--blue);
	}

	.cols {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 16px;
	}

	.col {
		border-radius: var(--radius);
		overflow: hidden;
		background: var(--soft-2);
		display: flex;
		flex-direction: column;
	}

	.col img {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
	}

	.col div {
		padding: 14px 16px 16px;
		display: grid;
		gap: 2px;
	}

	.col b {
		font-size: 18px;
	}

	.col span {
		color: var(--navy);
		font-weight: 600;
		font-size: 14px;
	}

	.col small {
		color: var(--muted);
		font-size: 12px;
		margin-top: 4px;
	}

	@media (max-width: 980px) {
		.cols {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.cols {
			gap: 10px;
		}
		.col small {
			display: none;
		}
	}
</style>
