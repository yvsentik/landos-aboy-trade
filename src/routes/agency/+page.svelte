<script lang="ts">
	import { asset } from '$app/paths';
	import Icon from '#lib/components/Icon.svelte';

	// Лендинг SEO-агентства «Фальков». Стиль okonti.ru: белый фон, плоские синие кнопки, фото.
	// Логика: оффер + видео → регалии → позиции → кейсы → бесплатный тест → цены.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const a = (f: string) => asset(f as any);
	const pic = (f: string) => a(`/img/agency/${f}`);

	const tel = 'tel:+79939823204';
	const tg = 'https://t.me/falkov_marketing';
	const channel = 'https://t.me/falkov_agency';

	const nav = [
		['Позиции', '#positions'],
		['Кейсы', '#cases'],
		['Цены', '#prices']
	];

	const logos = ['rosneft.svg', 'tatneft.svg', 'ekoniva.svg', 'korrus.svg', 'aravia.svg', 'psy-chat.svg', 'sotovik.svg'];

	const positions = [
		{ logo: 'ekoniva.svg', name: 'ЭкоНива-Техника', niche: 'Дилер сельхозтехники', top: 551, q: ['кормосмеситель', 'техника джон дир'] },
		{ logo: 'shinokoff.png', name: 'Шиномонтажникоф', niche: 'Выездной автосервис', top: 230, q: ['шиномонтаж выездной', 'доставка бензина'] },
		{ logo: 'sotovik.svg', name: 'SOTOViK', niche: 'Магазин электроники', top: 213, q: ['купить в спб айфон', 'купить макбук в спб'] },
		{ logo: 'korrus.svg', name: 'Коррус-Техникс', niche: 'Дорожная техника', top: 154, q: ['каток бомаг', 'купить каток бомаг'] },
		{ logo: 'lodki-rf.png', name: 'Триера', niche: 'Производство лодок', top: 119, q: ['триера лодки', 'триера официальный сайт'] },
		{ logo: 'psy-chat.svg', name: 'Psy-Chat', niche: 'Онлайн-психологи', top: 78, q: ['бесплатный онлайн психолог', 'психолог чат'] }
	];

	const steps = ['Присылаете сайт', 'Собираем запросы', 'Фиксируем позиции', 'Выводим в ТОП', 'Заключаем договор'];

	const cases = [
		{ img: '2318-1.jpg', big: '2 700', unit: 'посетителей в месяц с нуля', name: 'Юридические услуги' },
		{ img: '2259-1.jpg', big: 'ТОП-3', unit: 'по Москве за 5 месяцев', name: 'Арбитражный адвокат' },
		{ img: '2323-1.jpg', big: '+100', unit: 'посетителей каждый день', name: 'Магазин техники Apple' },
		{ img: '2272-1.jpg', big: 'ТОП-5', unit: 'по Москве', name: 'Ремонт трансформаторов' },
		{ img: '2273-1.jpg', big: '−40%', unit: 'мусорных лидов', name: 'Кухни на заказ' },
		{ img: '2322-1.jpg', big: 'ТОП', unit: 'в Google', name: 'Клиника наркологии' }
	];

	const prices = [
		{ series: 'Поиск', name: 'SEO-продвижение', lines: ['Яндекс и Google', 'Первая динамика за 1–2 месяца'], price: 'от 50 000 ₽/мес' },
		{ series: 'Реклама', name: 'Яндекс Директ', lines: ['Без абонентской платы', 'Окупаемость до ×10'], price: '% от прибыли' },
		{ series: 'Под ключ', name: 'Весь маркетинг', lines: ['Сайт, SEO, реклама, CRM', 'Один отчёт по всем каналам'], price: 'Цена по договорённости' }
	];

	let allPos = $state(false);

	let sent = $state(false);
	const submit = (e: SubmitEvent) => {
		e.preventDefault();
		sent = true; // TODO: отправка заявки в CRM / Telegram
	};
</script>

<svelte:head>
	<title>SEO-продвижение сайтов в Санкт-Петербурге – агентство «Фальков»</title>
	<meta name="description" content="Выводим сайты в ТОП-5 Яндекса и Google. Рост показываем на вашем сайте бесплатно – до договора. 45+ кейсов. Офис: пр. Энергетиков, 10." />
</svelte:head>

<div class="mbar">
	<a href={tel}><Icon name="phone" size={20} />Позвонить</a>
	<a href={tg}><Icon name="chat" size={20} />Написать</a>
</div>

<header>
	<div class="wrap main">
		<a class="logo" href="#top"><span class="mark"></span><span><b>ФАЛЬКОВ</b><small>SEO-агентство</small></span></a>
		<div class="acts">
			<a href={tel}><Icon name="phone" size={22} />Позвонить</a>
			<a href={tg}><Icon name="chat" size={22} />Написать</a>
		</div>
	</div>
	<nav class="wrap">
		{#each nav as [label, href]}<a {href}>{label}</a>{/each}
		<span>Санкт-Петербург, пр. Энергетиков, 10</span>
	</nav>
</header>

<main id="top">
	<!-- 1. Оффер + видео руководителя -->
	<div class="wrap">
		<div class="banner">
			<div class="btxt">
				<span class="badge">Рост – до договора</span>
				<h1>SEO-продвижение сайтов в Санкт-Петербурге</h1>
				<p>Выводим в ТОП-5 Яндекса и Google. Сначала бесплатно показываем рост на вашем сайте, потом подписываем договор.</p>
				<div class="ctas">
					<a class="btn btn-white" href="#test">Отправить сайт на тест</a>
					<a class="btn line" href="#cases">Смотреть кейсы</a>
				</div>
			</div>
			<figure>
				<video src={a('/video/podhod.mp4')} poster={a('/video/podhod.jpg')} controls playsinline preload="none"></video>
				<figcaption>Руководитель агентства – как устроен бесплатный тест</figcaption>
			</figure>
		</div>

		<!-- 2. Регалии -->
		<div class="regalia">
			<div class="nums">
				<div><b>45+</b><span>кейсов</span></div>
				<div><b>1 345</b><span>запросов в ТОП-5</span></div>
				<div><b>1–2 мес</b><span>до первых результатов</span></div>
			</div>
			<div class="logos">
				<span>Клиенты</span>
				{#each logos as l}<img src={pic(l)} alt="" />{/each}
			</div>
		</div>
	</div>

	<!-- 3. Позиции, которые можно проверить -->
	<section id="positions">
		<div class="wrap">
			<h2>Убедитесь сами в эффективности наших проектов</h2>
			<div class="ptable" class:open={allPos}>
				{#each positions as p}
					<div class="prow">
						<img src={pic(p.logo)} alt={p.name} />
						<div class="pname"><b>{p.name}</b><span>{p.niche}</span></div>
						<div class="pq"><small>Введите в поиске</small>{#each p.q as q}<span>{q}</span>{/each}</div>
						<div class="ptop"><b>{p.top}</b><span>запросов в ТОП-5</span></div>
					</div>
				{/each}
			</div>
			{#if !allPos}
				<button type="button" class="btn btn-outline wide pmore" onclick={() => (allPos = true)}>Показать все {positions.length} проектов</button>
			{/if}
		</div>
	</section>

	<!-- 4. Кейсы -->
	<section id="cases">
		<div class="wrap">
			<h2>Кейсы</h2>
			<div class="cases">
				{#each cases as c}
					<article>
						<img src={pic(c.img)} alt={c.name} loading="lazy" />
						<div>
							<b class="big">{c.big}</b>
							<span class="unit">{c.unit}</span>
							<h3>{c.name}</h3>
						</div>
					</article>
				{/each}
			</div>
			<a class="btn btn-outline wide" href={channel}>Ещё 40+ кейсов в канале @falkov_agency</a>
		</div>
	</section>

	<!-- 5. Бесплатный тест -->
	<section id="test">
		<div class="wrap">
			<h2>Бесплатный тест сайта</h2>
			<ol class="steps">
				{#each steps as s, i}<li><span>{i + 1}</span>{s}</li>{/each}
			</ol>
			<div class="offer">
				<div>
					<h3>Покажем рост на вашем сайте до оплаты</h3>
				</div>
				{#if sent}
					<p class="ok">Заявка принята. Ответим сегодня.</p>
				{:else}
					<form onsubmit={submit}>
						<input class="field" required placeholder="Адрес сайта" />
						<input class="field" required type="tel" placeholder="Телефон" />
						<button class="btn btn-primary" type="submit">Отправить сайт на тест</button>
					</form>
				{/if}
			</div>
		</div>
	</section>

	<!-- 6. Цены -->
	<section id="prices">
		<div class="wrap">
			<h2>Услуги и цены</h2>
			<div class="series">
				{#each prices as p}
					<div class="ser">
						<small>{p.series}</small>
						<h3>{p.name}</h3>
						{#each p.lines as l}<p>{l}</p>{/each}
						<a class="btn btn-primary" href="#test">{p.price}</a>
					</div>
				{/each}
			</div>
		</div>
	</section>
</main>

<footer>
	<div class="wrap">
		<b>ФАЛЬКОВ</b>
		<span>SEO-агентство · Санкт-Петербург, пр. Энергетиков, 10</span>
		<a href={channel}>@falkov_agency</a>
	</div>
</footer>

<style>
	section { padding-top: 64px; }
	section, #prices { scroll-margin-top: 8px; }
	h2 { font-size: clamp(24px, 3vw, 32px); }
	.btn { border-radius: 8px; }

	.mbar { display: none; position: sticky; top: 0; z-index: 30; background: var(--blue); grid-template-columns: repeat(2, 1fr); }
	.mbar a { display: flex; align-items: center; justify-content: center; gap: 7px; color: #fff; font-weight: 600; font-size: 16px; padding: 14px 5px; }
	.mbar a + a { border-left: 1px solid rgb(255 255 255 / 0.25); }

	header { border-bottom: 1px solid var(--line); }
	.main { display: flex; align-items: center; gap: 20px; padding-top: 16px; padding-bottom: 14px; }
	.logo { display: flex; align-items: center; gap: 10px; }
	.mark { width: 42px; height: 42px; border: 5px solid var(--navy); background: var(--green); box-shadow: inset 0 0 0 4px #fff; }
	.logo b { display: block; color: var(--navy); font-size: 22px; font-weight: 800; line-height: 1; }
	.logo small { color: var(--navy); font-weight: 700; text-transform: uppercase; font-size: 12px; }
	.acts { margin-left: auto; display: flex; background: var(--blue); border-radius: 9px; padding: 5px; }
	.acts a { display: flex; gap: 9px; align-items: center; color: #fff; font-weight: 600; font-size: 18px; padding: 14px 20px; border-radius: 7px; }
	.acts a:hover { background: var(--blue-d); }
	nav { display: flex; gap: 32px; padding-bottom: 14px; font-weight: 500; }
	nav a:hover { color: var(--blue); }
	nav span { margin-left: auto; color: var(--muted); font-size: 14px; }

	.banner { margin-top: 28px; background: var(--navy); color: #fff; border-radius: 16px; padding: 44px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
	.btxt { display: grid; gap: 18px; justify-items: start; }
	h1 { font-size: clamp(28px, 3.6vw, 46px); font-weight: 800; text-transform: uppercase; line-height: 1.1; }
	.btxt p { font-size: 18px; opacity: 0.9; }
	.ctas { display: flex; gap: 12px; flex-wrap: wrap; }
	.line { color: #fff; border: 2px solid #fff; background: none; }
	figure { margin: 0; }
	video { width: 100%; aspect-ratio: 640 / 350; display: block; border-radius: 10px; background: #000; }
	figcaption { font-size: 14px; opacity: 0.8; margin-top: 10px; }

	.regalia { display: flex; align-items: center; justify-content: space-between; gap: 32px; padding: 28px 0 0; flex-wrap: wrap; }
	.nums { display: flex; gap: 40px; }
	.nums div { display: grid; align-content: start; }
	.nums b { font-size: 34px; font-weight: 800; color: var(--navy); line-height: 1.1; }
	.nums span { color: var(--muted); font-size: 14px; }
	.logos { flex: 1 1 100%; display: flex; align-items: center; justify-content: space-between; gap: 24px 39px; flex-wrap: wrap; }
	.logos span { flex: 1 1 100%; color: var(--navy); font-size: 24px; font-weight: 700; }
	.logos img { height: 42px; width: auto; flex: none; }

	.ptable { margin-top: 24px; border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }
	.prow { display: grid; grid-template-columns: 110px 1.1fr 2fr 170px; gap: 20px; align-items: center; padding: 16px 20px; }
	.prow + .prow { border-top: 1px solid var(--line); }
	.prow img { max-height: 32px; max-width: 100px; width: auto; }
	.pmore { display: none; }
	.pname b { display: block; }
	.pname span { color: var(--muted); font-size: 14px; }
	.pq { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
	.pq small { flex: 1 1 100%; color: var(--muted); font-size: 13px; font-weight: 600; }
	.pq span { background: var(--soft-2); border: 1px solid var(--line); border-radius: 6px; padding: 5px 10px; font-size: 14px; }
	.ptop { text-align: right; }
	.ptop b { display: block; font-size: 28px; font-weight: 800; color: var(--blue); line-height: 1; }
	.ptop span { color: var(--muted); font-size: 13px; }

	.cases { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
	article { border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }
	article img { width: 100%; aspect-ratio: 3 / 2; object-fit: cover; object-position: top; border-bottom: 1px solid var(--line); }
	article div { padding: 16px 18px 18px; }
	.big { font-size: 34px; font-weight: 800; color: var(--blue); line-height: 1; margin-right: 8px; }
	.unit { color: var(--muted); }
	article h3 { margin-top: 8px; font-size: 17px; }
	.wide { width: 100%; margin-top: 16px; }

	.series { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
	.ser { background: #e8eefa; border-radius: 12px; padding: 22px; display: grid; gap: 6px; align-content: start; }
	.ser small { font-weight: 700; }
	.ser h3 { font-size: 22px; margin-bottom: 4px; }
	.ser p { color: var(--muted); }
	.ser .btn { margin-top: 12px; }
	button.wide { font: inherit; font-weight: 600; cursor: pointer; }

	.steps { list-style: none; padding: 0; margin: 24px 0; display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
	.steps li { display: flex; align-items: center; gap: 12px; font-weight: 600; }
	.steps span { flex: none; width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--green); color: var(--green); font-weight: 700; display: grid; place-items: center; }
	.offer { background: var(--soft); border-radius: 16px; padding: 32px; display: grid; grid-template-columns: 1fr 1.6fr; gap: 32px; align-items: center; }
	.offer h3 { font-size: 24px; font-weight: 700; }
	.offer p { color: var(--muted); margin-top: 6px; }
	form { display: grid; grid-template-columns: 1fr 1fr auto; gap: 10px; }
	.ok { font-weight: 700; font-size: 18px; color: var(--navy); }

	footer { margin-top: 64px; background: var(--navy); color: #c9d6f2; padding: 28px 0; font-size: 14px; }
	footer .wrap { display: flex; gap: 24px; flex-wrap: wrap; align-items: center; }
	footer b { color: #fff; font-size: 18px; }
	footer a { color: #fff; }
	footer a:first-of-type { margin-left: auto; }

	@media (max-width: 1000px) {
		nav span { display: none; }
		.banner { grid-template-columns: 1fr; padding: 28px; }
		.prow { grid-template-columns: 90px 1fr 130px; }
		.pq { grid-column: 1 / -1; order: 3; }
		.cases { grid-template-columns: 1fr 1fr; }
		.steps { grid-template-columns: 1fr 1fr; }
		.offer { grid-template-columns: 1fr; }
	}

	@media (max-width: 640px) {
		section { padding-top: 44px; }
		.mbar { display: grid; }
		.acts { display: none; }
		nav { gap: 20px; overflow-x: auto; scrollbar-width: none; white-space: nowrap; font-size: 15px; padding-bottom: 12px; }
		section, #prices { scroll-margin-top: 62px; }
		.banner { padding: 22px 18px; margin-top: 16px; gap: 24px; }
		.btxt p { font-size: 16px; }
		.nums { width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; text-align: center; }
		.nums b { font-size: 24px; }
		.prow { grid-template-columns: 1fr auto; gap: 10px; padding: 14px; }
		.prow img { display: none; }
		.ptable:not(.open) .prow:nth-child(n + 4) { display: none; }
		.pmore { display: flex; }
		.ptop b { font-size: 24px; }
		.cases, .series, .steps { grid-template-columns: 1fr; }
		form { grid-template-columns: 1fr; }
		.offer { padding: 20px; }
		footer a:first-of-type { margin-left: 0; }
	}
</style>
