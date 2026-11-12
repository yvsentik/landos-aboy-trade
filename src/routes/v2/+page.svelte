<script lang="ts">
	import { designs, styles, colors, rooms, themes, prod, catalogSize, brand } from '#lib/data.ts';
	import Header from '#lib/components/Header.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import Mural from '#lib/components/Mural.svelte';
	import DesignCard from '#lib/components/DesignCard.svelte';
	import UtpGrid from '#lib/components/UtpGrid.svelte';
	import StyleGrid from '#lib/components/StyleGrid.svelte';
	import ColorGuarantee from '#lib/components/ColorGuarantee.svelte';
	import Materials from '#lib/components/Materials.svelte';
	import Steps from '#lib/components/Steps.svelte';
	import Production from '#lib/components/Production.svelte';
	import Faq from '#lib/components/Faq.svelte';
	import LeadForm from '#lib/components/LeadForm.svelte';
	import Footer from '#lib/components/Footer.svelte';

	let style = $state('');
	let color = $state('');
	let room = $state('');

	const shown = $derived(
		designs.filter(
			(d) => (!style || d.style === style) && (!color || d.color === color) && (!room || d.room === room)
		)
	);

	const toggle = (cur: string, v: string) => (cur === v ? '' : v);
	const reset = () => (style = color = room = '');
</script>

<svelte:head>
	<title>Каталог фотообоев и фресок от производителя – {brand.name}</title>
	<meta
		name="description"
		content="{catalogSize} дизайнов фотообоев и фресок. Подбор по стилю, цвету и комнате. Печать по размеру от 3 дней, бесплатный пробник, доставка по Москве."
	/>
</svelte:head>

<Header />

<!-- Вариант 2 «Витрина»: человек сразу начинает выбирать, фильтр прямо в первом экране -->
<div class="hero">
	<div class="wrap inner">
		<div class="txt">
			<span class="badge">Фабрика в Москве · печать от 3 дней</span>
			<h1>Фотообои и фрески от производителя</h1>
			<p class="lead">
				{catalogSize} готовых дизайнов или ваш. Печатаем под размер стены, без запаха.
				Пробник и цветопроба – бесплатно.
			</p>

			<div class="picker">
				<p class="lbl">1. Ваш стиль</p>
				<div class="chips">
					{#each styles as s}
						<button class="chip" class:on={style === s.name} onclick={() => (style = toggle(style, s.name))}>
							{s.name}
						</button>
					{/each}
				</div>
				<p class="lbl">2. Цвет</p>
				<div class="chips">
					{#each colors as c}
						<button class="chip" class:on={color === c.name} onclick={() => (color = toggle(color, c.name))}>
							<i class="swatch" style:background={c.hex}></i>{c.name}
						</button>
					{/each}
				</div>
				<a class="btn btn-pink go" href="#catalog">
					<Icon name="search" size={20} />Показать дизайны
				</a>
			</div>
		</div>

		<div class="collage" aria-hidden="true">
			{#each designs.slice(0, 5) as d, i}
				<div class="m m{i}"><Mural kind={d.kind} palette={d.palette} seed={d.id} /></div>
			{/each}
			<img class="m m5" src={prod('fresco-paint')} alt="" />
		</div>
	</div>
</div>

<UtpGrid compact />

<section id="catalog">
	<div class="wrap">
		<div class="section-head">
			<div>
				<h2>Популярные дизайны</h2>
				<p>Найдено {shown.length} из демо-подборки · в каталоге {catalogSize}</p>
			</div>
			{#if style || color || room}
				<button class="chip" onclick={reset}>Сбросить фильтры ✕</button>
			{/if}
		</div>

		<div class="rooms chips">
			<span class="lbl">Комната:</span>
			{#each rooms as r}
				<button class="chip" class:on={room === r.name} onclick={() => (room = toggle(room, r.name))}>
					{r.name}
				</button>
			{/each}
		</div>

		{#if shown.length}
			<div class="cards">
				{#each shown as d (d.id)}
					<DesignCard {d} />
				{/each}
			</div>
		{:else}
			<div class="empty">
				<p>В демо-подборке нет такого сочетания – в полном каталоге оно точно есть.</p>
				<a class="btn btn-primary" href="#lead">Подберите мне дизайн</a>
			</div>
		{/if}

		<div class="themes">
			<span class="lbl">Темы:</span>
			<div class="chips">
				{#each themes as t}<a class="chip" href="#lead">{t}</a>{/each}
			</div>
		</div>
	</div>
</section>

<ColorGuarantee />
<StyleGrid title="Вдохновение по стилям" />
<Materials />
<Steps />
<Production />
<Faq />
<LeadForm title="Не нашли свой дизайн? Подберём за 15 минут" />
<Footer />

<style>
	.hero {
		background: linear-gradient(135deg, var(--navy) 0%, #0d3fae 60%, var(--blue) 100%);
		color: #fff;
		overflow: hidden;
	}

	.inner {
		display: grid;
		grid-template-columns: 1.15fr 1fr;
		gap: 40px;
		padding-top: 48px;
		padding-bottom: 48px;
		align-items: center;
	}

	.txt {
		display: grid;
		gap: 16px;
		justify-items: start;
	}

	h1 {
		font-size: clamp(32px, 4.4vw, 52px);
		font-weight: 800;
	}

	.lead {
		font-size: 18px;
		opacity: 0.9;
		max-width: 560px;
	}

	.picker {
		background: #fff;
		color: var(--text);
		border-radius: 16px;
		padding: 18px;
		display: grid;
		gap: 10px;
		width: 100%;
	}

	.lbl {
		font-weight: 600;
		font-size: 14px;
		color: var(--muted);
	}

	.picker .chip {
		font-size: 13px;
		padding: 7px 12px;
	}

	.go {
		margin-top: 6px;
	}

	.collage {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(6, 64px);
		gap: 10px;
	}

	.m {
		border-radius: 14px;
		overflow: hidden;
		box-shadow: 0 10px 30px rgb(0 0 0 / 0.25);
	}

	img.m {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.m0 {
		grid-row: 1 / 4;
	}
	.m1 {
		grid-row: 1 / 3;
	}
	.m2 {
		grid-row: 1 / 5;
	}
	.m3 {
		grid-row: 4 / 7;
	}
	.m4 {
		grid-row: 3 / 7;
	}
	.m5 {
		grid-row: 5 / 7;
	}

	.rooms {
		align-items: center;
		margin-bottom: 18px;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
	}

	.empty {
		padding: 40px;
		text-align: center;
		background: var(--soft-2);
		border-radius: var(--radius);
		display: grid;
		gap: 16px;
		justify-items: center;
	}

	.themes {
		margin-top: 22px;
		display: flex;
		gap: 12px;
		align-items: center;
		flex-wrap: wrap;
	}

	@media (max-width: 980px) {
		.inner {
			grid-template-columns: 1fr;
		}
		.collage {
			display: none;
		}
		.cards {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 720px) {
		.inner {
			padding-top: 28px;
			padding-bottom: 28px;
		}
		.lead {
			font-size: 16px;
		}
		.picker .chips,
		.rooms,
		.themes .chips {
			flex-wrap: nowrap;
			overflow-x: auto;
			scrollbar-width: none;
		}
		.cards {
			grid-template-columns: 1fr 1fr;
			gap: 10px;
		}
	}
</style>
