<script lang="ts">
	import { asset } from '$app/paths';
	import Icon from '#lib/components/Icon.svelte';

	// Лендинг SEO-агентства «Фальков». Стиль okonti.ru: белый фон, плоские синие кнопки, фото.
	// Логика: оффер + видео → клиенты (слайдер) → услуги → бесплатный старт → кейсы → Telegram-канал.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const a = (f: string) => asset(f as any);
	const pic = (f: string) => a(`/img/agency/${f}`);

	const tel = 'tel:+79939823204';
	const tg = 'https://t.me/falkov_marketing';
	const channel = 'https://t.me/falkov_agency';

	const nav = [
		['Услуги', '#services'],
		['Бесплатно', '#free'],
		['Кейсы', '#cases']
	];

	const logos = ['rosneft.svg', 'tatneft.svg', 'ekoniva.svg', 'korrus.svg', 'aravia.svg', 'psy-chat.svg', 'sotovik.svg'];

	const positions = [
		{ logo: 'ekoniva.svg', name: 'ЭкоНива-Техника', site: 'ekoniva-tekhnika.com', niche: 'Дилер сельхозтехники', top: 551, q: ['кормосмеситель', 'техника джон дир'] },
		{ logo: 'shinokoff.png', name: 'Шиномонтажникоф', site: 'shinokoff.ru', niche: 'Выездной автосервис', top: 230, q: ['шиномонтаж выездной', 'доставка бензина'] },
		{ logo: 'sotovik.svg', name: 'SOTOViK', site: 'spb.sotovik.shop', niche: 'Магазин электроники', top: 213, q: ['купить в спб айфон', 'купить макбук в спб'] },
		{ logo: 'korrus.svg', name: 'Коррус-Техникс', site: 'korrus.ru', niche: 'Дорожная техника', top: 154, q: ['каток бомаг', 'купить каток бомаг'] },
		{ logo: 'lodki-rf.png', name: 'Триера', site: 'lodki-rf.ru', niche: 'Производство лодок', top: 119, q: ['триера лодки', 'триера официальный сайт'] },
		{ logo: 'psy-chat.svg', name: 'Psy-Chat', site: 'psy-chat.ru', niche: 'Онлайн-психологи', top: 78, q: ['бесплатный онлайн психолог', 'психолог чат'] }
	];

	const cases = [
		{ img: '2318-1.jpg', post: 2318, big: '2 700', unit: 'посетителей в месяц с нуля', name: 'Юридические услуги' },
		{ img: '2259-1.jpg', post: 2259, big: 'ТОП-3', unit: 'по Москве за 5 месяцев', name: 'Арбитражный адвокат' },
		{ img: '2323-1.jpg', post: 2323, big: '+100', unit: 'посетителей каждый день', name: 'Магазин техники Apple' },
		{ img: '2272-1.jpg', post: 2272, big: 'ТОП-5', unit: 'по Москве', name: 'Ремонт трансформаторов' },
		{ img: '2273-1.jpg', post: 2273, big: '−40%', unit: 'мусорных лидов', name: 'Кухни на заказ' },
		{ img: '2322-1.jpg', post: 2322, big: 'ТОП', unit: 'в Google', name: 'Клиника наркологии' }
	];

	const services = [
		{
			name: 'SEO-аудит',
			lines: ['Техническое состояние и структура сайта', 'Спрос в нише, который сайт пока не собирает', 'План работ с приоритетами'],
			price: 'Бесплатно',
			more: true
		},
		{
			name: 'SEO-продвижение в Яндексе',
			lines: ['Структура и посадочные страницы под запросы', 'Коммерческие факторы, Вебмастер, Бизнес и Карты', 'Отчёт по позициям и заявкам'],
			price: 'от 70 000 ₽',
			more: false
		},
		{
			name: 'SEO-продвижение в Google',
			lines: ['Техническая чистота и скорость сайта', 'Ссылочный профиль и экспертность контента', 'Отчёт по позициям и заявкам'],
			price: 'от 90 000 ₽',
			more: false
		}
	];

	const free = [
		{ name: 'Бесплатный аудит', text: 'Проверяем техническое состояние, структуру и позиции сайта. Показываем, что мешает ему расти.' },
		{ name: 'Бесплатная консультация', text: 'Разбираем вашу воронку: сайт, рекламу, учёт заявок. Отвечаем на вопросы по маркетингу.' },
		{ name: 'Бесплатный поиск точек роста', text: 'Оцениваем спрос в нише и конкурентов. Называем канал трафика, который принесёт заявки: SEO, Директ или Telegram.' }
	];

	let allPos = $state(false);

	let video = $state<HTMLVideoElement>();
	let started = $state(false);
	const play = () => {
		started = true;
		video?.play();
	};

	let sent = $state(false);
	const submit = (e: SubmitEvent) => {
		e.preventDefault();
		sent = true; // TODO: отправка заявки в CRM / Telegram
	};
</script>

<svelte:head>
	<title>SEO-продвижение сайтов – агентство «Фальков»</title>
	<meta name="description" content="Выводим сайты в ТОП Яндекса и Google. Начинаем с бесплатного аудита: показываем результат до договора. 50+ кейсов в Telegram-канале." />
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
				<h1>SEO-продвижение сайтов</h1>
				<p>
					Выводим в ТОП
					<span class="se"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#fc3f1d" /><path fill="#fff" d="M13.6 19.5h2.3V4.5h-3.4c-3.4 0-5.2 1.7-5.2 4.3 0 2 .9 3.2 2.6 4.4l-3 6.3h2.5l3.3-6.9-1.1-.8c-1.4-.9-2-1.7-2-3.2 0-1.400.9-2.300 2.800-2.300h1.2z" /></svg>Яндекса</span>
					и
					<span class="se"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#fff" /><path fill="#4285f4" d="M19.6 12.2c0-.6 0-1.100-.100-1.600H12v3h4.300c-.2 1-.7 1.800-1.600 2.400v2h2.600c1.500-1.400 2.300-3.400 2.300-5.800z" /><path fill="#34a853" d="M12 20c2.200 0 4-.7 5.300-1.900l-2.600-2c-.7.5-1.600.8-2.700.8-2.100 0-3.800-1.400-4.500-3.300H4.900v2.100C6.200 18.300 8.900 20 12 20z" /><path fill="#fbbc05" d="M7.500 13.600c-.2-.5-.3-1-.3-1.600s.1-1.100.3-1.600V8.300H4.900C4.300 9.400 4 10.700 4 12s.3 2.600.9 3.700z" /><path fill="#ea4335" d="M12 7.200c1.200 0 2.200.4 3.100 1.200l2.300-2.300C16 4.800 14.200 4 12 4 8.900 4 6.200 5.700 4.900 8.300l2.600 2.100C8.200 8.600 9.900 7.200 12 7.200z" /></svg>Google.</span>
					Начинаем с бесплатного аудита и показываем результат до договора.
				</p>
				<div class="ctas">
					<a class="btn btn-white" href="#free">Получить бесплатный аудит</a>
					<a class="btn line" href="#cases">Смотреть кейсы</a>
				</div>
			</div>
			<figure>
				<figcaption><span class="sticker">О бесплатном аудите сайта</span><svg class="arr" viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 8c22 0 38 12 40 40" /><path d="M34 40l14 9 6-16" /></svg></figcaption>
				<div class="vid">
					<video bind:this={video} src={a('/video/podhod.mp4')} poster={a('/video/podhod.jpg')} controls={started} playsinline preload="none"></video>
					{#if !started}
						<button type="button" class="playbtn" onclick={play} aria-label="Смотреть видео о бесплатном аудите">
							<span><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="M8 5.500v13a1 1 0 0 0 1.500.900l11-6.500a1 1 0 0 0 0-1.800l-11-6.500A1 1 0 0 0 8 5.500z" /></svg></span>
						</button>
					{/if}
				</div>
			</figure>
		</div>
	</div>

	<!-- 2. Клиенты: слайдер логотипов -->
	<div class="wrap clients">
		<b>Среди клиентов:</b>
		<div class="marquee">
			<div class="track">
				{#each [0, 1] as copy}
					{#each logos as l}<img src={pic(l)} alt="" aria-hidden={copy === 1} />{/each}
				{/each}
			</div>
		</div>
	</div>

	<!-- 3. Услуги -->
	<section id="services">
		<div class="wrap">
			<h2>Наши услуги</h2>
			<div class="series">
				{#each services as sv}
					<div class="ser">
						<h3>{sv.name}</h3>
						<small>Что входит</small>
						<ul>{#each sv.lines as l}<li>{l}</li>{/each}</ul>
						<b class="price">{sv.price}</b>
						{#if sv.more}
							<a class="btn btn-primary" href="#free">Подробнее о SEO-аудите</a>
						{:else}
							<a class="btn btn-outline" href="#free">Начать с бесплатного аудита</a>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- 4. Бесплатный старт -->
	<section id="free">
		<div class="wrap">
			<h2>Попробуйте поработать с нами бесплатно</h2>
			<p class="sub">До договора разбираем ваш маркетинг и показываем, какой канал трафика даст заявки.</p>
			<div class="free">
				{#each free as f, i}
					<div class="fcard"><span>{i + 1}</span><h3>{f.name}</h3><p>{f.text}</p></div>
				{/each}
			</div>
			<div class="offer">
				<h3>Пришлите сайт, с него и начнём</h3>
				{#if sent}
					<p class="ok">Заявка принята. Ответим сегодня.</p>
				{:else}
					<form onsubmit={submit}>
						<input class="field" required placeholder="Адрес сайта" />
						<input class="field" required type="tel" placeholder="Телефон" />
						<button class="btn btn-primary" type="submit">Получить бесплатный аудит</button>
					</form>
				{/if}
			</div>
		</div>
	</section>

	<!-- 5. Кейсы: позиции с сайтами клиентов и посты из канала -->
	<section id="cases">
		<div class="wrap">
			<h2>Кейсы</h2>
			<div class="ptable" class:open={allPos}>
				{#each positions as p}
					<div class="prow">
						<img src={pic(p.logo)} alt={p.name} />
						<div class="pname"><b>{p.name}</b><span>{p.niche}</span><a href="https://{p.site}" target="_blank" rel="noopener">{p.site}</a></div>
						<div class="pq"><small>Введите в поиске</small>{#each p.q as q}<span>{q}</span>{/each}</div>
						<div class="ptop"><b>{p.top}</b><span>запросов в ТОП-5</span></div>
					</div>
				{/each}
			</div>
			{#if !allPos}
				<button type="button" class="btn btn-outline wide pmore" onclick={() => (allPos = true)}>Показать все {positions.length} проектов</button>
			{/if}
			<div class="cases">
				{#each cases as c}
					<a class="case" href="{channel}/{c.post}" target="_blank" rel="noopener">
						<img src={pic(c.img)} alt={c.name} loading="lazy" />
						<div>
							<b class="big">{c.big}</b>
							<span class="unit">{c.unit}</span>
							<h3>{c.name}</h3>
							<span class="more">Читать кейс в Telegram →</span>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- 6. Telegram-канал -->
	<section>
		<div class="wrap">
			<div class="tgband">
				<div class="tnums">
					<div><b>1 000+</b><span>подписчиков</span></div>
					<div><b>50+</b><span>кейсов</span></div>
				</div>
				<p>в нашем Telegram-канале. Разбираем проекты клиентов с цифрами и скриншотами.</p>
				<a class="btn btn-white" href={channel} target="_blank" rel="noopener">Подписаться на канал</a>
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
	section { scroll-margin-top: 8px; }
	.sub { color: var(--muted); margin-top: 6px; }
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
	.btxt p { font-size: 18px; }
	.se { white-space: nowrap; font-weight: 700; }
	.se svg { width: 22px; height: 22px; vertical-align: -5px; margin-right: 6px; }
	.ctas { display: flex; gap: 12px; flex-wrap: wrap; }
	.line { color: #fff; border: 2px solid #fff; background: none; }
	figure { margin: 0; }
	.vid { position: relative; }
	.playbtn { position: absolute; inset: 0; border: 0; background: none; cursor: pointer; display: grid; place-items: center; border-radius: 10px; }
	.playbtn span { width: 132px; height: 132px; border-radius: 50%; background: rgb(229 25 125 / 0.4); border: 4px solid rgb(255 255 255 / 0.85); display: grid; place-items: center; transition: background 0.15s, transform 0.15s; }
	.playbtn:hover span { background: rgb(229 25 125 / 0.8); transform: scale(1.06); }
	.playbtn svg { width: 64px; height: 64px; margin-left: 6px; }
	video { width: 100%; aspect-ratio: 640 / 350; display: block; border-radius: 10px; background: #000; }
	figcaption { position: relative; z-index: 2; display: flex; align-items: center; gap: 12px; margin-bottom: -14px; padding-left: 14px; font-weight: 700; font-size: 20px; }
	.sticker { background: var(--pink); padding: 10px 18px; border-radius: 8px; transform: rotate(-4deg); box-shadow: 0 6px 18px rgb(0 0 0 / 0.3); }
	.arr { width: 40px; height: 40px; flex: none; transform: translateY(-6px); }

	.clients { display: flex; align-items: center; gap: 28px; padding-top: 28px; }
	.clients b { flex: none; color: var(--navy); font-size: 22px; }
	.marquee { flex: 1; min-width: 0; overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); }
	.track { display: flex; align-items: center; width: max-content; animation: slide 30s linear infinite; }
	.marquee:hover .track { animation-play-state: paused; }
	.track img { height: 42px; width: auto; flex: none; margin-right: 56px; }
	@keyframes slide { to { transform: translateX(-50%); } }
	@media (prefers-reduced-motion: reduce) { .track { animation: none; } .marquee { overflow-x: auto; } }

	.ptable { margin-top: 24px; border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }
	.prow { display: grid; grid-template-columns: 110px 1.1fr 2fr 170px; gap: 20px; align-items: center; padding: 16px 20px; }
	.prow + .prow { border-top: 1px solid var(--line); }
	.prow img { max-height: 32px; max-width: 100px; width: auto; }
	.pmore { display: none; }
	.pname b { display: block; }
	.pname span { display: block; color: var(--muted); font-size: 14px; }
	.pname a { color: var(--blue); font-size: 14px; }
	.pname a:hover { text-decoration: underline; }
	.pq { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
	.pq small { flex: 1 1 100%; color: var(--muted); font-size: 13px; font-weight: 600; }
	.pq span { background: var(--soft-2); border: 1px solid var(--line); border-radius: 6px; padding: 5px 10px; font-size: 14px; }
	.ptop { text-align: right; }
	.ptop b { display: block; font-size: 28px; font-weight: 800; color: var(--blue); line-height: 1; }
	.ptop span { color: var(--muted); font-size: 13px; }

	.cases { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
	.case { display: block; border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }
	.case:hover { border-color: var(--blue); }
	.case img { width: 100%; aspect-ratio: 3 / 2; object-fit: cover; object-position: top; border-bottom: 1px solid var(--line); }
	.case div { padding: 16px 18px 18px; }
	.big { font-size: 34px; font-weight: 800; color: var(--blue); line-height: 1; margin-right: 8px; }
	.unit { color: var(--muted); }
	.case h3 { margin-top: 8px; font-size: 17px; }
	.more { display: block; margin-top: 8px; color: var(--blue); font-weight: 600; font-size: 14px; }
	.wide { width: 100%; margin-top: 16px; }

	.series { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
	.ser { background: #e8eefa; border-radius: 12px; padding: 24px; display: flex; flex-direction: column; gap: 8px; }
	.ser h3 { font-size: 22px; }
	.ser small { color: var(--muted); font-weight: 700; margin-top: 4px; }
	.ser ul { margin: 0; padding-left: 18px; display: grid; gap: 6px; }
	.price { margin-top: auto; padding-top: 14px; font-size: 28px; font-weight: 800; color: var(--navy); }
	.ser .btn { margin-top: 6px; }
	.ser .btn-outline { background: #fff; }

	.free { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
	.fcard { border: 1px solid var(--line); border-radius: 12px; padding: 22px; display: grid; gap: 8px; align-content: start; }
	.fcard span { width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--green); color: var(--green); font-weight: 700; display: grid; place-items: center; }
	.fcard h3 { font-size: 20px; }
	.fcard p { color: var(--muted); }

	.tgband { background: var(--navy); color: #fff; border-radius: 16px; padding: 36px 44px; display: flex; align-items: center; gap: 36px; }
	.tnums { display: flex; gap: 36px; flex: none; }
	.tnums div { display: grid; }
	.tnums b { font-size: 44px; font-weight: 800; line-height: 1; }
	.tnums span { opacity: 0.85; margin-top: 4px; }
	.tgband p { font-size: 18px; opacity: 0.9; }
	.tgband .btn { flex: none; margin-left: auto; }
	button.wide { font: inherit; font-weight: 600; cursor: pointer; }

	.offer { margin-top: 16px; background: var(--soft); border-radius: 16px; padding: 32px; display: grid; grid-template-columns: 1fr 1.6fr; gap: 32px; align-items: center; }
	.offer h3 { font-size: 24px; font-weight: 700; }
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
		.tgband { flex-wrap: wrap; padding: 28px; gap: 20px; }
		.tgband .btn { margin-left: 0; }
		.offer { grid-template-columns: 1fr; }
	}

	@media (max-width: 640px) {
		section { padding-top: 44px; }
		.mbar { display: grid; }
		.acts { display: none; }
		nav { gap: 20px; overflow-x: auto; scrollbar-width: none; white-space: nowrap; font-size: 15px; padding-bottom: 12px; }
		section { scroll-margin-top: 62px; }
		.banner { padding: 22px 18px; margin-top: 16px; gap: 24px; }
		.btxt p { font-size: 16px; }
		figcaption { font-size: 16px; padding-left: 8px; }
		.sticker { padding: 8px 14px; }
		.arr { width: 32px; height: 32px; }
		.playbtn span { width: 96px; height: 96px; }
		.playbtn svg { width: 46px; height: 46px; }
		.clients { display: grid; gap: 14px; padding-top: 22px; }
		.track img { height: 34px; margin-right: 36px; }
		.prow { grid-template-columns: 1fr auto; gap: 10px; padding: 14px; }
		.prow img { display: none; }
		.ptable:not(.open) .prow:nth-child(n + 4) { display: none; }
		.pmore { display: flex; }
		.ptop b { font-size: 24px; }
		.cases, .series, .free { grid-template-columns: 1fr; }
		.tgband { padding: 22px 18px; }
		.tnums b { font-size: 36px; }
		.tgband .btn { width: 100%; }
		form { grid-template-columns: 1fr; }
		.offer { padding: 20px; }
		footer a:first-of-type { margin-left: 0; }
	}
</style>
