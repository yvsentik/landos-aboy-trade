<script lang="ts">
	import { resolve } from '$app/paths';
	import { prod, brand } from '#lib/data.ts';

	const variants = [
		{
			href: resolve('/v1'),
			n: 1,
			title: 'Производство',
			text: 'Классика okonti: фабрика на первом экране, УТП, разделы, стили, гарантия цвета, форма.',
			photo: 'warehouse'
		},
		{
			href: resolve('/v2'),
			n: 2,
			title: 'Витрина',
			text: 'Фильтр по стилю и цвету прямо в первом экране, сразу карточки дизайнов.',
			photo: 'fresco-paint'
		},
		{
			href: resolve('/v3'),
			n: 3,
			title: 'Расчёт и страхи',
			text: 'Калькулятор цены в первом экране, затем блок «боли → решение».',
			photo: 'print-table'
		}
	];
</script>

<svelte:head>
	<title>{brand.name} — варианты главной</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="wrap">
	<h1>Главная {brand.name}: 3 варианта</h1>
	<p>Выберите вариант. Все три — на одном наборе блоков, отличаются первым экраном и логикой пути.</p>
	<div class="grid">
		{#each variants as v}
			<a href={v.href} class="card">
				<img src={prod(v.photo)} alt="" />
				<div>
					<span>Вариант {v.n}</span>
					<h2>{v.title}</h2>
					<p>{v.text}</p>
				</div>
			</a>
		{/each}
	</div>
</main>

<style>
	main {
		padding-top: 48px;
		padding-bottom: 48px;
	}

	h1 {
		font-size: clamp(26px, 4vw, 40px);
		color: var(--navy);
	}

	main > p {
		color: var(--muted);
		margin: 10px 0 28px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 18px;
	}

	.card {
		border-radius: var(--radius);
		overflow: hidden;
		box-shadow: 0 2px 16px rgb(0 30 80 / 0.1);
		transition: transform 0.2s;
	}

	.card:hover {
		transform: translateY(-4px);
	}

	img {
		width: 100%;
		aspect-ratio: 16 / 10;
		object-fit: cover;
	}

	.card div {
		padding: 18px;
		display: grid;
		gap: 6px;
	}

	span {
		color: var(--pink);
		font-weight: 700;
		font-size: 13px;
		text-transform: uppercase;
	}

	.card p {
		color: var(--muted);
		font-size: 15px;
	}

	@media (max-width: 820px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
