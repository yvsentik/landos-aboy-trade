<script lang="ts">
	import { resolve } from '$app/paths';
	import LeadForm from '#lib/components/LeadForm.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import MaxLogo from '#lib/components/MaxLogo.svelte';
	import { brand } from '#lib/data.ts';
	import { shop } from '#lib/shop.svelte.ts';
	import { sendLead, leadError } from '#lib/lead.ts';
	import type { PageProps } from './$types';

	// Карточка повторяет элементы карточки lastanza.ru: размер, фактура, редактирование,
	// цена/площадь/стоимость, корзина и покупка в 1 клик, вкладки, похожие изображения.
	let { data }: PageProps = $props();
	const p = $derived(data.p);

	let photo = $state<'int' | 'full'>('int');
	let size = $state('');
	let tex = $state('');
	let w = $state(0);
	let h = $state(0);
	let lock = $state(true);
	let mirror = $state(false);
	let bw = $state(false);
	let tab = $state('delivery');
	let shared = $state(false);
	let oneClick = $state(false);
	let sent = $state(false);
	let added = $state(false);

	const ratio = $derived.by(() => {
		const [a, b] = (p.sizes[0] ?? '1x1').split('x').map(Number);
		return a / b || 1;
	});

	$effect(() => {
		// сброс при переходе на другую фреску
		size = p.sizes[0] ?? '';
		tex = data.textures[0]?.id ?? '';
		photo = 'int';
		mirror = bw = added = sent = false;
	});

	// после смены размера или фактуры – снова можно добавить в корзину
	$effect(() => {
		void [w, h, tex];
		added = false;
	});

	function addToCart() {
		shop.add({
			slug: p.slug,
			art: p.art,
			title: p.title,
			img: p.img,
			w: Math.round(w),
			h: Math.round(h),
			texture: t?.name ?? '',
			perM
		});
		added = true;
	}

	$effect(() => {
		const [a, b] = size.split('x').map(Number);
		if (a && b) {
			w = a;
			h = b;
		}
	});

	function setW(v: number) {
		w = v;
		if (lock && v) h = Math.round(v / ratio);
		size = '';
	}

	function setH(v: number) {
		h = v;
		if (lock && v) w = Math.round(v * ratio);
		size = '';
	}

	let busy = $state(false);
	let errText = $state('');

	async function buyOneClick(e: SubmitEvent) {
		e.preventDefault();
		const f = new FormData(e.currentTarget as HTMLFormElement);
		busy = true;
		errText = '';
		const res = await sendLead({
			form: 'oneclick',
			name: String(f.get('name') ?? ''),
			phone: String(f.get('phone') ?? ''),
			website: String(f.get('website') ?? ''),
			total,
			items: [
				{
					title: p.title,
					art: p.art,
					w: Math.round(w),
					h: Math.round(h),
					texture: t?.name ?? '',
					perM,
					qty: 1,
					sum: total,
					url: location.href
				}
			]
		});
		busy = false;
		if (res.ok) sent = true;
		else errText = leadError(res, brand.phone);
	}

	async function share() {
		try {
			if (navigator.share) await navigator.share({ title: p.h1, url: location.href });
			else await navigator.clipboard.writeText(location.href);
			shared = true;
			setTimeout(() => (shared = false), 2000);
		} catch {
			/* пользователь отменил */
		}
	}

	const t = $derived(data.textures.find((x) => x.id === tex));
	const area = $derived(Math.max(0, (w * h) / 10000));
	const perM = $derived(t?.price || p.price);
	const total = $derived(Math.round(area * perM));
	const fmt = (n: number) => n.toLocaleString('ru-RU');
	const clean = (v: string) => v.split('|').pop()!.trim();
	const cat = (g: string, v: string) => `${resolve('/(site)/catalog')}?${encodeURIComponent(g)}=${encodeURIComponent(v)}`;
	const lead = '#lead';
	const big = (src: string) => src.replace('/390_300_1/', '/800_800_1/');

	const tabs = [
		['delivery', 'Доставка и оплата'],
		['guarantee', 'Гарантия'],
		['mount', 'Монтаж'],
		['certs', 'Сертификаты']
	];
</script>

<svelte:head>
	<title>{p.h1} – купить фреску от {fmt(p.price)} ₽/м²</title>
	<meta name="description" content="{p.h1}. Печать по вашему размеру, {data.textures.length} фактур на выбор. Бесплатный пробник и доставка по Москве." />
</svelte:head>

{#snippet strip(title: string, items: { slug: string; art: string; img: string; price: number }[], more?: string)}
	{#if items.length}
		<section>
			<div class="sh">
				<h2>{title}</h2>
				{#if more}<a class="link" href={more}>Смотреть все →</a>{/if}
			</div>
			<div class="strip">
				{#each items as c}
					<a href={resolve('/(site)/catalog/[slug]', { slug: c.slug })}>
						<img src={c.img} alt="Арт. {c.art}" loading="lazy" />
						<b>Арт. {c.art}</b>
						<span>от {fmt(c.price)} ₽/м²</span>
					</a>
				{/each}
			</div>
		</section>
	{/if}
{/snippet}


<main class="wrap">
	<nav class="crumbs">
		<a href="/">Главная</a> / <a href={resolve('/(site)/catalog')}>Каталог</a>
		{#if p.tags['Коллекция']}/ <a href={cat('Коллекция', p.tags['Коллекция'][0])}>{clean(p.tags['Коллекция'][0])}</a>{/if}
		/ <span>Арт. {p.art}</span>
	</nav>

	<div class="title">
		<h1>{p.h1}</h1>
		<div class="tools">
			<span class="art">Арт. {p.art}</span>
			<button onclick={share} aria-label="Поделиться"><Icon name="send" size={16} />{shared ? 'Ссылка скопирована' : 'Поделиться'}</button>
		</div>
	</div>

	<div class="top">
		<div class="gallery">
			<div class="main">
				<img
					class:mirror
					class:bw
					src={photo === 'full' && p.full ? p.full : big(p.img)}
					onerror={(e) => ((e.currentTarget as HTMLImageElement).src = p.img)}
					alt={p.h1}
				/>
			</div>
			<div class="thumbs">
				<button class:on={photo === 'int'} onclick={() => (photo = 'int')}><img src={p.img} alt="В интерьере" /></button>
				{#if p.full}
					<button class:on={photo === 'full'} onclick={() => (photo = 'full')}><img src={p.full} alt="Изображение" /></button>
				{/if}
			</div>
			{#if p.video}
				<video src={p.video} controls muted playsinline preload="none" poster={p.img}></video>
			{/if}
		</div>

		<div class="info">
			{#if data.colors.length}
				<p class="lbl first">Другие цвета</p>
				<div class="vars">
					<span class="cur"><img src={p.img} alt="Арт. {p.art}" /></span>
					{#each data.colors as c}
						<a href={resolve('/(site)/catalog/[slug]', { slug: c.slug })} title="Арт. {c.art}"><img loading="lazy" src={c.img} alt="Арт. {c.art}" /></a>
					{/each}
				</div>
			{/if}

			<label class="lbl" class:first={!data.colors.length} for="size">Размер (Ш × В), см</label>
			<select id="size" class="field" bind:value={size}>
				<option value="" disabled>Свой размер</option>
				{#each p.sizes as s}<option value={s}>{s.replace('x', ' × ')}</option>{/each}
			</select>
			<div class="own">
				<input class="field" type="number" min="30" value={w} oninput={(e) => setW(+e.currentTarget.value)} aria-label="Ширина, см" />
				<span>×</span>
				<input class="field" type="number" min="30" value={h} oninput={(e) => setH(+e.currentTarget.value)} aria-label="Высота, см" />
				<span>см</span>
			</div>
			<label class="check"><input type="checkbox" bind:checked={lock} />Зафиксировать пропорции</label>

			{#if data.textures.length}
				<p class="lbl">Фактура</p>
				<div class="tex">
					{#each data.textures as x}
						<button class:on={tex === x.id} onclick={() => (tex = x.id)}>
							<img src={x.img} alt={x.name} loading="lazy" />
							<b>{x.name}</b>
							<span>{fmt(x.price)} ₽/м²</span>
						</button>
					{/each}
				</div>
				{#if t?.desc}<p class="desc">{t.desc}</p>{/if}
			{/if}

			<p class="lbl">Редактировать изображение</p>
			<div class="edit">
				<button class="chip" class:on={mirror} onclick={() => (mirror = !mirror)}>Отразить</button>
				<button class="chip" class:on={bw} onclick={() => (bw = !bw)}>Чёрно-белое</button>
				<a class="chip" href={lead}>Изменить кадр с дизайнером</a>
			</div>
			<a class="pick" href={lead}><Icon name="palette" size={18} />Заказать цветоподборку</a>
		</div>

		<!-- Блок покупки как на Ozon: всегда на виду -->
		<aside class="buybox">
			<div class="price">
				<b>{fmt(total)} ₽</b>
				<span>{area.toFixed(2).replace('.', ',')} м² × {fmt(perM)} ₽</span>
			</div>
			{#if t}<p class="sel">{Math.round(w)} × {Math.round(h)} см · {t.name}</p>{/if}
			{#if added}
				<a class="btn btn-primary big" href="/cart/"><Icon name="cart" size={22} />В корзине – оформить</a>
			{:else}
				<button class="btn btn-primary big" onclick={addToCart} disabled={!area}><Icon name="cart" size={22} />В корзину</button>
			{/if}
			<button class="btn btn-pink" onclick={() => (oneClick = true)}>Купить в 1 клик</button>
			<ul class="perks">
				<li><Icon name="gift" size={18} />Пробник и цветопроба – бесплатно</li>
				<li><Icon name="clock" size={18} />Печать от 3 дней</li>
				<li><Icon name="truck" size={18} />Доставка по всей России</li>
			</ul>
			<div class="alt">
				<a href={brand.phoneHref}><Icon name="phone" size={16} />{brand.phone}</a>
				<a href={brand.max}><MaxLogo size={16} />Макс</a>
				<a href={brand.telegram}><Icon name="send" size={16} />Telegram</a>
			</div>
		</aside>
	</div>

	<div class="tabs">
		{#each tabs as [id, name]}
			<button class:on={tab === id} onclick={() => (tab = id)}>{name}</button>
		{/each}
	</div>
	<div class="tabbody">
		{#if tab === 'delivery'}
			<p><b>Курьером по Москве и области</b> – 1–3 дня. Бесплатно при заказе от 25 000 ₽, до 25 000 ₽ – 1 200 ₽ внутри МКАД.</p>
			<p><b>По России и СНГ</b> – СДЭК до пункта выдачи или до двери, стоимость считается при заказе.</p>
			<p><b>Оплата:</b> картой, наличными при получении или по счёту.</p>
		{:else if tab === 'guarantee'}
			<p>Гарантия – 5 лет на интерьерные и 2 года на фасадные материалы. Срок службы по ТУ – 12 лет при монтаже вне зоны постоянного прямого солнца.</p>
			<p>Готовая фреска будет такой же, как утверждённая цветопроба.</p>
		{:else if tab === 'mount'}
			<p>Фреска клеится так же, как обои: приезжает свёрнутой по высоте, с инструкцией. Поклейку можем организовать по запросу.</p>
			<a class="btn btn-outline" href={lead}>Уточнить у менеджера</a>
		{:else}
			<p>Продукция сертифицирована: сертификат соответствия ГОСТ Р действует до 15.11.2027.</p>
			<p>Копию сертификата пришлём по запросу.</p>
		{/if}
	</div>

	{@render strip(
		data.sameCollection.name ? `Ещё из коллекции ${clean(data.sameCollection.name)}` : '',
		data.sameCollection.items,
		data.sameCollection.name ? cat('Коллекция', data.sameCollection.name) : undefined
	)}
	{@render strip(
		data.sameTheme.name ? `Ещё изображения: ${clean(data.sameTheme.name)}` : '',
		data.sameTheme.items,
		data.sameTheme.name ? cat('Категория', data.sameTheme.name) : undefined
	)}
</main>

<!-- Телефон: цена и кнопка всегда внизу экрана -->
<div class="buybar">
	<div>
		<b>{fmt(total)} ₽</b>
		<span>{fmt(perM)} ₽/м²</span>
	</div>
	{#if added}
		<a class="btn btn-primary" href="/cart/">В корзине</a>
	{:else}
		<button class="btn btn-primary" onclick={addToCart} disabled={!area}><Icon name="cart" size={20} />В корзину</button>
	{/if}
</div>

{#if oneClick}
	<div class="modal" role="dialog" aria-modal="true" aria-label="Купить в 1 клик">
		<div class="mbox">
			<button class="x" onclick={() => (oneClick = false)} aria-label="Закрыть">✕</button>
			{#if sent}
				<h3>Заказ принят</h3>
				<p>Менеджер свяжется с вами в течение дня.</p>
			{:else}
				<h3>Купить в 1 клик</h3>
				<p>Арт. {p.art} · {w} × {h} см · {t?.name ?? ''} · {fmt(total)} ₽</p>
				<form onsubmit={buyOneClick}>
					<input class="field" name="name" placeholder="Имя" autocomplete="name" />
					<input class="field" name="phone" type="tel" required placeholder="Телефон*, +7 999 123-45-67" autocomplete="tel" />
					<input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" />
					<button class="btn btn-pink" type="submit" disabled={busy}>{busy ? 'Отправляем…' : 'Отправить'}</button>
					{#if errText}<p class="err">{errText}</p>{/if}
				</form>
			{/if}
		</div>
	</div>
{/if}

<LeadForm title="Понравилась фреска? Рассчитаем за 15 минут" />

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
		padding-top: 20px;
	}

	.crumbs {
		font-size: 14px;
		color: var(--muted);
		margin-bottom: 18px;
	}

	.crumbs a:hover {
		color: var(--blue);
	}

	.title {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 16px;
		flex-wrap: wrap;
		margin-bottom: 18px;
	}

	h1 {
		font-size: clamp(22px, 2.6vw, 30px);
		color: var(--navy);
	}

	.tools {
		display: flex;
		align-items: center;
		gap: 14px;
		color: var(--muted);
		font-size: 14px;
	}

	.tools button {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		border: 0;
		background: none;
		font: inherit;
		color: var(--blue);
		cursor: pointer;
	}

	/* Ozon: фото | параметры | блок покупки */
	.top {
		display: grid;
		grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr) 320px;
		gap: 28px;
		align-items: start;
	}

	.gallery {
		display: grid;
		gap: 12px;
	}

	.main {
		position: relative;
	}

	.main img {
		width: 100%;
		border-radius: var(--radius);
		background: var(--soft-2);
		transition:
			transform 0.3s,
			filter 0.3s;
	}

	.main img.mirror {
		transform: scaleX(-1);
	}

	.main img.bw {
		filter: grayscale(1);
	}

	.thumbs {
		display: flex;
		gap: 10px;
	}

	.thumbs button {
		width: 84px;
		height: 64px;
		padding: 0;
		border: 2px solid transparent;
		border-radius: 10px;
		overflow: hidden;
		cursor: pointer;
		background: none;
	}

	.thumbs button.on {
		border-color: var(--blue);
	}

	.thumbs img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	video {
		width: 100%;
		border-radius: 12px;
		background: #000;
	}

	.lbl.first {
		margin-top: 0;
	}

	.lbl {
		display: block;
		font-weight: 600;
		margin: 18px 0 8px;
	}

	.vars {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.vars img {
		width: 64px;
		height: 50px;
		object-fit: cover;
		border-radius: 8px;
		display: block;
	}

	.vars a,
	.vars .cur {
		border: 2px solid transparent;
		border-radius: 10px;
	}

	.vars .cur {
		border-color: var(--blue);
	}

	.vars a:hover {
		border-color: var(--line);
	}

	.own {
		display: grid;
		grid-template-columns: 1fr auto 1fr auto;
		align-items: center;
		gap: 8px;
		margin-top: 8px;
		color: var(--muted);
	}

	.check {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 10px;
		font-size: 14px;
	}

	.pick {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin-top: 12px;
		color: var(--blue);
		font-weight: 600;
	}

	.tex {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
		gap: 8px;
	}

	.tex button {
		display: grid;
		gap: 2px;
		padding: 6px;
		border: 2px solid var(--line);
		border-radius: 12px;
		background: #fff;
		font: inherit;
		text-align: left;
		cursor: pointer;
	}

	.tex button.on {
		border-color: var(--blue);
		background: var(--soft);
	}

	.tex img {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		border-radius: 8px;
		margin-bottom: 4px;
	}

	.tex b {
		font-size: 13px;
	}

	.tex span {
		font-size: 12px;
		color: var(--navy);
		font-weight: 600;
	}

	.desc {
		font-size: 14px;
		color: var(--muted);
		margin-top: 10px;
	}

	.edit {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.buybox {
		position: sticky;
		top: 176px;
		display: grid;
		gap: 10px;
		padding: 22px;
		border-radius: 18px;
		background: #fff;
		box-shadow: 0 6px 30px rgb(0 30 80 / 0.14);
	}

	.price b {
		display: block;
		font-size: 34px;
		font-weight: 800;
		color: var(--navy);
		line-height: 1.1;
	}

	.price span,
	.sel {
		color: var(--muted);
		font-size: 14px;
	}

	.btn.big {
		min-height: 58px;
		font-size: 18px;
	}

	.buybox .btn {
		width: 100%;
	}

	.perks {
		list-style: none;
		padding: 12px 0 0;
		margin: 4px 0 0;
		border-top: 1px solid var(--line);
		display: grid;
		gap: 8px;
		font-size: 14px;
	}

	.perks li {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.perks :global(svg) {
		color: var(--green);
		flex: none;
	}

	.buybar {
		display: none;
	}

	.alt {
		display: flex;
		gap: 8px 14px;
		flex-wrap: wrap;
		font-size: 14px;
	}

	.alt a {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-weight: 600;
		color: var(--navy);
	}

	.tabs {
		display: flex;
		gap: 4px;
		margin-top: 36px;
		max-width: 860px;
		border-bottom: 1px solid var(--line);
		overflow-x: auto;
		scrollbar-width: none;
	}

	.tabs button {
		border: 0;
		background: none;
		font: inherit;
		font-weight: 600;
		padding: 10px 12px;
		color: var(--muted);
		border-bottom: 2px solid transparent;
		white-space: nowrap;
		cursor: pointer;
	}

	.tabs button.on {
		color: var(--navy);
		border-bottom-color: var(--blue);
	}

	.tabbody {
		padding: 14px 0;
		display: grid;
		gap: 10px;
		justify-items: start;
		font-size: 15px;
	}

	.sh {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 16px;
	}

	.strip {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(180px, 1fr);
		gap: 14px;
		overflow-x: auto;
		margin-top: 18px;
		padding-bottom: 6px;
		scrollbar-width: thin;
	}

	.strip a {
		display: grid;
		gap: 4px;
	}

	.strip img {
		width: 100%;
		aspect-ratio: 390 / 300;
		object-fit: cover;
		border-radius: 12px;
	}

	.strip b {
		font-size: 14px;
	}

	.strip span {
		font-size: 13px;
		color: var(--navy);
	}

	.modal {
		position: fixed;
		inset: 0;
		z-index: 50;
		background: rgb(0 15 40 / 0.55);
		display: grid;
		place-items: center;
		padding: 16px;
	}

	.mbox {
		position: relative;
		background: #fff;
		border-radius: 16px;
		padding: 28px;
		width: min(420px, 100%);
		display: grid;
		gap: 12px;
	}

	.mbox p {
		color: var(--muted);
		font-size: 14px;
	}

	.mbox form {
		display: grid;
		gap: 10px;
	}

	.x {
		position: absolute;
		top: 10px;
		right: 12px;
		border: 0;
		background: none;
		font-size: 18px;
		cursor: pointer;
	}

	@media (max-width: 1100px) {
		.top {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		}
		.buybox {
			grid-column: 1 / -1;
			position: static;
		}
	}

	@media (max-width: 760px) {
		.top {
			grid-template-columns: 1fr;
			gap: 20px;
		}
		.buybox {
			display: none;
		}
		/* фиксированная панель цены снизу */
		.buybar {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 12px;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 35;
			padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
			background: #fff;
			box-shadow: 0 -4px 20px rgb(0 30 80 / 0.15);
		}
		.buybar div {
			display: grid;
		}
		.buybar b {
			font-size: 22px;
			font-weight: 800;
			color: var(--navy);
			line-height: 1.1;
		}
		.buybar span {
			font-size: 12px;
			color: var(--muted);
		}
		.buybar .btn {
			width: auto;
			min-height: 50px;
			padding: 0 22px;
		}
		:global(body:has(.buybar) .fc) {
			bottom: 86px;
		}
		:global(body:has(.buybar) footer) {
			padding-bottom: 90px;
		}
	}
</style>
