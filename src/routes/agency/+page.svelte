<script lang="ts">
	import { asset } from '$app/paths';
	import Icon from '#lib/components/Icon.svelte';

	// Лендинг агентства «Фальков»: блоки и дизайн okonti.ru, контент marketingovoe-agentstvo-spb.ru
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const a = (f: string) => asset(`/img/agency/${f}` as any);

	const phone = '+7 993 982-32-04';
	const tel = 'tel:+79939823204';
	const tg = 'https://t.me/falkov_marketing';
	const channel = 'https://t.me/falkov_agency';

	const nav = ['Услуги', 'Кейсы', 'Как работаем', 'Форматы', 'Сроки', 'Контакты'];
	const navId = ['services', 'cases', 'how', 'formats', 'terms', 'lead'];

	const services = [
		{ name: 'SEO-продвижение', text: 'Поиск, структура, тексты, ссылки. Ведём до позиций и заявок.', photo: '2339-1.jpg' },
		{ name: 'Яндекс Директ', text: 'Один платёж на старте, дальше — процент от прибыли.', photo: '2342-1.jpg' },
		{ name: 'Разработка сайтов', text: 'Сайты и магазины, сразу собранные под рекламу и поиск.', photo: '2354-2.jpg' },
		{ name: 'Маркетинг под ключ', text: 'Сайт, поиск, реклама и аналитика в одной команде.', photo: '2349-1.jpg' }
	];

	const extra = [
		{ icon: 'send', name: 'Telegram Ads', text: 'Закупка, посевы и контент. 7 клиентских каналов на ведении.' },
		{ icon: 'calc', name: 'CRM', text: 'Все заявки в одной системе, у каждой сделки виден источник.' },
		{ icon: 'chat', name: 'Email', text: 'Рассылки по своей базе: дожимаем заявки и возвращаем клиентов.' },
		{ icon: 'search', name: 'Продвижение в нейросетях', text: 'Готовим сайт к ответам Алисы и ChatGPT.' }
	];

	const facts = [
		{ icon: 'image', big: '45+', text: 'кейсов в разных нишах' },
		{ icon: 'clock', big: '1–2 месяца', text: 'до первых ощутимых результатов' },
		{ icon: 'search', big: '180 000', text: 'частотность запросов в ТОП на одном проекте' },
		{ icon: 'calc', big: '×10', text: 'окупаемость на контексте' },
		{ icon: 'factory', big: 'Офис в СПб', text: 'пр. Энергетиков, 10 — встречаемся лично' }
	];

	const formats = [
		{ series: 'Один канал', name: 'SEO-оптимизация', tone: '#FDEAF3', tag: '50 направлений', text: 'Коммерческие запросы в ТОП Яндекса и Google. Первая динамика за 1–2 месяца.', price: 'от 50 000 ₽/мес' },
		{ series: 'Один канал', name: 'Контекстная реклама', tone: '#FDEAF3', tag: 'Директ, Telegram Ads', text: 'Лид по юруслугам в Петербурге — 100–150 ₽. Окупаемость до ×10.', price: '% от прибыли' },
		{ series: 'С нуля', name: 'Разработка сайта', tone: '#E8EEFA', tag: 'Сайты, лендинги, CRM', text: 'Структура под реальный спрос, дизайн, CMS, интеграции с CRM.', price: 'Обсуждаем после теста' },
		{ series: 'Под ключ', name: 'Комплекс', tone: '#E8EEFA', tag: 'Всё в одних руках', text: 'Сайт, поиск, реклама, аналитика и один отчёт с ценой заявки по каналам.', price: 'от 50 000 ₽/мес' },
		{ series: 'Партнёрство', name: 'Работа за выручку', tone: '#EEF7E4', tag: 'Процент вместо абонемента', text: 'Для проектов, где уверены в результате: берём процент с выручки.', price: '% с выручки' }
	];

	const steps = [
		{ t: 'Сначала слушаем', d: 'Понимаем, принесёт ли SEO результат. Если нет — скажем сразу' },
		{ t: 'Погружаемся в бизнес', d: 'Собираем ядро: сотни коммерческих ключей с частотностью' },
		{ t: 'Делаем снимок', d: 'Фиксируем позиции сайта по каждому запросу' },
		{ t: 'Выводим в ТОП', d: 'Показываем рост на живой выдаче — до договора' },
		{ t: 'Подводим итоги', d: 'План на несколько месяцев и гарантии. Решение за вами' }
	];

	const cases = [
		{ photo: '2318-1.jpg', niche: 'Юриспруденция', big: '2 700', unit: 'посетителей в месяц с нуля', name: 'Юридические услуги', text: 'Клиент пришёл с тремя сайтами. Протестировали каждый, в работу взяли тот, что показал рост.' },
		{ photo: '2323-1.jpg', niche: 'Интернет-магазин', big: '+100', unit: 'уникальных посетителей ежедневно', name: 'Магазин техники Apple', text: 'Не полезли в «купить айфон», зашли через «в рассрочку» и «в кредит» — конкуренции почти нет.' },
		{ photo: '2259-1.jpg', niche: 'Юриспруденция · Москва', big: 'ТОП-3', unit: 'по Москве за 5 месяцев', name: 'Арбитражный адвокат', text: 'Переписали сайт с языка «защиты интересов» на язык рисков, понятный финдиректору.' },
		{ photo: '2272-1.jpg', niche: 'B2B · Москва', big: 'ТОП-5', unit: 'по Москве', name: 'Ремонт трансформаторов', text: 'Здесь ищут не «ремонт трансформаторов», а «замена бумажно-масляной изоляции».' },
		{ photo: '2273-1.jpg', niche: 'Мебель · Москва', big: '−40%', unit: 'мусорных лидов', name: 'Студия кухонь на заказ', text: 'Под коммерческий запрос вставала статья. Развернули приоритеты — конверсия выправилась.' },
		{ photo: '2322-1.jpg', niche: 'Медицина', big: 'Google', unit: 'выстрелил вместо Яндекса', name: 'Клиника наркологии', text: 'Правили сайт под Яндекс, а выстрелил Google — и это оказалось лучшим, что могло случиться.' }
	];

	const logos = ['rosneft.svg', 'tatneft.svg', 'ekoniva.svg', 'korrus.svg', 'aravia.svg', 'psy-chat.svg', 'kalispera.png', 'sotovik.svg', 'shinokoff.png', 'lodki-rf.png'];

	const terms = [
		{ when: '3–7 дней', what: 'Контекст', d: 'Первые заявки с первой недели' },
		{ when: '1–2 недели', what: 'Telegram Ads', d: 'Модерация и первые открутки' },
		{ when: '1–2 месяца', what: 'SEO, первые движения', d: 'Растёт видимость по низкочастотке' },
		{ when: '4–6 месяцев', what: 'SEO, ощутимый трафик', d: 'Коммерческие запросы в ТОП-10' },
		{ when: 'от 8 месяцев', what: 'Конкурентные ниши', d: 'Стоматология, окна, юристы' }
	];

	const principles = [
		{ t: 'Результат раньше договора', d: 'Сначала бесплатный тест и рост на живой выдаче, потом подписи.' },
		{ t: 'Берём не все проекты', d: 'Если канал не окупится, честно откажемся.' },
		{ t: 'Доступы остаются у вас', d: 'Сайт, домен, Метрика и кабинеты оформлены на вас.' },
		{ t: 'Отчёт с проверяемыми цифрами', d: 'Позиции можно проверить руками в любой день.' }
	];

	let sent = $state(false);
</script>

<svelte:head>
	<title>Маркетинговое агентство в Санкт-Петербурге — интернет-маркетинг под ключ | Фальков</title>
	<meta
		name="description"
		content="Приводим клиентов малому и среднему бизнесу из SEO, Яндекс Директа и Telegram Ads. Бесплатный тест до договора. Офис на Энергетиков, 10."
	/>
</svelte:head>

<div class="mbar">
	<a href="#lead"><Icon name="calc" size={18} />Тест</a>
	<a href={tel}><Icon name="phone" size={18} />Позвонить</a>
	<a href={tg}><Icon name="chat" size={18} />Написать</a>
</div>

<header>
	<div class="top wrap">
		{#each nav.slice(1) as n, i}<a href="#{navId[i + 1]}">{n}</a>{/each}
		<span class="r"><Icon name="factory" size={16} />пр. Энергетиков, 10</span>
		<span><Icon name="clock" size={16} />Санкт-Петербург</span>
		<a href={channel}><Icon name="send" size={16} />@falkov_agency</a>
	</div>
	<div class="main wrap">
		<a class="logo" href="#top">
			<span class="mark">Ф</span>
			<span><b>ФАЛЬКОВ</b><small>маркетинг</small></span>
		</a>
		<a class="sticker" href="#lead">Тест бесплатно!</a>
		<a class="phone" href={tel}>{phone}</a>
		<a class="ic" href={tg} aria-label="Telegram"><Icon name="send" size={18} /></a>
		<div class="acts">
			<a href="#lead"><Icon name="calc" size={20} />Отправить сайт на тест</a>
			<a href={tel}><Icon name="phone" size={20} />Позвонить</a>
			<a href={tg}><Icon name="chat" size={20} />Написать</a>
		</div>
	</div>
	<nav class="wrap">
		{#each nav as n, i}<a href="#{navId[i]}">{n}{#if i === 0}<i class="dot"></i>{/if}</a>{/each}
	</nav>
</header>

<div class="strip">
	<div class="wrap">Начинаем с бесплатного теста — показываем рост на вашем сайте до договора</div>
</div>

<main id="top">
	<!-- Баннер как у okonti: скруглённая карточка с фото -->
	<div class="wrap">
		<div class="banner" style:--bg="url({a('2354-2.jpg')})">
			<span class="badge">Офис на Энергетиков, 10</span>
			<h1>Маркетинговое агентство в Санкт-Петербурге</h1>
			<p>Приводим клиентов малому и среднему бизнесу из <b>SEO</b>, <b>Яндекс Директа</b> и <b>Telegram Ads</b></p>
			<div class="ctas">
				<a class="btn btn-pink" href="#lead">Отправить сайт на бесплатный тест</a>
				<a class="btn btn-white" href="#cases">Смотреть кейсы</a>
			</div>
		</div>

		<div class="trust">
			<span class="lbl">Нам доверяют</span>
			<div class="logos">
				{#each logos as l}<img src={a(l)} alt="" loading="lazy" />{/each}
			</div>
			<a class="tgcard" href={channel}>
				<b>40+ кейсов</b><span>в канале @falkov_agency · 1000+ подписчиков</span>
			</a>
		</div>
	</div>

	<section id="services">
		<div class="wrap">
			<h2>Услуги маркетингового агентства</h2>
			<p class="sub">Можно взять один канал, можно отдать весь маркетинг под ключ</p>
			<div class="tiles">
				{#each services as s}
					<a class="tile" href="#lead">
						<img src={a(s.photo)} alt={s.name} loading="lazy" />
						<div class="bar"><b>{s.name}</b><span>{s.text}</span></div>
					</a>
				{/each}
			</div>
			<div class="cards4">
				{#each extra as e}
					<div class="card">
						<span class="cic"><Icon name={e.icon} size={30} /></span>
						<h3>{e.name}</h3>
						<p>{e.text}</p>
						<a class="btn btn-primary" href="#lead">Обсудить</a>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section>
		<div class="wrap facts">
			{#each facts as f}
				<div class="fact">
					<span class="fic"><Icon name={f.icon} size={34} /></span>
					<b>{f.big}</b>
					<span>{f.text}</span>
				</div>
			{/each}
		</div>
	</section>

	<section id="formats">
		<div class="wrap">
			<h2>Форматы работы</h2>
			<div class="series">
				{#each formats as f}
					<div class="ser" style:background={f.tone}>
						<small>{f.series}</small>
						<h3>{f.name}</h3>
						<span class="tag">{f.tag}</span>
						<p>{f.text}</p>
						<a class="btn btn-primary" href="#lead">{f.price}</a>
					</div>
				{/each}
			</div>
			<a class="btn btn-outline wide" href="#lead">Подобрать формат после бесплатного теста</a>
		</div>
	</section>

	<section id="how">
		<div class="wrap">
			<h2>Как мы работаем</h2>
			<ol class="steps">
				{#each steps as s, i}
					<li><span class="n">{i + 1}</span><h3>{s.t}</h3><p>{s.d}</p></li>
				{/each}
			</ol>
		</div>
	</section>

	<!-- Блок-оффер: аналог «Пересчитаем смету конкурентов» -->
	<section>
		<div class="wrap">
			<div class="offer">
				<img src={a('2339-1.jpg')} alt="Отчёты Яндекс Метрики по проектам агентства" loading="lazy" />
				<div>
					<h2>Бесплатный тест вместо коммерческого предложения</h2>
					<p>Сначала показываем рост на вашем сайте, потом обсуждаем сотрудничество. Тест подсвечивает точки роста лучше любого платного аудита и ни к чему не обязывает.</p>
					<a class="btn btn-primary" href="#lead">Отправить сайт на тест</a>
				</div>
			</div>
		</div>
	</section>

	<section id="cases">
		<div class="wrap">
			<div class="head">
				<h2>Кейсы: 45+ проектов</h2>
				<a class="link" href={channel}>Ещё в канале →</a>
			</div>
			<div class="cases">
				{#each cases as c}
					<article>
						<img src={a(c.photo)} alt={c.name} loading="lazy" />
						<div class="cb">
							<small>{c.niche}</small>
							<p class="big"><b>{c.big}</b> {c.unit}</p>
							<h3>{c.name}</h3>
							<p>{c.text}</p>
							<a class="btn btn-primary" href="#lead">Хочу так же</a>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section id="terms">
		<div class="wrap">
			<h2>Когда ждать результат</h2>
			<div class="terms">
				{#each terms as t}
					<div class="term"><b>{t.when}</b><h3>{t.what}</h3><p>{t.d}</p></div>
				{/each}
			</div>
		</div>
	</section>

	<section>
		<div class="wrap">
			<h2>Что фиксируем в договоре</h2>
			<div class="princ">
				{#each principles as p}
					<div><Icon name="shield" size={28} /><h3>{p.t}</h3><p>{p.d}</p></div>
				{/each}
			</div>
		</div>
	</section>

	<section id="lead">
		<div class="wrap">
			<div class="lead" style:--bg="url({a('2342-1.jpg')})">
				<div>
					<h2>Отправьте сайт на бесплатный тест</h2>
					<p>Покажем, что вытащим из ниши и за какой срок — до договора. Или приезжайте в офис: пр. Энергетиков, 10, напишите за день.</p>
					<div class="alt">
						<a href={tel}><Icon name="phone" size={18} />{phone}</a>
						<a href={tg}><Icon name="send" size={18} />@falkov_marketing</a>
					</div>
				</div>
				{#if sent}
					<div class="form"><Icon name="check" size={40} /><h3>Заявка принята</h3><p>Роман свяжется с вами в течение дня.</p></div>
				{:else}
					<form class="form" onsubmit={(e) => { e.preventDefault(); sent = true; }}>
						<input class="field" placeholder="Имя" />
						<input class="field" type="tel" required placeholder="Телефон или Telegram*" />
						<input class="field" placeholder="Адрес сайта" />
						<button class="btn btn-pink" type="submit">Отправить сайт на тест</button>
						<small>Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных</small>
					</form>
				{/if}
			</div>
		</div>
	</section>
</main>

<footer>
	<div class="wrap fcols">
		<div><b class="flogo">ФАЛЬКОВ</b><p>Маркетинговое агентство полного цикла в Санкт-Петербурге</p></div>
		<div><h4>Услуги</h4>{#each services as s}<a href="#services">{s.name}</a>{/each}</div>
		<div><h4>Агентство</h4><a href="#cases">Кейсы</a><a href="#how">Как работаем</a><a href="#formats">Форматы</a><a href={channel}>Канал агентства</a></div>
		<div><h4>Контакты</h4><a href={tel}>{phone}</a><a href={tg}>@falkov_marketing</a><span>пр. Энергетиков, 10</span></div>
	</div>
	<div class="wrap fbot"><span>© 2026 Фальков. Санкт-Петербург</span><span>Политика конфиденциальности</span></div>
</footer>

<style>
	.mbar { display: none; position: sticky; top: 0; z-index: 30; background: var(--blue); grid-template-columns: repeat(3, 1fr); }
	.mbar a { display: flex; align-items: center; justify-content: center; gap: 6px; color: #fff; font-weight: 600; font-size: 14px; padding: 12px 4px; }
	.mbar a + a { box-shadow: inset 1px 0 0 rgb(255 255 255 / 0.2); }

	header { border-bottom: 1px solid var(--line); }
	.top { display: flex; gap: 24px; font-size: 13px; color: var(--text); padding-top: 12px; padding-bottom: 6px; }
	.top span, .top a { display: inline-flex; align-items: center; gap: 6px; }
	.top :global(svg) { color: var(--green); }
	.top .r { margin-left: auto; }
	.main { display: flex; align-items: center; gap: 20px; padding-top: 8px; padding-bottom: 14px; }
	.logo { display: flex; align-items: center; gap: 10px; }
	.mark { width: 44px; height: 44px; border: 4px solid var(--navy); display: grid; place-items: center; background: linear-gradient(var(--green), var(--green)) center / 22px 22px no-repeat; color: #fff; font-weight: 800; }
	.logo b { display: block; color: var(--navy); font-size: 22px; font-weight: 800; line-height: 1; }
	.logo small { color: var(--navy); font-weight: 700; text-transform: uppercase; font-size: 14px; }
	.sticker { background: var(--pink); color: #fff; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 6px; transform: rotate(-4deg); }
	.phone { color: var(--blue); font-size: 22px; font-weight: 700; white-space: nowrap; }
	.ic { width: 34px; height: 34px; border-radius: 50%; background: var(--blue); color: #fff; display: grid; place-items: center; }
	.acts { margin-left: auto; display: flex; background: var(--blue); border-radius: 10px; padding: 4px; }
	.acts a { display: flex; gap: 8px; align-items: center; color: #fff; font-weight: 600; padding: 12px 16px; border-radius: 8px; }
	.acts a:hover { background: var(--blue-d); }
	nav { display: flex; gap: 32px; padding-bottom: 14px; font-weight: 500; }
	nav a:hover { color: var(--blue); }
	.dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--pink); margin-left: 5px; vertical-align: middle; }
	.strip { background: #f1f8ee; font-size: 14px; text-align: center; padding: 12px 0; border-bottom: 1px solid var(--line); }

	.banner { margin-top: 28px; border-radius: 20px; min-height: 440px; padding: 48px; color: #fff; display: grid; align-content: center; justify-items: start; gap: 18px; background: linear-gradient(90deg, rgb(0 25 80 / 0.92) 30%, rgb(0 25 80 / 0.2)), var(--bg) center 30% / cover; }
	.banner h1 { font-size: clamp(30px, 4.6vw, 56px); font-weight: 800; text-transform: uppercase; max-width: 720px; }
	.banner p { font-size: 20px; max-width: 560px; }
	.ctas { display: flex; gap: 12px; flex-wrap: wrap; }

	.trust { display: flex; align-items: center; gap: 28px; margin-top: 28px; }
	.lbl { font-size: 18px; white-space: nowrap; }
	.logos { display: flex; gap: 28px; overflow-x: auto; scrollbar-width: none; flex: 1; align-items: center; }
	.logos img { height: 30px; width: auto; flex: none; filter: grayscale(1); opacity: 0.75; }
	.tgcard { display: grid; text-align: right; flex: none; }
	.tgcard b { font-size: 22px; color: var(--blue); }
	.tgcard span { font-size: 12px; color: var(--muted); }

	.sub { color: var(--muted); margin: 8px 0 24px; }
	h2 + .tiles, h2 + .series, h2 + .steps, h2 + .terms, h2 + .princ { margin-top: 24px; }
	.tiles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
	.tile { border-radius: var(--radius); overflow: hidden; background: var(--navy); color: #fff; display: flex; flex-direction: column; }
	.tile img { aspect-ratio: 4 / 3.4; object-fit: cover; width: 100%; }
	.bar { padding: 16px; display: grid; gap: 4px; }
	.bar b { text-transform: uppercase; font-size: 18px; }
	.bar span { font-size: 14px; opacity: 0.85; }

	.cards4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 16px; }
	.card { background: var(--soft-2); border-radius: var(--radius); padding: 22px; display: grid; gap: 10px; box-shadow: 0 2px 10px rgb(0 30 80 / 0.06); }
	.cic { width: 64px; height: 64px; border-radius: 16px; background: #fff; display: grid; place-items: center; color: var(--blue); }
	.card p { color: var(--muted); font-size: 14px; }

	.facts { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; text-align: center; }
	.fact { display: grid; justify-items: center; gap: 6px; }
	.fic { width: 76px; height: 76px; border-radius: 20px; background: #f1f8ee; color: var(--green); display: grid; place-items: center; }
	.fact b { font-size: 24px; color: var(--navy); }
	.fact span:last-child { color: var(--muted); font-size: 14px; }

	.series { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(230px, 1fr); gap: 14px; overflow-x: auto; scrollbar-width: none; }
	.ser { border-radius: var(--radius); padding: 20px; display: grid; gap: 8px; align-content: start; }
	.ser small { font-weight: 700; }
	.tag { font-size: 12px; color: var(--muted); }
	.ser p { font-size: 14px; color: var(--muted); min-height: 63px; }
	.wide { width: 100%; margin-top: 16px; }

	.steps { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
	.steps li { text-align: center; display: grid; justify-items: center; gap: 6px; }
	.n { width: 52px; height: 52px; border-radius: 50%; border: 2px solid var(--green); color: var(--green); font-weight: 700; font-size: 20px; display: grid; place-items: center; }
	.steps h3 { font-size: 16px; }
	.steps p { font-size: 14px; color: var(--muted); }

	.offer { display: grid; grid-template-columns: 1fr 1.2fr; gap: 32px; align-items: center; background: var(--soft); border-radius: 20px; padding: 32px; }
	.offer img { border-radius: 14px; max-height: 340px; width: 100%; object-fit: cover; }
	.offer > div { display: grid; gap: 16px; justify-items: start; }
	.offer p { color: var(--muted); }

	.head { display: flex; justify-content: space-between; align-items: end; gap: 16px; margin-bottom: 24px; }
	.cases { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
	article { border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden; display: flex; flex-direction: column; }
	article img { aspect-ratio: 3 / 2; object-fit: cover; width: 100%; }
	.cb { padding: 18px; display: grid; gap: 8px; flex: 1; align-content: start; }
	.cb small { color: var(--muted); }
	.big { color: var(--muted); font-size: 14px; }
	.big b { font-size: 26px; color: var(--blue); margin-right: 4px; }
	.cb p:not(.big) { font-size: 14px; color: var(--muted); }
	.cb .btn { margin-top: auto; min-height: 44px; }

	.terms { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
	.term { border-top: 3px solid var(--blue); padding-top: 12px; display: grid; gap: 4px; }
	.term b { color: var(--blue); font-size: 22px; }
	.term p { color: var(--muted); font-size: 14px; }

	.princ { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
	.princ div { display: grid; gap: 8px; align-content: start; }
	.princ :global(svg) { color: var(--green); }
	.princ p { color: var(--muted); font-size: 14px; }

	.lead { border-radius: 20px; padding: 48px; display: grid; grid-template-columns: 1.1fr 1fr; gap: 40px; align-items: center; color: #fff; background: linear-gradient(100deg, rgb(0 38 112 / 0.96) 40%, rgb(0 38 112 / 0.75)), var(--bg) center / cover; }
	.lead > div { display: grid; gap: 14px; }
	.lead p { opacity: 0.88; }
	.alt { display: flex; gap: 20px; flex-wrap: wrap; }
	.alt a { display: inline-flex; gap: 8px; align-items: center; font-weight: 600; }
	.form { background: #fff; color: var(--text); border-radius: 16px; padding: 24px; display: grid; gap: 12px; justify-items: stretch; }
	.form small { color: var(--muted); font-size: 12px; }

	footer { margin-top: 64px; background: var(--navy); color: #c9d6f2; padding: 48px 0 24px; font-size: 14px; }
	.fcols { display: grid; grid-template-columns: 1.5fr repeat(3, 1fr); gap: 24px; }
	.fcols div { display: grid; gap: 8px; align-content: start; }
	.flogo { color: #fff; font-size: 22px; }
	h4 { margin: 0; color: #fff; }
	.fbot { display: flex; justify-content: space-between; margin-top: 32px; padding-top: 18px; border-top: 1px solid rgb(255 255 255 / 0.12); font-size: 13px; }

	@media (max-width: 1100px) {
		.acts { display: none; }
		.top a:not(:last-child) { display: none; }
		.tiles, .cards4 { grid-template-columns: repeat(2, 1fr); }
		.facts { grid-template-columns: repeat(3, 1fr); }
		.cases { grid-template-columns: repeat(2, 1fr); }
		.terms { grid-template-columns: repeat(3, 1fr); }
		.princ { grid-template-columns: repeat(2, 1fr); }
	}

	@media (max-width: 760px) {
		.mbar { display: grid; }
		.top, nav, .sticker, .tgcard, .lbl, .ic { display: none; }
		.logo small { display: none; }
		.phone { font-size: 16px; margin-left: auto; }
		.banner { min-height: 0; padding: 28px 20px; background: linear-gradient(rgb(0 25 80 / 0.7), rgb(0 25 80 / 0.92)), var(--bg) center / cover; }
		.banner p { font-size: 16px; }
		.ctas { width: 100%; }
		.trust { margin-top: 20px; }
		.logos { gap: 20px; }
		.tiles { gap: 10px; }
		.bar span { display: none; }
		.bar b { font-size: 14px; }
		.cards4, .cases, .princ, .offer, .lead, .fcols { grid-template-columns: 1fr; }
		.facts { grid-template-columns: 1fr 1fr; }
		.steps { grid-template-columns: 1fr; text-align: left; }
		.steps li { grid-template-columns: 52px 1fr; text-align: left; justify-items: start; column-gap: 14px; }
		.n { grid-row: span 2; }
		.terms { grid-template-columns: 1fr 1fr; }
		.offer, .lead { padding: 20px; gap: 20px; }
		.fbot { flex-direction: column; gap: 8px; }
	}
</style>
