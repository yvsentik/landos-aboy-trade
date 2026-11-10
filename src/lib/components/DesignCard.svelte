<script lang="ts">
	import type { Design } from '#lib/data.ts';
	import Mural from './Mural.svelte';
	import Icon from './Icon.svelte';

	let { d }: { d: Design } = $props();
</script>

<article>
	<div class="pic">
		<Mural kind={d.kind} palette={d.palette} seed={d.id} />
		<button class="fav" aria-label="В избранное"><Icon name="heart" size={18} /></button>
		<span class="tag">{d.style}</span>
	</div>
	<div class="body">
		<h3>{d.name}</h3>
		<span class="meta">Арт. {d.id} · {d.room}</span>
		<b>{d.price}</b>
		<div class="acts">
			<a class="btn btn-primary" href="#lead">Заказать</a>
			<a class="btn btn-outline" href="#lead" title="Бесплатный пробник"><Icon name="gift" size={18} /></a>
		</div>
	</div>
</article>

<style>
	article {
		border-radius: var(--radius);
		overflow: hidden;
		background: #fff;
		box-shadow: 0 2px 14px rgb(0 30 80 / 0.08);
		display: flex;
		flex-direction: column;
	}

	.pic {
		position: relative;
		aspect-ratio: 3 / 4;
	}

	.fav {
		position: absolute;
		top: 10px;
		right: 10px;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		border: 0;
		background: rgb(255 255 255 / 0.9);
		color: var(--pink);
		display: grid;
		place-items: center;
		cursor: pointer;
	}

	.tag {
		position: absolute;
		left: 10px;
		top: 10px;
		background: rgb(255 255 255 / 0.9);
		font-size: 12px;
		font-weight: 600;
		padding: 4px 10px;
		border-radius: 999px;
	}

	.body {
		padding: 14px;
		display: grid;
		gap: 4px;
	}

	h3 {
		font-size: 16px;
	}

	.meta {
		font-size: 12px;
		color: var(--muted);
	}

	b {
		color: var(--navy);
		margin: 4px 0 8px;
	}

	.acts {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 8px;
	}

	.acts .btn {
		min-height: 42px;
		padding: 0 14px;
		font-size: 14px;
		width: auto;
	}
</style>
