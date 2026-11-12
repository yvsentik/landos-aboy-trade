<script lang="ts">
	import { steps as base } from '#lib/data.ts';

	let { steps = base }: { steps?: { title: string; text: string }[] } = $props();
</script>

<section id="steps">
	<div class="wrap">
		<h2>Как мы работаем</h2>
		<ol>
			{#each steps as s, i}
				<li>
					<span class="n">{i + 1}</span>
					<h3>{s.title}</h3>
					<p>{s.text}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	h2 {
		margin-bottom: 24px;
	}

	ol {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 16px;
		counter-reset: s;
	}

	li {
		position: relative;
		padding-top: 4px;
	}

	.n {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		border: 2px solid var(--green);
		color: var(--green);
		font-weight: 700;
		margin-bottom: 14px;
		background: #fff;
		position: relative;
		z-index: 1;
	}

	li:not(:last-child)::after {
		content: '';
		position: absolute;
		top: 26px;
		left: 52px;
		right: -8px;
		border-top: 2px dashed #cfe0c0;
	}

	h3 {
		font-size: 16px;
		margin-bottom: 4px;
	}

	p {
		color: var(--muted);
		font-size: 14px;
	}

	@media (max-width: 820px) {
		ol {
			grid-template-columns: 1fr;
			gap: 0;
		}
		li {
			display: grid;
			grid-template-columns: 44px 1fr;
			column-gap: 14px;
			padding-bottom: 18px;
		}
		.n {
			grid-row: span 2;
			margin: 0;
		}
		li:not(:last-child)::after {
			top: 48px;
			bottom: 0;
			left: 21px;
			right: auto;
			border-top: 0;
			border-left: 2px dashed #cfe0c0;
		}
	}
</style>
