<script lang="ts">
	import { rooms, img } from '#lib/data.ts';
</script>

<section>
	<div class="wrap">
		<div class="section-head">
			<h2>Подбор по комнате</h2>
		</div>
		<div class="hscroll">
			{#each rooms as r}
				<a class="room" href="#lead">
					<img src={img(r.photo, 400)} alt={r.name} loading="lazy" />
					<b>{r.name}</b>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.room {
		display: grid;
		gap: 8px;
	}

	img {
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
		border-radius: 14px;
	}

	b {
		font-weight: 600;
	}

	.room:hover b {
		color: var(--blue);
	}

	.hscroll {
		grid-auto-columns: minmax(140px, 1fr);
	}
</style>
