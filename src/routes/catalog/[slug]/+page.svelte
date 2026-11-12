<script lang="ts">
	import { resolve } from '$app/paths';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import MaxLogo from '#lib/components/MaxLogo.svelte';
	import { brand } from '#lib/data.ts';
	import type { PageProps } from './$types';

	// Карточка повторяет элементы карточки lastanza.ru: размер, фактура, редактирование,
	// цена/площадь/стоимость, корзина и покупка в 1 клик, вкладки, похожие изображения.
	let { data }: PageProps = $props();
	const p = $derived(data.p);

	const LABEL: Record<string, string> = {
		Коллекция: 'Коллекция',
		Категория: 'Тема',
		'По назначению': 'Помещение',
		Цвет: 'Цвет',
		'По ориентации': 'Ориентация'
	};

	let photo = $state<'int' | 'full'>('int');
	let size = $state('');
	let tex = $state('');
	let w = $state(0);
	let h = $state(0);
	let lock = $state(true);
	let mirror = $state(false);
	let bw = $state(false);
	let tab = $state('delivery');
	let fav = $state(false);
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
		try {
			fav = (JSON.parse(localStorage.getItem('fav') ?? '[]') as string[]).includes(p.slug);
		} catch {
			fav = false;
		}
	});

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

	function toggleFav() {
		fav = !fav;
		try {
			const list = new Set(JSON.parse(localStorage.getItem('fav') ?? '[]') as string[]);
			if (fav) list.add(p.slug);
			else list.delete(p.slug);
			localStorage.setItem('fav', JSON.stringify([...list]));
		} catch {
			/* хранилище недоступно — избранное живёт до перезагрузки */
		}
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
	const cat = (g: string, v: string) => `${resolve('/catalog')}?${encodeURIComponent(g)}=${encodeURIComponent(v)}`;
	const lead = resolve('/v1') + '#lead';
	const big = (src: string) => src.replace('/390_300_1/', '/800_800_1/');

	const tabs = [
		['delivery', 'Доставка и оплата'],
		['guarantee', 'Гарантия'],
		['mount', 'Монтаж'],
		['certs', 'Сертификаты']
	];
</script>

<svelte:head>
	<title>{p.h1} — купить фреску от {fmt(p.price)} ₽/м²</title>
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
					<a href={resolve('/catalog/[slug]', { slug: c.slug })}>
						<img src={c.img} alt="Арт. {c.art}" loading="lazy" />
						<b>Арт. {c.art}</b>
						<span>от {fmt(c.price)} ₽/м²</span>
					</a>
				{/each}
			</div>
		</section>
	{/if}
{/snippet}

<Header calcHref={lead} home="/v1/" />

<main class="wrap">
	<nav class="crumbs">
		<a href={resolve('/v1')}>Главная</a> / <a href={resolve('/catalog')}>Каталог</a>
		{#if p.tags['Коллекция']}/ <a href={cat('Коллекция', p.tags['Коллекция'][0])}>{clean(p.tags['Коллекция'][0])}</a>{/if}
		/ <span>Арт. {p.art}</span>
	</nav>

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
				<div class="tools">
					<button onclick={share} aria-label="Поделиться"><Icon name="send" size={18} />{shared ? 'Ссылка скопирована' : 'Поделиться'}</button>
					<button class:on={fav} onclick={toggleFav} aria-label="В избранное"><Icon name="heart" size={18} />{fav ? 'В избранном' : 'В избранное'}</button>
				</div>
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
			<h1>{p.h1}</h1>
			<div class="tags">
				{#each Object.entries(p.tags) as [g, vs]}
					{#each vs as v}<a class="chip" href={cat(g, v)} title={LABEL[g]}>{clean(v)}</a>{/each}
				{/each}
			</div>

			{#if data.colors.length}
				<p class="lbl">Другие цвета</p>
				<div class="vars">
					<span class="cur"><img src={p.img} alt="Арт. {p.art}" /></span>
					{#each data.colors as c}
						<a href={resolve('/catalog/[slug]', { slug: c.slug })} title="Арт. {c.art}"><img src={c.img} alt="Арт. {c.art}" /></a>
					{/each}
				</div>
			{/if}

			<label class="lbl" for="size">Укажите размер (Ш × В), см</label>
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

			<a class="pick" href={lead}><Icon name="palette" size={18} />Заказать цветоподборку</a>

			{#if data.textures.length}
				<p class="lbl">Выберите фактуру</p>
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

			<div class="sum">
				<div class="row3">
					<div><span>Цена</span><b>{fmt(perM)} ₽</b><small>за 1 м²</small></div>
					<div><span>Площадь</span><b>{area.toFixed(2).replace('.', ',')}</b><small>м²</small></div>
					<div><span>Стоимость</span><b class="total">{fmt(total)} ₽</b></div>
				</div>
				<div class="buy">
					<a class="btn btn-primary" href={lead} onclick={() => (added = true)}>{added ? 'Добавлено в заказ' : 'Добавить в заказ'}</a>
					<button class="btn btn-pink" onclick={() => (oneClick = true)}>Купить в 1 клик</button>
				</div>
				<div class="alt">
					<a href={brand.phoneHref}><Icon name="phone" size={18} />{brand.phone}</a>
					<a href={brand.max}><MaxLogo size={18} />Написать в Макс</a>
					<a href={lead}><Icon name="gift" size={18} />Бесплатный пробник</a>
				</div>
			</div>

			<div class="tabs">
				{#each tabs as [id, name]}
					<button class:on={tab === id} onclick={() => (tab = id)}>{name}</button>
				{/each}
			</div>
			<div class="tabbody">
				{#if tab === 'delivery'}
					<p><b>Доставка курьером.</b> По Москве бесплатно при заказе от 30 000 ₽. По Московской области — по договорённости.</p>
					<p><b>Транспортной компанией.</b> До терминала в пределах МКАД — бесплатно, дальше по тарифу перевозчика.</p>
					<p><b>Оплата:</b> безналичный расчёт по счёту, картой или наличными курьеру.</p>
				{:else if tab === 'guarantee'}
					<p>Гарантия — 5 лет на интерьерные и 2 года на фасадные материалы. Срок службы по ТУ — 12 лет при монтаже вне зоны постоянного прямого солнца.</p>
					<p>Если готовое полотно отличается по цвету от утверждённой цветопробы — перепечатаем бесплатно.</p>
				{:else if tab === 'mount'}
					<p>Фреска клеится так же, как обои: клей наносится на стену, полотна стыкуются встык. Пришлём инструкцию или нашего мастера.</p>
					<a class="btn btn-outline" href={lead}>Заказать монтаж</a>
				{:else}
					<p>Продукция сертифицирована: сертификат соответствия ГОСТ Р действует до 15.11.2027.</p>
					<p>Копию сертификата пришлём по запросу.</p>
				{/if}
			</div>
		</div>
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
				<form
					onsubmit={(e) => {
						e.preventDefault();
						sent = true; // TODO: отправка заявки в CRM / Telegram
					}}
				>
					<input class="field" placeholder="Имя" />
					<input class="field" type="tel" required placeholder="Телефон*" />
					<button class="btn btn-pink" type="submit">Отправить</button>
				</form>
			{/if}
		</div>
	</div>
{/if}

<Footer home="/v1/" />

<style>
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

	.top {
		display: grid;
		grid-template-columns: 1.15fr 1fr;
		gap: 36px;
		align-items: start;
	}

	.gallery {
		display: grid;
		gap: 12px;
		position: sticky;
		top: 150px;
	}

	.main {
		position: relative;
	}

	.main img {
		width: 100%;
		border-radius: var(--radius);
		background: var(--soft-2);
		transition: transform 0.3s, filter 0.3s;
	}

	.main img.mirror {
		transform: scaleX(-1);
	}

	.main img.bw {
		filter: grayscale(1);
	}

	.tools {
		position: absolute;
		top: 12px;
		right: 12px;
		display: flex;
		gap: 8px;
	}

	.tools button {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		border: 0;
		border-radius: 999px;
		padding: 8px 12px;
		background: rgb(255 255 255 / 0.92);
		font: inherit;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
	}

	.tools button.on {
		color: var(--pink);
	}

	.thumbs {
		display: flex;
		gap: 10px;
	}

	.thumbs button {
		width: 96px;
		height: 72px;
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

	h1 {
		font-size: clamp(24px, 3vw, 32px);
		color: var(--navy);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin: 14px 0 8px;
	}

	.tags .chip {
		font-size: 13px;
		padding: 6px 12px;
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

	.sum {
		margin-top: 22px;
		background: var(--soft);
		border-radius: var(--radius);
		padding: 20px;
		display: grid;
		gap: 16px;
	}

	.row3 {
		display: grid;
		grid-template-columns: 1fr 1fr 1.3fr;
		gap: 10px;
	}

	.row3 div {
		display: grid;
	}

	.row3 span,
	.row3 small {
		color: var(--muted);
		font-size: 13px;
	}

	.row3 b {
		font-size: 22px;
		color: var(--navy);
	}

	.row3 .total {
		font-size: 28px;
	}

	.buy {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}

	.alt {
		display: flex;
		gap: 18px;
		flex-wrap: wrap;
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
		margin-top: 24px;
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

	@media (max-width: 900px) {
		.top {
			grid-template-columns: 1fr;
		}
		.gallery {
			position: static;
		}
	}

	@media (max-width: 560px) {
		.buy {
			grid-template-columns: 1fr;
		}
		.row3 b {
			font-size: 18px;
		}
		.row3 .total {
			font-size: 22px;
		}
		.tools button {
			font-size: 0;
			gap: 0;
			padding: 8px;
		}
	}
</style>
