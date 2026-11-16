<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import AgencyForm from '#lib/components/agency/AgencyForm.svelte';
	import { channel, maxChannel } from '#lib/agency.ts';

	// Главная сайта SEO-агентства «Фальков» (шапка и футер – в +layout.svelte). Стиль okonti.ru: белый фон, плоские синие кнопки, фото.
	// Логика: оффер + видео → клиенты → с чего начать → каналы → позиции → услуги → форма → кейсы.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const a = (f: string) => asset(f as any);
	const pic = (f: string) => a(`/img/agency/${f}`);


	const logos = ['rosneft.svg', 'tatneft.svg', 'ekoniva.svg', 'korrus.svg', 'aravia.svg', 'psy-chat.svg', 'sotovik.svg'];

	type Eng = { city: string; top: number; q: string[] };
	const positions: { logo: string; name: string; site: string; y: Eng; g: Eng }[] = [
		{
			logo: 'ekoniva.svg', name: 'ЭкоНива-Техника', site: 'ekoniva-tekhnika.com',
			y: { city: 'Москва', top: 551, q: ['кормосмеситель', 'техника джон дир', 'погрузчик сани'] },
			g: { city: 'Москва', top: 492, q: ['комбайн ловол', 'грейдер прицепной', 'устройство комбайна'] }
		},
		{
			logo: 'shinokoff.png', name: 'Шиномонтажникоф', site: 'shinokoff.ru',
			y: { city: 'Санкт-Петербург', top: 230, q: ['шиномонтаж выездной', 'доставка бензина', 'мобильная заправка'] },
			g: { city: 'Санкт-Петербург', top: 204, q: ['мобильная заправка спб', 'мобильная заправка бензином спб'] }
		},
		{
			logo: 'sotovik.svg', name: 'SOTOViK', site: 'spb.sotovik.shop',
			y: { city: 'Санкт-Петербург', top: 213, q: ['купить в спб айфон', 'купить макбук в спб', 'спб айфон'] },
			g: { city: 'Санкт-Петербург', top: 213, q: ['купить в спб айфон', 'купить макбук в спб', 'спб айфон'] }
		},
		{
			logo: 'psy-chat.svg', name: 'Psy-Chat', site: 'psy-chat.ru',
			y: { city: 'Москва', top: 78, q: ['бесплатный онлайн психолог', 'консультация психолога бесплатно'] },
			g: { city: 'Москва', top: 3504, q: ['семейный психолог', 'кпт терапевт', 'помощь онлайн психолога'] }
		}
	];
	let eng = $state<'y' | 'g'>('y');

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
			lines: ['Сбор семантического ядра', 'Запросы, по которым сайт ещё не продвинут', 'Расчёт потенциала по трафику и заявкам', 'Техническая диагностика и план работ'],
			price: 'Бесплатно',
			per: '',
			more: true
		},
		{
			name: 'SEO-продвижение в Яндексе',
			lines: ['Результат в среднем за месяц', 'Техническая оптимизация под Яндекс', 'Продвижение в ответах Алисы AI', 'Оптимизация карточки в Яндекс Картах'],
			price: 'от 55 000 ₽',
			per: 'в месяц',
			more: false
		},
		{
			name: 'SEO-продвижение в Google',
			lines: ['Результат в среднем за 3 месяца', 'Правки строго по официальным критериям Google', 'Продвижение в Google Gemini и AI-ответах'],
			price: 'от 70 000 ₽',
			per: 'в месяц',
			more: false
		}
	];

	const free = [
		{ name: 'Разбор прямых конкурентов', text: 'Смотрим, кто стоит в ТОПе по вашим запросам и за счёт чего он там держится.' },
		{ name: 'Анализ воронки продаж', text: 'Считаем, сколько обращений может дать сайт и во что обойдётся каждое.' },
		{ name: 'Технический аудит по своей методике', text: 'Позиции сайта растут уже во время бесплатного теста.' }
	];

	let allPos = $state(false);

	let video = $state<HTMLVideoElement>();
	let started = $state(false);
	const play = () => {
		started = true;
		video?.play();
	};

</script>

<svelte:head>
	<title>SEO-продвижение сайтов – агентство «Фальков»</title>
	<meta name="description" content="Выводим сайты в ТОП Яндекса и Google. Начинаем с бесплатного аудита: показываем результат до договора. 50+ кейсов в Telegram-канале." />
</svelte:head>

{#snippet ya()}<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#fc3f1d" /><path fill="#fff" d="M13.6 19.5h2.3V4.5h-3.4c-3.4 0-5.2 1.7-5.2 4.3 0 2 .9 3.2 2.6 4.4l-3 6.3h2.5l3.3-6.9-1.1-.8c-1.4-.9-2-1.7-2-3.2 0-1.400.9-2.300 2.800-2.300h1.2z" /></svg>{/snippet}
{#snippet go()}<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#fff" /><path fill="#4285f4" d="M19.6 12.2c0-.6 0-1.100-.100-1.600H12v3h4.300c-.2 1-.7 1.800-1.600 2.400v2h2.600c1.500-1.400 2.300-3.400 2.300-5.800z" /><path fill="#34a853" d="M12 20c2.200 0 4-.7 5.300-1.900l-2.600-2c-.7.5-1.600.8-2.700.8-2.100 0-3.800-1.400-4.500-3.300H4.900v2.100C6.200 18.300 8.900 20 12 20z" /><path fill="#fbbc05" d="M7.500 13.600c-.2-.5-.3-1-.3-1.600s.1-1.100.3-1.600V8.300H4.900C4.300 9.400 4 10.700 4 12s.3 2.600.9 3.700z" /><path fill="#ea4335" d="M12 7.200c1.200 0 2.200.4 3.100 1.200l2.300-2.300C16 4.800 14.200 4 12 4 8.900 4 6.200 5.700 4.900 8.300l2.600 2.100C8.200 8.600 9.900 7.200 12 7.200z" /></svg>{/snippet}

<main id="top">
	<!-- Оффер + видео руководителя -->
	<div class="wrap">
		<div class="banner">
			<div class="btxt">
				<h1>SEO-продвижение сайтов</h1>
				<p>
					Выводим в ТОП
					<span class="se">{@render ya()}Яндекса</span>
					и
					<span class="se">{@render go()}Google.</span>
					Начинаем с бесплатного аудита и показываем результат до договора.
				</p>
				<div class="ctas">
					<a class="btn btn-white" href="#zayavka">Получить бесплатный аудит</a>
					<a class="btn line" href="#cases">Смотреть кейсы</a>
				</div>
			</div>
			<figure>
				<figcaption><span class="sticker">О бесплатном аудите сайта</span><svg class="arr" viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 8c22 0 38 12 40 40" /><path d="M34 40l14 9 6-16" /></svg></figcaption>
				<div class="vid">
					<video bind:this={video} src={a('/video/podhod.mp4')} poster={a('/video/podhod.jpg')} controls={started} playsinline preload="none"></video>
					{#if !started}
						<button type="button" class="playbtn" onclick={play} aria-label="Смотреть видео о бесплатном аудите">
							<span><svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.540 6.347c1.295.712 1.295 2.573 0 3.286L7.280 19.990c-1.250.687-2.779-.217-2.779-1.643V5.653Z" /></svg></span>
						</button>
					{/if}
				</div>
			</figure>
		</div>
	</div>

	<!-- Клиенты: слайдер логотипов -->
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

	<!-- Бесплатный старт -->
	<section id="free">
		<div class="wrap">
			<h2>С чего начать сотрудничество?</h2>
			<p class="sub">Первые шаги мы делаем за свой счёт. Вы оцениваете нашу работу до договора.</p>
			<div class="free">
				{#each free as f, i}
					<div class="fcard"><span>{i + 1}</span><h3>{f.name}</h3><p>{f.text}</p></div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Telegram-канал -->
	<section>
		<div class="wrap">
			<div class="tgband">
				<div class="tnums">
					<div><b>1 000+</b><span>подписчиков</span></div>
					<div><b>50+</b><span>кейсов</span></div>
				</div>
				<p>в наших каналах в Telegram и Максе. Разбираем проекты клиентов с цифрами и скриншотами.</p>
				<div class="subs">
					<a class="btn btn-white" href={channel} target="_blank" rel="noopener">Подписаться в Telegram</a>
					<a class="btn line" href={maxChannel} target="_blank" rel="noopener">Подписаться в Максе</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Позиции, которые можно проверить в поиске -->
	<section id="positions">
		<div class="wrap">
			<div class="phead">
				<h2>Проверьте реальные позиции наших проектов</h2>
				<div class="switch" role="tablist" aria-label="Поисковая система">
					<button type="button" role="tab" aria-selected={eng === 'y'} class:on={eng === 'y'} onclick={() => (eng = 'y')}>{@render ya()}Яндекс</button>
					<button type="button" role="tab" aria-selected={eng === 'g'} class:on={eng === 'g'} onclick={() => (eng = 'g')}>{@render go()}Google</button>
				</div>
			</div>
			<p class="phint">Откройте {eng === 'y' ? 'Яндекс' : 'Google'}, выберите город и введите запрос.</p>
			<div class="ptable" class:open={allPos}>
				{#each positions as p}
					{@const e = p[eng]}
					<div class="prow">
						<img src={pic(p.logo)} alt="" />
						<div class="pname"><b>{p.name}</b><a href="https://{p.site}" target="_blank" rel="noopener">{p.site}</a></div>
						<div class="pq"><i>{e.city}</i>{#each e.q as q}<span>{q}</span>{/each}</div>
						<div class="ptop"><b>{e.top.toLocaleString('ru-RU')}</b><span>в ТОП-5</span></div>
					</div>
				{/each}
			</div>
			{#if !allPos}
				<button type="button" class="btn btn-outline wide pmore" onclick={() => (allPos = true)}>Показать все {positions.length} проектов</button>
			{/if}
		</div>
	</section>

	<!-- Услуги -->
	<section id="services">
		<div class="wrap">
			<h2>Наши услуги</h2>
			<div class="series">
				{#each services as sv}
					<div class="ser">
						<h3>{sv.name}</h3>
						<ul>{#each sv.lines as l}<li>{l}</li>{/each}</ul>
						<b class="price">{sv.price}{#if sv.per}<span> {sv.per}</span>{/if}</b>
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

	<!-- Форма заявки -->
	<section>
		<div class="wrap"><AgencyForm title="Пришлите сайт для аудита" /></div>
	</section>

	<!-- Кейсы: посты из канала -->
	<section id="cases">
		<div class="wrap">
			<h2>Кейсы</h2>
			<div class="cases">
				{#each cases as c}
					<div class="case">
						<img src={pic(c.img)} alt={c.name} loading="lazy" />
						<div>
							<b class="big">{c.big}</b>
							<span class="unit">{c.unit}</span>
							<h3>{c.name}</h3>
							<div class="read">
								<a class="btn btn-primary" href="{channel}/{c.post}" target="_blank" rel="noopener">Читать в Telegram</a>
								<a class="btn btn-outline" href={maxChannel} target="_blank" rel="noopener">Читать в Максе</a>
							</div>
						</div>
					</div>
				{/each}
			</div>
			<a class="btn btn-primary wide" href={resolve('/agency/keysy')}>Читать ещё кейсы</a>
		</div>
	</section>
</main>

<style>
	section { padding-top: 64px; }
	section { scroll-margin-top: 70px; }
	.sub { margin-top: 10px; font-size: clamp(18px, 2vw, 22px); font-weight: 600; color: var(--navy); }
	h2 { font-size: clamp(24px, 3vw, 32px); }
	.btn { border-radius: 8px; }

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
	.playbtn span { width: 92px; height: 92px; border-radius: 50%; background: rgb(236 239 244 / 0.45); border: 3px solid rgb(255 255 255 / 0.9); display: grid; place-items: center; transition: background 0.15s, transform 0.15s; }
	.playbtn:hover span { background: rgb(236 239 244 / 0.7); transform: scale(1.06); }
	.playbtn svg { display: block; width: 40px; height: 40px; }
	video { width: 100%; aspect-ratio: 640 / 350; display: block; border-radius: 10px; background: #000; }
	figcaption { position: relative; z-index: 2; display: flex; align-items: center; gap: 10px; margin-bottom: -12px; padding-left: 14px; font-weight: 700; font-size: 14px; }
	.sticker { background: var(--pink); color: #fff; padding: 7px 14px; border-radius: 7px; transform: rotate(-4deg); box-shadow: 0 6px 18px rgb(0 0 0 / 0.3); }
	.arr { width: 34px; height: 34px; flex: none; transform: translateY(-8px); }

	.clients { display: flex; align-items: center; gap: 28px; padding-top: 28px; }
	.clients b { flex: none; color: var(--navy); font-size: 22px; }
	.marquee { flex: 1; min-width: 0; overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); }
	.track { display: flex; align-items: center; width: max-content; animation: slide 30s linear infinite; }
	.marquee:hover .track { animation-play-state: paused; }
	.track img { height: 42px; width: auto; flex: none; margin-right: 56px; }
	@keyframes slide { to { transform: translateX(-50%); } }
	@media (prefers-reduced-motion: reduce) { .track { animation: none; } .marquee { overflow-x: auto; } }

	.phead { display: flex; align-items: center; justify-content: space-between; gap: 16px 24px; flex-wrap: wrap; }
	.switch { display: flex; padding: 4px; background: var(--soft-2); border: 1px solid var(--line); border-radius: 10px; }
	.switch button { font: inherit; font-weight: 600; cursor: pointer; border: 0; background: none; color: inherit; display: flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 7px; }
	.switch button.on { background: #fff; box-shadow: 0 1px 4px rgb(0 0 0 / 0.14); }
	.switch svg { width: 20px; height: 20px; }
	.phint { color: var(--muted); margin-top: 8px; }
	.ptable { margin-top: 16px; border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }
	.prow { display: grid; grid-template-columns: 96px 210px 1fr auto; gap: 20px; align-items: center; padding: 9px 20px; }
	.prow + .prow { border-top: 1px solid var(--line); }
	.prow img { max-height: 28px; max-width: 96px; width: auto; }
	.pmore { display: none; }
	.pname { line-height: 1.3; }
	.pname b { display: block; }
	.pname a { color: var(--blue); font-size: 13px; }
	.pname a:hover { text-decoration: underline; }
	.pq { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
	.pq i { font-style: normal; color: var(--muted); font-size: 13px; margin-right: 4px; }
	.pq span { background: var(--soft-2); border: 1px solid var(--line); border-radius: 6px; padding: 3px 9px; font-size: 14px; }
	.ptop { text-align: right; white-space: nowrap; }
	.ptop b { font-size: 22px; font-weight: 800; color: var(--blue); margin-right: 6px; }
	.ptop span { color: var(--muted); font-size: 13px; }

	.cases { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
	.case { display: block; border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }
	.case img { width: 100%; aspect-ratio: 3 / 2; object-fit: cover; object-position: top; border-bottom: 1px solid var(--line); }
	.case div { padding: 16px 18px 18px; }
	.big { font-size: 34px; font-weight: 800; color: var(--blue); line-height: 1; margin-right: 8px; }
	.unit { color: var(--muted); }
	.case h3 { margin-top: 8px; font-size: 17px; }
	.read { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; padding: 0 !important; }
	.read .btn { flex: 1; padding: 10px 10px; font-size: 14px; white-space: nowrap; }
	.wide { width: 100%; margin-top: 16px; }

	.series { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
	.ser { background: #e8eefa; border-radius: 12px; padding: 24px; display: flex; flex-direction: column; gap: 8px; }
	.ser h3 { font-size: 22px; }
	.price span { margin-left: 6px; font-size: 16px; font-weight: 600; color: var(--muted); }
	.ser ul { margin: 4px 0 0; padding-left: 18px; display: grid; gap: 6px; }
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
	.subs { flex: none; margin-left: auto; display: grid; gap: 8px; }
	button.wide { font: inherit; font-weight: 600; cursor: pointer; }


	@media (max-width: 820px) {
		.series, .free { grid-template-columns: 1fr; }
	}

	@media (max-width: 1000px) {
		.banner { grid-template-columns: 1fr; padding: 28px; }
		.prow { grid-template-columns: 96px 1fr auto; row-gap: 6px; }
		.pq { grid-column: 1 / -1; order: 3; }
		.cases { grid-template-columns: 1fr 1fr; }
		.tgband { flex-wrap: wrap; padding: 28px; gap: 20px; }
		.subs { margin-left: 0; }
	}

	@media (max-width: 640px) {
		section { padding-top: 44px; }
		.pq span { font-size: 13px; padding: 2px 8px; }
		section { scroll-margin-top: 110px; }
		.banner { padding: 22px 18px; margin-top: 16px; gap: 24px; }
		.btxt p { font-size: 16px; }
		figcaption { font-size: 13px; padding-left: 8px; }
		.playbtn span { width: 68px; height: 68px; }
		.playbtn svg { width: 30px; height: 30px; }
		.clients { display: grid; gap: 14px; padding-top: 22px; }
		.track img { height: 34px; margin-right: 36px; }
		.prow { grid-template-columns: 1fr auto; gap: 6px 10px; padding: 10px 14px; }
		.prow img { display: none; }
		.ptable:not(.open) .prow:nth-child(n + 4) { display: none; }
		.pmore { display: flex; }
		.cases, .series, .free { grid-template-columns: 1fr; }
		.tgband { padding: 22px 18px; }
		.tnums b { font-size: 36px; }
		.subs { width: 100%; }
	}
</style>
