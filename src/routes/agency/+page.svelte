<script lang="ts">
	import { asset } from '$app/paths';
	import Icon from '#lib/components/Icon.svelte';
	import { directions, groups, cases } from '#lib/agency.ts';

	// Лендинг SEO-агентства «Фальков». Стиль okonti.ru: белый фон, плоские синие кнопки, фото.
	// Логика: оффер + видео → регалии → позиции → услуги → кейсы → бесплатный тест.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const a = (f: string) => asset(f as any);
	const pic = (f: string) => a(`/img/agency/${f}`);

	const phone = '+7 993 982-32-04';
	const tel = 'tel:+79939823204';
	const tg = 'https://t.me/falkov_marketing';
	const channel = 'https://t.me/falkov_agency';

	const nav = [
		['Позиции', '#positions'],
		['Услуги', '#services'],
		['Кейсы', '#cases'],
		['Бесплатный тест', '#test']
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

	const steps = ['Присылаете сайт', 'Собираем запросы', 'Фиксируем позиции', 'Выводим в ТОП', 'Вы решаете'];

	let tab = $state(0);
	let allCases = $state(false);
	const shown = $derived(allCases ? cases : cases.slice(0, 6));

	let sent = $state(false);
	const submit = (e: SubmitEvent) => {
		e.preventDefault();
		sent = true; // TODO: отправка заявки в CRM / Telegram
	};
</script>

<svelte:head>
	<title>SEO-продвижение сайтов в Санкт-Петербурге — агентство «Фальков»</title>
	<meta name="description" content="Выводим сайты в ТОП-5 Яндекса и Google. Рост показываем на вашем сайте бесплатно — до договора. 45+ кейсов. Офис: пр. Энергетиков, 10." />
</svelte:head>

<div class="mbar">
	<a href={tel}><Icon name="phone" size={18} />Позвонить</a>
	<a href={tg}><Icon name="chat" size={18} />Написать</a>
</div>

<header>
	<div class="wrap main">
		<a class="logo" href="#top"><span class="mark"></span><span><b>ФАЛЬКОВ</b><small>SEO-агентство</small></span></a>
		<a class="phone" href={tel}>{phone}</a>
		<div class="acts">
			<a href={tel}><Icon name="phone" size={20} />Позвонить</a>
			<a href={tg}><Icon name="chat" size={20} />Написать</a>
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
				<span class="badge">Рост — до договора</span>
				<h1>SEO-продвижение сайтов в Санкт-Петербурге</h1>
				<p>Выводим в ТОП-5 Яндекса и Google. Сначала бесплатно показываем рост на вашем сайте, потом подписываем договор.</p>
				<div class="ctas">
					<a class="btn btn-white" href="#test">Отправить сайт на тест</a>
					<a class="btn line" href="#cases">Смотреть кейсы</a>
				</div>
			</div>
			<figure>
				<video src={a('/video/podhod.mp4')} poster={a('/video/podhod.jpg')} controls playsinline preload="none"></video>
				<figcaption>Руководитель агентства — как устроен бесплатный тест</figcaption>
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
			<h2>Позиции проектов — проверьте сами</h2>
			<p class="sub">Откройте Яндекс и введите запрос ниже</p>
			<div class="ptable">
				{#each positions as p}
					<div class="prow">
						<img src={pic(p.logo)} alt={p.name} />
						<div class="pname"><b>{p.name}</b><span>{p.niche}</span></div>
						<div class="pq">{#each p.q as q}<span>{q}</span>{/each}</div>
						<div class="ptop"><b>{p.top}</b><span>запросов в ТОП-5</span></div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- 4. Услуги -->
	<section id="services">
		<div class="wrap">
			<h2>Услуги и цены</h2>
			<p class="sub">Шесть направлений. Можно взять одно, можно отдать маркетинг под ключ.</p>
			<div class="dirs">
				{#each directions as d}
					<div class="dir">
						<span class="dn">{d.n}</span>
						<h3>{d.name}</h3>
						<small>{d.sub}</small>
						<p>{d.text}</p>
						<ul>{#each d.points as pt}<li>{pt}</li>{/each}</ul>
						{#if d.stat}<div class="dstat"><b>{d.stat[0]}</b><span>{d.stat[1]}</span></div>{/if}
					</div>
				{/each}
			</div>

			<h3 class="h3">Все услуги с ценами</h3>
			<div class="tabs" role="tablist">
				{#each groups as g, i}
					<button type="button" role="tab" aria-selected={tab === i} class:on={tab === i} onclick={() => (tab = i)}>{g.name}<span>{g.items.length}</span></button>
				{/each}
			</div>
			<p class="gtext">{groups[tab].text}</p>
			<div class="svc">
				{#each groups[tab].items as [name, text, price, per]}
					<div class="srow">
						<div><b>{name}</b><span>{text}</span></div>
						<div class="sprice"><b>{price}</b><span>{per}</span></div>
					</div>
				{/each}
			</div>

			<div class="choose">
				<h3>Как выбрать услугу</h3>
				<p>Заявки нужны в этом месяце – начинайте с Яндекс Директа, он даёт обращения с первой недели. Есть запас в несколько месяцев и дорогой клик в нише – вкладывайтесь в продвижение сайта в поиске. Трафик идёт, а заявок мало – смотрите на сайт и учёт обращений. База клиентов лежит без дела – подключайте рассылки.</p>
				<p>Не уверены, какой формат подходит? Отправьте сайт на тест – разберём ситуацию и скажем прямо, что нужно проекту, даже если это не наша услуга.</p>
				<a class="btn btn-primary" href="#test">Отправить сайт на тест</a>
			</div>
		</div>
	</section>

	<!-- 5. Кейсы -->
	<section id="cases">
		<div class="wrap">
			<h2>Кейсы: 45+ проектов и результаты в цифрах</h2>
			<p class="sub">Исходная точка, состав работ, сроки и результат. Названия клиентов обезличены там, где действует NDA.</p>
			<div class="cases">
				{#each shown as c}
					<article>
						<div class="ctop"><span class="ctag">{c.tag}</span><span>{c.geo}</span></div>
						<b class="cname">{c.name}</b>
						<div class="chead"><b class="big">{c.big}</b><span>{c.title}</span></div>
						<p>{c.text}</p>
						<div class="cstats">
							{#each c.stats as [v, l]}<div><b>{v}</b><span>{l}</span></div>{/each}
						</div>
						{#if c.img}<img src={pic(c.img)} alt="График посещаемости: {c.name}" loading="lazy" />{/if}
					</article>
				{/each}
			</div>
			{#if !allCases}
				<button type="button" class="btn btn-outline wide" onclick={() => (allCases = true)}>Показать все {cases.length} кейсов</button>
			{/if}
			<a class="btn btn-outline wide" href={channel}>Ещё кейсы в канале @falkov_agency</a>
		</div>
	</section>

	<!-- 6. Бесплатный тест -->
	<section id="test">
		<div class="wrap">
			<h2>Бесплатный тест сайта</h2>
			<ol class="steps">
				{#each steps as s, i}<li><span>{i + 1}</span>{s}</li>{/each}
			</ol>
			<div class="offer">
				<div>
					<h3>Покажем рост на вашем сайте до оплаты</h3>
					<p>Не увидим потенциала — скажем сразу.</p>
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


</main>

<footer>
	<div class="wrap">
		<b>ФАЛЬКОВ</b>
		<span>SEO-агентство · Санкт-Петербург, пр. Энергетиков, 10</span>
		<a href={tel}>{phone}</a>
		<a href={channel}>@falkov_agency</a>
	</div>
</footer>

<style>
	section { padding-top: 64px; }
	h2 { font-size: clamp(24px, 3vw, 32px); }
	.sub { color: var(--muted); margin-top: 6px; }
	.btn { border-radius: 8px; }

	.mbar { display: none; position: sticky; top: 0; z-index: 30; background: var(--blue); grid-template-columns: repeat(2, 1fr); }
	.mbar a { display: flex; align-items: center; justify-content: center; gap: 6px; color: #fff; font-weight: 600; font-size: 14px; padding: 12px 4px; }
	.mbar a + a { border-left: 1px solid rgb(255 255 255 / 0.25); }

	header { border-bottom: 1px solid var(--line); }
	.main { display: flex; align-items: center; gap: 20px; padding-top: 16px; padding-bottom: 14px; }
	.logo { display: flex; align-items: center; gap: 10px; }
	.mark { width: 42px; height: 42px; border: 5px solid var(--navy); background: var(--green); box-shadow: inset 0 0 0 4px #fff; }
	.logo b { display: block; color: var(--navy); font-size: 22px; font-weight: 800; line-height: 1; }
	.logo small { color: var(--navy); font-weight: 700; text-transform: uppercase; font-size: 12px; }
		.phone { color: var(--blue); font-size: 22px; font-weight: 700; white-space: nowrap; }
	.acts { margin-left: auto; display: flex; background: var(--blue); border-radius: 8px; padding: 4px; }
	.acts a { display: flex; gap: 8px; align-items: center; color: #fff; font-weight: 600; padding: 12px 18px; border-radius: 6px; }
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
	.nums div { display: grid; }
	.nums b { font-size: 34px; font-weight: 800; color: var(--navy); line-height: 1.1; }
	.nums span { color: var(--muted); font-size: 14px; }
	.logos { flex: 1 1 100%; display: flex; align-items: center; justify-content: space-between; gap: 24px 39px; flex-wrap: wrap; }
	.logos span { flex: 1 1 100%; color: var(--muted); font-size: 24px; }
	.logos img { height: 42px; width: auto; flex: none; }

	.ptable { margin-top: 24px; border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }
	.prow { display: grid; grid-template-columns: 110px 1.1fr 2fr 170px; gap: 20px; align-items: center; padding: 16px 20px; }
	.prow + .prow { border-top: 1px solid var(--line); }
	.prow img { max-height: 32px; max-width: 100px; width: auto; }
	.pname b { display: block; }
	.pname span { color: var(--muted); font-size: 14px; }
	.pq { display: flex; gap: 8px; flex-wrap: wrap; }
	.pq span { background: var(--soft-2); border: 1px solid var(--line); border-radius: 6px; padding: 5px 10px; font-size: 14px; }
	.ptop { text-align: right; }
	.ptop b { display: block; font-size: 28px; font-weight: 800; color: var(--blue); line-height: 1; }
	.ptop span { color: var(--muted); font-size: 13px; }

	.dirs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
	.dir { background: var(--soft); border-radius: 12px; padding: 22px; display: flex; flex-direction: column; gap: 6px; }
	.dn { color: var(--blue); font-weight: 800; font-size: 14px; }
	.dir h3 { font-size: 22px; }
	.dir small { color: var(--navy); font-weight: 600; }
	.dir p { color: var(--muted); margin-top: 4px; }
	.dir ul { margin: 6px 0 0; padding-left: 18px; display: grid; gap: 4px; }
	.dstat { margin-top: auto; padding-top: 14px; display: flex; align-items: baseline; gap: 10px; }
	.dstat b { font-size: 26px; font-weight: 800; color: var(--blue); white-space: nowrap; }
	.dstat span { color: var(--muted); font-size: 14px; }

	.h3 { font-size: 24px; margin-top: 44px; }
	.tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px; }
	.tabs button { font: inherit; font-weight: 600; cursor: pointer; border: 1px solid var(--line); background: #fff; color: inherit; border-radius: 8px; padding: 10px 14px; display: flex; gap: 8px; align-items: center; }
	.tabs button span { color: var(--muted); font-size: 13px; }
	.tabs button.on { background: var(--blue); border-color: var(--blue); color: #fff; }
	.tabs button.on span { color: rgb(255 255 255 / 0.75); }
	.gtext { color: var(--muted); margin-top: 14px; }
	.svc { margin-top: 14px; border: 1px solid var(--line); border-radius: 12px; display: grid; grid-template-columns: 1fr 1fr; overflow: hidden; }
	.srow { display: flex; gap: 16px; justify-content: space-between; padding: 16px 20px; border-top: 1px solid var(--line); }
	.srow:nth-child(-n + 2) { border-top: 0; }
	.srow:nth-child(odd) { border-right: 1px solid var(--line); }
	.srow b { display: block; }
	.srow span { color: var(--muted); font-size: 14px; }
	.sprice { text-align: right; flex: none; }
	.sprice b { color: var(--blue); white-space: nowrap; }
	.choose { margin-top: 24px; background: var(--soft); border-radius: 16px; padding: 28px; display: grid; gap: 10px; justify-items: start; }
	.choose h3 { font-size: 22px; }
	.choose p { color: var(--muted); max-width: 900px; }
	.choose .btn { margin-top: 6px; }

	.cases { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
	article { border: 1px solid var(--line); border-radius: 12px; padding: 20px; display: flex; flex-direction: column; gap: 10px; }
	.ctop { display: flex; justify-content: space-between; gap: 10px; font-size: 13px; color: var(--muted); }
	.ctag { color: var(--navy); font-weight: 600; }
	.cname { font-size: 15px; }
	.chead { display: grid; gap: 4px; }
	.big { font-size: 34px; font-weight: 800; color: var(--blue); line-height: 1; }
	.chead span { font-weight: 600; font-size: 17px; }
	article p { color: var(--muted); font-size: 15px; }
	.cstats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: auto; padding-top: 12px; border-top: 1px solid var(--line); }
	.cstats b { display: block; color: var(--navy); }
	.cstats span { color: var(--muted); font-size: 13px; }
	article img { width: 100%; border: 1px solid var(--line); border-radius: 8px; }
	.wide { width: 100%; margin-top: 16px; }
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
		.acts, nav span { display: none; }
		.phone { margin-left: auto; }
		.banner { grid-template-columns: 1fr; padding: 28px; }
		.prow { grid-template-columns: 90px 1fr 130px; }
		.pq { grid-column: 1 / -1; order: 3; }
		.cases, .dirs { grid-template-columns: 1fr 1fr; }
		.svc { grid-template-columns: 1fr; }
		.srow:nth-child(odd) { border-right: 0; }
		.srow:nth-child(2) { border-top: 1px solid var(--line); }
		.steps { grid-template-columns: 1fr 1fr; }
		.offer { grid-template-columns: 1fr; }
	}

	@media (max-width: 640px) {
		section { padding-top: 44px; }
		.mbar { display: grid; }
		nav { display: none; }
		.phone { font-size: 16px; }
		.banner { padding: 22px 18px; margin-top: 16px; gap: 24px; }
		.btxt p { font-size: 16px; }
		.nums { gap: 22px; }
		.nums b { font-size: 24px; }
		.prow { grid-template-columns: 1fr auto; gap: 10px; padding: 14px; }
		.prow img { display: none; }
		.ptop b { font-size: 24px; }
		.cases, .dirs, .steps { grid-template-columns: 1fr; }
		.srow { flex-direction: column; gap: 6px; padding: 14px; }
		.sprice { text-align: left; }
		.sprice b { display: inline; margin-right: 6px; }
		.choose { padding: 20px; }
		form { grid-template-columns: 1fr; }
		.offer { padding: 20px; }
		footer a:first-of-type { margin-left: 0; }
	}
</style>
