<script lang="ts">
	import { resolve } from '$app/paths';
	import Icon from '#lib/components/Icon.svelte';
	import MaxLogo from '#lib/components/MaxLogo.svelte';
	import { shop, lineTotal } from '#lib/shop.svelte.ts';
	import { brand } from '#lib/data.ts';
	import { sendLead } from '#lib/lead.ts';

	let sent = $state(false);
	let busy = $state(false);
	let failed = $state(false);
	let order = $state('');
	const fmt = (n: number) => n.toLocaleString('ru-RU');

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		const f = new FormData(e.currentTarget as HTMLFormElement);
		busy = true;
		failed = false;
		const ok = await sendLead({
			form: 'cart',
			name: String(f.get('name') ?? ''),
			phone: String(f.get('phone') ?? ''),
			city: String(f.get('city') ?? ''),
			comment: String(f.get('comment') ?? ''),
			website: String(f.get('website') ?? ''),
			total: shop.total,
			items: shop.cart.map((i) => ({
				title: i.title,
				art: i.art,
				w: i.w,
				h: i.h,
				texture: i.texture,
				perM: i.perM,
				qty: i.qty,
				sum: lineTotal(i),
				url: `${location.origin}/catalog/${i.slug}/`
			}))
		});
		busy = false;
		if (!ok) {
			failed = true;
			return;
		}
		order = shop.cart.map((i) => `арт. ${i.art} ${i.w}×${i.h} ${i.texture} ×${i.qty}`).join('; ');
		shop.clear();
		sent = true;
	}
</script>

<svelte:head>
	<title>Корзина – {brand.name}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="wrap">
	<nav class="crumbs"><a href="/">Главная</a> / <span>Корзина</span></nav>
	<h1>Корзина</h1>

	{#if sent}
		<div class="empty">
			<Icon name="check" size={44} />
			<h2>Заказ принят</h2>
			<p>Менеджер свяжется с вами, согласует макет и бесплатный пробник.</p>
			<small>{order}</small>
			<a class="btn btn-primary" href="/catalog/">Вернуться в каталог</a>
		</div>
	{:else if !shop.cart.length}
		<div class="empty">
			<Icon name="cart" size={44} />
			<h2>В корзине пусто</h2>
			<p>Выберите фреску в каталоге или пришлите своё изображение.</p>
			<div class="row">
				<a class="btn btn-primary" href="/catalog/">Перейти в каталог</a>
				<a class="btn btn-outline" href={brand.max}><MaxLogo size={20} />Отправить изображение</a>
			</div>
		</div>
	{:else}
		<div class="layout">
			<div class="list">
				{#each shop.cart as i (i.id)}
					<article>
						<a href={resolve('/(site)/catalog/[slug]', { slug: i.slug })}><img src={i.img} alt="Арт. {i.art}" /></a>
						<div class="info">
							<a href={resolve('/(site)/catalog/[slug]', { slug: i.slug })}><b>{i.title} арт. {i.art}</b></a>
							<span>{i.w} × {i.h} см · {((i.w * i.h) / 10000).toFixed(2).replace('.', ',')} м²{i.texture ? ` · ${i.texture}` : ''}</span>
							<span>{fmt(i.perM)} ₽/м²</span>
						</div>
						<div class="qty">
							<button onclick={() => shop.setQty(i.id, i.qty - 1)} aria-label="Меньше">−</button>
							<input type="number" min="1" max="99" value={i.qty} onchange={(e) => shop.setQty(i.id, +e.currentTarget.value)} aria-label="Количество" />
							<button onclick={() => shop.setQty(i.id, i.qty + 1)} aria-label="Больше">+</button>
						</div>
						<b class="sum">{fmt(lineTotal(i))} ₽</b>
						<button class="del" onclick={() => shop.remove(i.id)} aria-label="Удалить"><Icon name="trash" size={20} /></button>
					</article>
				{/each}
				<button class="clear" onclick={() => shop.clear()}>Очистить корзину</button>
			</div>

			<aside>
				<div class="tot">
					<span>Итого, {shop.count} шт.</span>
					<b>{fmt(shop.total)} ₽</b>
					<small>Без доставки. Макет и пробник – бесплатно. Точную цену подтвердит менеджер.</small>
				</div>
				<form onsubmit={submit}>
					<input class="field" name="name" placeholder="Имя" autocomplete="name" />
					<input class="field" name="phone" type="tel" required placeholder="Телефон*" autocomplete="tel" />
					<input class="field" name="city" placeholder="Город доставки" />
					<textarea class="field" name="comment" rows="3" placeholder="Комментарий"></textarea>
					<input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" />
					<button class="btn btn-pink" type="submit" disabled={busy}>{busy ? 'Отправляем…' : 'Оформить заказ'}</button>
					{#if failed}<p class="err">Не получилось отправить. Позвоните {brand.phone} или напишите в Макс.</p>{/if}
					<small>Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных</small>
				</form>
			</aside>
		</div>
	{/if}
</main>

<style>
	.hp {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		opacity: 0;
	}

	.err {
		color: #c8126a;
		font-size: 14px;
	}

	main {
		padding-top: 24px;
	}

	.crumbs {
		font-size: 14px;
		color: var(--muted);
		margin-bottom: 12px;
	}

	h1 {
		font-size: clamp(26px, 3.4vw, 36px);
		color: var(--navy);
		margin-bottom: 24px;
	}

	.empty {
		background: var(--soft-2);
		border-radius: var(--radius);
		padding: 48px 24px;
		display: grid;
		justify-items: center;
		gap: 12px;
		text-align: center;
	}

	.empty :global(svg) {
		color: var(--blue);
	}

	.empty p,
	.empty small {
		color: var(--muted);
	}

	.row {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
		justify-content: center;
	}

	.layout {
		display: grid;
		grid-template-columns: 1fr 380px;
		gap: 28px;
		align-items: start;
	}

	.list {
		display: grid;
		gap: 12px;
	}

	article {
		display: grid;
		grid-template-columns: 120px 1fr auto auto auto;
		gap: 16px;
		align-items: center;
		border: 1px solid var(--line);
		border-radius: 14px;
		padding: 12px;
	}

	article img {
		width: 120px;
		aspect-ratio: 390 / 300;
		object-fit: cover;
		border-radius: 10px;
	}

	.info {
		display: grid;
		gap: 2px;
	}

	.info span {
		color: var(--muted);
		font-size: 14px;
	}

	.qty {
		display: flex;
		align-items: center;
		border: 1px solid var(--line);
		border-radius: 10px;
		overflow: hidden;
	}

	.qty button {
		width: 34px;
		height: 38px;
		border: 0;
		background: var(--soft-2);
		font-size: 18px;
		cursor: pointer;
	}

	.qty input {
		width: 42px;
		height: 38px;
		border: 0;
		text-align: center;
		-moz-appearance: textfield;
		appearance: textfield;
	}

	.sum {
		font-size: 18px;
		color: var(--navy);
		white-space: nowrap;
	}

	.del,
	.clear {
		border: 0;
		background: none;
		color: var(--muted);
		cursor: pointer;
	}

	.del:hover,
	.clear:hover {
		color: var(--pink);
	}

	.clear {
		justify-self: start;
		font: inherit;
		font-size: 14px;
	}

	aside {
		position: sticky;
		top: 150px;
		display: grid;
		gap: 16px;
		background: var(--soft);
		border-radius: var(--radius);
		padding: 22px;
	}

	.tot {
		display: grid;
		gap: 2px;
	}

	.tot span,
	.tot small,
	form small {
		color: var(--muted);
		font-size: 13px;
	}

	.tot b {
		font-size: 30px;
		color: var(--navy);
	}

	form {
		display: grid;
		gap: 10px;
	}

	textarea.field {
		padding: 12px 16px;
		resize: vertical;
	}

	@media (max-width: 900px) {
		.layout {
			grid-template-columns: 1fr;
		}
		aside {
			position: static;
		}
	}

	@media (max-width: 600px) {
		article {
			grid-template-columns: 90px 1fr auto;
			gap: 10px;
		}
		article img {
			width: 90px;
		}
		.qty {
			grid-column: 2;
		}
		.sum {
			grid-column: 3;
			grid-row: 2;
			font-size: 16px;
		}
		.del {
			grid-column: 3;
			grid-row: 1;
			justify-self: end;
		}
	}
</style>
