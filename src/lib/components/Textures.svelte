<script lang="ts">
	import { brand } from '#lib/data.ts';
	import MaxLogo from './MaxLogo.svelte';

	// Материалы (фактуры) из каталога с ценой за м² и описанием
	type T = { name: string; price: number; priceDesign: number; desc: string; img: string };
	let { groups }: { groups: { title: string; note: string; items: T[] }[] } = $props();

	const fmt = (n: number) => n.toLocaleString('ru-RU');
	// убираем из описания повтор названия в кавычках в начале
	// и оставляем два первых предложения
	const text = (t: T) => {
		const d = t.desc.replace(/^(Дизайнерские обои\s*)?"[^"]+"\s*[–-]\s*/, '').trim();
		const short = (d.match(/[^.!?]+[.!?]/g) ?? [d]).slice(0, 2).join(' ').trim();
		return short.charAt(0).toUpperCase() + short.slice(1);
	};
</script>

<section id="materials">
	<div class="wrap">
		<h2>Материалы и цены</h2>
		<p class="sub">Цена за м² с печатью по вашему размеру. Пробник любой фактуры – бесплатно</p>

		{#each groups as g}
			<div class="group">
				<h3>{g.title}</h3>
				<p class="note">{g.note}</p>
				<div class="grid">
					{#each g.items as t}
						<article>
							<img src={t.img} alt="Фактура {t.name}" loading="lazy" />
							<div class="body">
								<div class="head">
									<b>{t.name}</b>
									<span class="price">{fmt(t.price)} ₽/м²</span>
								</div>
								{#if t.priceDesign && t.priceDesign !== t.price}
									<small>с услугой дизайна – {fmt(t.priceDesign)} ₽/м²</small>
								{/if}
								<p>{text(t)}</p>
							</div>
						</article>
					{/each}
				</div>
			</div>
		{/each}

		<a class="btn btn-primary" href={brand.max}><MaxLogo size={20} light />Подобрать фактуру под мою стену</a>
	</div>
</section>

<style>
	.group {
		margin-top: 28px;
	}

	.note {
		color: var(--muted);
		font-size: 15px;
		margin: 4px 0 14px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 16px;
	}

	article {
		border-radius: var(--radius);
		overflow: hidden;
		background: var(--soft-2);
		display: flex;
		flex-direction: column;
	}

	img {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
	}

	.body {
		padding: 14px 16px 16px;
		display: grid;
		gap: 4px;
	}

	.head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 8px;
	}

	.head b {
		font-size: 17px;
	}

	.price {
		color: var(--navy);
		font-weight: 800;
		white-space: nowrap;
	}

	small {
		color: var(--muted);
		font-size: 12px;
	}

	p {
		color: var(--muted);
		font-size: 14px;
		margin-top: 4px;
	}

	.btn {
		margin-top: 24px;
	}
</style>
