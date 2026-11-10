<script lang="ts">
	import { asset } from '$app/paths';
	import Icon from '#lib/components/Icon.svelte';

	// Продающий лендинг агентства «Фальков». Воронка: обещание → боль → оффер (бесплатный тест) →
	// видео руководителя → доказательства → цены → гарантии → офис → заявка.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const a = (f: string) => asset(f as any);

	const phone = '+7 993 982-32-04';
	const tel = 'tel:+79939823204';
	const tg = 'https://t.me/falkov_marketing';
	const channel = 'https://t.me/falkov_agency';

	const pains = [
		'Полгода платите агентству, а заявок как не было',
		'Отчёты на 20 страниц, из которых непонятно, сколько стоит клиент',
		'Директ съедает бюджет, а звонят не те',
		'Сайт, домен и кабинеты оформлены на подрядчика'
	];

	const steps = [
		['Слушаем', 'Разбираемся, принесёт ли SEO результат именно вам. Если нет — скажем сразу.'],
		['Собираем спрос', 'Сотни коммерческих запросов, по которым вас реально ищут.'],
		['Фиксируем точку А', 'Где сайт стоит сейчас по каждому запросу.'],
		['Выводим в ТОП', 'Показываем рост на живой выдаче — до договора.'],
		['Решаете вы', 'План, сроки и гарантии. Не убедили — расходимся друзьями.']
	];

	const cases = [
		{ img: '2318-1.jpg', big: '2 700', unit: 'посетителей в месяц с нуля', name: 'Юридические услуги', how: 'Протестировали три сайта клиента и вложились в тот, что показал рост.' },
		{ img: '2259-1.jpg', big: 'ТОП-3', unit: 'по Москве за 5 месяцев', name: 'Арбитражный адвокат', how: 'Переписали сайт с «защиты интересов» на язык рисков финдиректора.' },
		{ img: '2323-1.jpg', big: '+100', unit: 'посетителей каждый день', name: 'Магазин техники Apple', how: 'Зашли не в «купить айфон», а в «в рассрочку» — там нет конкурентов.' }
	];

	const prices = [
		{ name: 'SEO-продвижение', price: 'от 50 000 ₽', per: 'в месяц', points: ['Семантика и структура', 'Тексты и посадочные', 'Первая динамика за 1–2 месяца'] },
		{ name: 'Яндекс Директ', price: '% от прибыли', per: 'без абонентки', points: ['Поиск, РСЯ, ретаргетинг', 'Лид от 100–150 ₽ в юруслугах', 'Окупаемость до ×10'], hot: true },
		{ name: 'Маркетинг под ключ', price: 'от 50 000 ₽', per: 'в месяц', points: ['Сайт, SEO, реклама, CRM', 'Один отчёт: цена заявки по каналам', 'Можно за % с выручки'] }
	];

	const guarantees = [
		['Рост — до оплаты', 'Бесплатный тест на вашем сайте до договора'],
		['Доступы ваши', 'Сайт, домен, Метрика и кабинеты оформлены на вас'],
		['Цифры проверяемы', 'Позиции видно руками в любой день'],
		['Берём не всех', 'Если канал не окупится — честно откажем']
	];

	const logos = ['rosneft.svg', 'tatneft.svg', 'ekoniva.svg', 'korrus.svg', 'aravia.svg', 'psy-chat.svg', 'sotovik.svg', 'lodki-rf.png'];

	let sent = $state(false);
	const submit = (e: SubmitEvent) => {
		e.preventDefault();
		sent = true; // TODO: отправка заявки в CRM / Telegram
	};
</script>

<svelte:head>
	<title>Маркетинговое агентство в Санкт-Петербурге — рост до договора | Фальков</title>
	<meta name="description" content="Приводим заявки из SEO, Яндекс Директа и Telegram Ads. Показываем рост на вашем сайте бесплатно — до договора. Офис на Энергетиков, 10." />
</svelte:head>

{#snippet leadForm(dark = false)}
	{#if sent}
		<div class="form done" class:dark><Icon name="check" size={36} /><b>Заявка принята</b><span>Роман напишет вам сегодня</span></div>
	{:else}
		<form class="form" class:dark onsubmit={submit}>
			<input class="field" required placeholder="Адрес сайта" />
			<input class="field" required type="tel" placeholder="Телефон или @telegram" />
			<button class="btn cta" type="submit">Получить бесплатный тест →</button>
			<small>Ответим в течение дня. Ни к чему не обязывает.</small>
		</form>
	{/if}
{/snippet}

<header>
	<div class="wrap hd">
		<a class="logo" href="#top"><span class="mark">Ф</span>ФАЛЬКОВ<small>маркетинг · СПб</small></a>
		<a class="phone" href={tel}>{phone}</a>
		<a class="btn tgbtn" href={tg}><Icon name="send" size={18} />Написать в Telegram</a>
	</div>
</header>

<main id="top">
	<!-- 1. Обещание + форма в первом экране -->
	<section class="hero">
		<div class="wrap hgrid">
			<div>
				<span class="kicker">Маркетинговое агентство · Санкт-Петербург</span>
				<h1>Покажем рост заявок<br /><mark>до того, как вы заплатите</mark></h1>
				<p class="lead">Приводим клиентов малому и среднему бизнесу из <b>SEO</b>, <b>Яндекс Директа</b> и <b>Telegram Ads</b>. Начинаем с бесплатного теста на вашем сайте.</p>
				<ul class="nums">
					<li><b>45+</b>кейсов</li>
					<li><b>1–2 мес</b>до результата</li>
					<li><b>×10</b>окупаемость</li>
				</ul>
			</div>
			<div class="hform">
				<h2>Бесплатный тест сайта</h2>
				<p>Покажем, сколько заявок вы недополучаете и как их забрать</p>
				{@render leadForm()}
			</div>
		</div>
	</section>

	<div class="logos wrap">
		<span>Нам доверяют:</span>
		{#each logos as l}<img src={a(`/img/agency/${l}`)} alt="" loading="lazy" />{/each}
	</div>

	<!-- 2. Боль -->
	<section class="pain">
		<div class="wrap">
			<h2>Узнаёте себя?</h2>
			<div class="pgrid">
				{#each pains as p}<div class="pcard"><span>✕</span>{p}</div>{/each}
			</div>
			<p class="turn">Схема «полгода что-то делаем, вот отчётик, платите дальше» — не наша. <b>Мы сначала показываем результат.</b></p>
		</div>
	</section>

	<!-- 3. Оффер -->
	<section class="offer">
		<div class="wrap">
			<span class="kicker dark">Вместо коммерческого предложения</span>
			<h2>Бесплатный тест: рост на вашем сайте до договора</h2>
			<ol>
				{#each steps as [t, d], i}<li><span class="n">{i + 1}</span><b>{t}</b><p>{d}</p></li>{/each}
			</ol>
			<a class="btn cta big" href="#lead">Отправить сайт на тест →</a>
		</div>
	</section>

	<!-- 4. Видео руководителя -->
	<section class="video">
		<div class="wrap vgrid">
			<div class="player">
				<video src={a('/video/podhod.mp4')} poster={a('/video/podhod.jpg')} controls playsinline preload="none"></video>
			</div>
			<div>
				<span class="kicker">2,5 минуты без воды</span>
				<h2>Руководитель агентства — о том, как устроен тест</h2>
				<p>Что мы успеваем показать до договора, и по каким признакам видно, что проект выстрелит.</p>
				<a class="btn ghost" href={channel}><Icon name="send" size={18} />Канал агентства — 40+ кейсов</a>
			</div>
		</div>
	</section>

	<!-- 5. Доказательства -->
	<section class="cases">
		<div class="wrap">
			<h2>Результаты, которые можно проверить</h2>
			<div class="cgrid">
				{#each cases as c}
					<article>
						<div class="res"><b>{c.big}</b><span>{c.unit}</span></div>
						<img src={a(`/img/agency/${c.img}`)} alt={c.name} loading="lazy" />
						<h3>{c.name}</h3>
						<p>{c.how}</p>
					</article>
				{/each}
			</div>
			<a class="more" href={channel}>Ещё 40+ кейсов в канале @falkov_agency →</a>
		</div>
	</section>

	<!-- 6. Цены -->
	<section class="prices">
		<div class="wrap">
			<h2>Сколько стоит</h2>
			<div class="prgrid">
				{#each prices as p}
					<div class="pr" class:hot={p.hot}>
						{#if p.hot}<span class="flag">Платите из результата</span>{/if}
						<h3>{p.name}</h3>
						<b class="price">{p.price}</b><span class="per">{p.per}</span>
						<ul>{#each p.points as pt}<li><Icon name="check" size={18} />{pt}</li>{/each}</ul>
						<a class="btn {p.hot ? 'cta' : 'blue'}" href="#lead">Начать с бесплатного теста</a>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- 7. Гарантии -->
	<section class="guar">
		<div class="wrap">
			<h2>Что фиксируем в договоре</h2>
			<div class="ggrid">
				{#each guarantees as [t, d]}<div><Icon name="shield" size={34} /><b>{t}</b><p>{d}</p></div>{/each}
			</div>
		</div>
	</section>

	<!-- 8. Офис -->
	<section class="office">
		<div class="wrap ogrid">
			<img src={a('/img/agency/2354-2.jpg')} alt="Офис агентства в Санкт-Петербурге" />
			<div>
				<span class="kicker dark">Работаем лично</span>
				<h2>Приезжайте в офис — покажем кейсы с экрана</h2>
				<p>Ничто не продаёт лучше разговора с глазу на глаз: расскажем про кейс и тут же откроем его внутрянку.</p>
				<p class="addr"><Icon name="factory" size={22} />Санкт-Петербург, пр. Энергетиков, 10<br /><small>Напишите за день до приезда</small></p>
				<img class="team" src={a('/img/agency/2349-1.jpg')} alt="Основатель агентства с клиентами" />
			</div>
		</div>
	</section>

	<!-- 9. Финальная заявка -->
	<section class="final" id="lead">
		<div class="wrap fgrid">
			<div>
				<h2>Отправьте сайт — <mark>покажем рост бесплатно</mark></h2>
				<p>Если увидим, что канал не окупится, скажем сразу. Это дешевле, чем год бесполезной работы.</p>
				<div class="alt">
					<a href={tel}><Icon name="phone" size={20} />{phone}</a>
					<a href={tg}><Icon name="send" size={20} />@falkov_marketing</a>
				</div>
			</div>
			{@render leadForm(true)}
		</div>
	</section>
</main>

<footer><div class="wrap">© 2026 Фальков · маркетинговое агентство · Санкт-Петербург, пр. Энергетиков, 10</div></footer>

<a class="sticky" href="#lead">Бесплатный тест сайта →</a>

<style>
	.wrap { max-width: 1200px; }
	h2 { font-size: clamp(28px, 4vw, 46px); font-weight: 800; letter-spacing: -0.02em; }
	mark { background: #ffe500; color: #0a0f2c; padding: 0 8px; border-radius: 6px; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
	.kicker { display: inline-block; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #ffe500; margin-bottom: 14px; }
	.kicker.dark { color: var(--pink); }
	section { padding: 80px 0; }
	.btn.cta { background: var(--pink); color: #fff; font-weight: 800; box-shadow: 0 10px 30px rgb(229 25 125 / 0.45); }
	.btn.cta:hover { background: #c8126a; }
	.btn.big { min-height: 64px; font-size: 19px; padding: 0 40px; }
	.btn.blue { background: var(--blue); color: #fff; }
	.btn.ghost { background: transparent; color: #fff; box-shadow: inset 0 0 0 2px #fff; }

	header { position: sticky; top: 0; z-index: 30; background: #0a0f2c; color: #fff; }
	.hd { display: flex; align-items: center; gap: 24px; padding-top: 12px; padding-bottom: 12px; }
	.logo { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 20px; }
	.logo small { font-weight: 500; font-size: 13px; opacity: 0.6; }
	.mark { width: 36px; height: 36px; border-radius: 8px; background: var(--pink); display: grid; place-items: center; }
	.phone { margin-left: auto; font-weight: 700; font-size: 18px; }
	.tgbtn { background: var(--blue); color: #fff; min-height: 44px; }

	.hero { background: radial-gradient(circle at 80% 20%, #1d4fe0 0, #0a0f2c 60%); color: #fff; padding: 72px 0 80px; }
	.hgrid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 56px; align-items: center; }
	h1 { font-size: clamp(36px, 5.4vw, 68px); font-weight: 900; letter-spacing: -0.03em; line-height: 1.05; }
	.lead { font-size: 20px; opacity: 0.88; margin-top: 24px; max-width: 620px; }
	.nums { list-style: none; padding: 0; margin: 36px 0 0; display: flex; gap: 40px; }
	.nums li { display: grid; font-size: 14px; opacity: 0.85; }
	.nums b { font-size: 40px; font-weight: 900; color: #ffe500; line-height: 1; }
	.hform { background: #fff; color: var(--text); border-radius: 22px; padding: 30px; box-shadow: 0 30px 80px rgb(0 0 0 / 0.4); }
	.hform h2 { font-size: 26px; }
	.hform > p { color: var(--muted); margin: 8px 0 18px; }
	.form { display: grid; gap: 12px; }
	.form .btn { min-height: 58px; font-size: 17px; }
	.form small { color: var(--muted); font-size: 12px; text-align: center; }
	.done { justify-items: center; text-align: center; padding: 24px; color: var(--text); }
	.done :global(svg) { color: var(--green); }
	.form.dark small, .done.dark { color: #fff; }

	.logos { display: flex; align-items: center; gap: 32px; padding-top: 28px; padding-bottom: 28px; overflow-x: auto; scrollbar-width: none; }
	.logos span { color: var(--muted); font-weight: 600; white-space: nowrap; }
	.logos img { height: 28px; width: auto; flex: none; filter: grayscale(1); opacity: 0.7; }

	.pain { background: #fff1f7; }
	.pgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 32px; }
	.pcard { background: #fff; border-radius: 16px; padding: 24px; font-size: 19px; font-weight: 600; display: flex; gap: 16px; align-items: center; border-left: 6px solid var(--pink); }
	.pcard span { flex: none; width: 36px; height: 36px; border-radius: 50%; background: var(--pink); color: #fff; display: grid; place-items: center; font-weight: 900; }
	.turn { margin-top: 32px; font-size: 21px; max-width: 860px; }
	.turn b { background: #ffe500; padding: 0 6px; }

	.offer ol { list-style: none; padding: 0; margin: 40px 0; display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; counter-reset: x; }
	.offer li { background: var(--soft); border-radius: 18px; padding: 24px 20px; position: relative; }
	.offer .n { display: grid; place-items: center; width: 48px; height: 48px; border-radius: 50%; background: var(--blue); color: #fff; font-weight: 900; font-size: 22px; margin-bottom: 14px; }
	.offer li b { font-size: 18px; display: block; margin-bottom: 6px; }
	.offer li p { color: var(--muted); font-size: 15px; }

	.video { background: #0a0f2c; color: #fff; }
	.vgrid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 48px; align-items: center; }
	.player { border-radius: 20px; overflow: hidden; box-shadow: 0 0 0 4px var(--pink), 0 30px 80px rgb(229 25 125 / 0.3); background: #000; }
	video { width: 100%; aspect-ratio: 640 / 350; display: block; }
	.vgrid p { opacity: 0.85; font-size: 18px; margin: 16px 0 24px; }

	.cgrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 36px; }
	article { border-radius: 20px; overflow: hidden; background: #fff; box-shadow: 0 6px 30px rgb(0 30 80 / 0.1); }
	.res { background: var(--blue); color: #fff; padding: 22px 24px; }
	.res b { display: block; font-size: 46px; font-weight: 900; line-height: 1; color: #ffe500; }
	.res span { font-weight: 600; }
	article img { width: 100%; aspect-ratio: 3 / 2; object-fit: cover; }
	article h3 { padding: 18px 24px 4px; font-size: 20px; }
	article p { padding: 0 24px 24px; color: var(--muted); }
	.more { display: inline-block; margin-top: 24px; font-weight: 700; color: var(--blue); font-size: 18px; }

	.prices { background: var(--soft-2); }
	.prgrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 36px; align-items: stretch; }
	.pr { background: #fff; border-radius: 22px; padding: 30px; display: flex; flex-direction: column; gap: 6px; position: relative; border: 2px solid var(--line); }
	.pr.hot { border-color: var(--pink); transform: scale(1.03); box-shadow: 0 20px 50px rgb(229 25 125 / 0.2); }
	.flag { position: absolute; top: -14px; left: 30px; background: var(--pink); color: #fff; font-size: 13px; font-weight: 800; padding: 5px 12px; border-radius: 8px; }
	.price { font-size: 34px; font-weight: 900; color: var(--navy); margin-top: 8px; }
	.per { color: var(--muted); }
	.pr ul { list-style: none; padding: 0; margin: 18px 0 24px; display: grid; gap: 10px; flex: 1; }
	.pr li { display: flex; gap: 10px; }
	.pr li :global(svg) { color: var(--green); flex: none; }

	.ggrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 36px; }
	.ggrid div { display: grid; gap: 8px; align-content: start; }
	.ggrid :global(svg) { color: var(--blue); }
	.ggrid b { font-size: 19px; }
	.ggrid p { color: var(--muted); }

	.office { background: #fff8cc; }
	.ogrid { display: grid; grid-template-columns: 420px 1fr; gap: 48px; align-items: center; }
	.ogrid > img { width: 100%; height: auto; border-radius: 22px; box-shadow: 0 20px 60px rgb(0 0 0 / 0.2); }
	.ogrid p { font-size: 18px; margin-top: 16px; }
	.addr { display: flex; gap: 12px; font-weight: 700; }
	.addr small { font-weight: 400; color: var(--muted); }
	.team { width: 100%; height: auto; border-radius: 16px; margin-top: 24px; }

	.final { background: linear-gradient(135deg, var(--blue), #0a0f2c); color: #fff; }
	.fgrid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 48px; align-items: center; }
	.fgrid p { font-size: 19px; opacity: 0.9; margin-top: 18px; }
	.alt { display: flex; gap: 24px; flex-wrap: wrap; margin-top: 24px; }
	.alt a { display: inline-flex; gap: 8px; align-items: center; font-weight: 700; font-size: 18px; }
	.form.dark { background: rgb(255 255 255 / 0.08); padding: 26px; border-radius: 20px; }

	footer { background: #0a0f2c; color: #8b93b8; font-size: 14px; padding: 24px 0 90px; }
	.sticky { display: none; }

	@media (max-width: 980px) {
		.hgrid, .vgrid, .fgrid, .ogrid { grid-template-columns: 1fr; gap: 32px; }
		.ogrid > img { max-width: 420px; margin: 0 auto; }
		.offer ol { grid-template-columns: 1fr 1fr; }
		.cgrid, .prgrid { grid-template-columns: 1fr; }
		.pr.hot { transform: none; }
		.ggrid { grid-template-columns: 1fr 1fr; }
	}

	@media (max-width: 640px) {
		section { padding: 52px 0; }
		.hero { padding: 36px 0 48px; }
		.tgbtn, .logo small { display: none; }
		.phone { font-size: 15px; }
		.lead { font-size: 17px; }
		.nums { gap: 20px; }
		.nums b { font-size: 28px; }
		.hform { padding: 20px; }
		.pgrid, .offer ol, .ggrid { grid-template-columns: 1fr; }
		.pcard { font-size: 16px; padding: 18px; }
		.turn { font-size: 18px; }
		.btn.big { width: 100%; font-size: 17px; }
		.sticky { display: block; position: fixed; left: 12px; right: 12px; bottom: 12px; z-index: 40; background: var(--pink); color: #fff; font-weight: 800; text-align: center; padding: 16px; border-radius: 14px; box-shadow: 0 10px 30px rgb(229 25 125 / 0.5); }
	}
</style>
