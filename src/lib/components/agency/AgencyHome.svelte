<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import AgencyForm from '#lib/components/agency/AgencyForm.svelte';
	import { ask } from '#lib/agencyModal.svelte.ts';
	import ChannelBand from '#lib/components/agency/ChannelBand.svelte';
	import AgencyVideo from '#lib/components/agency/AgencyVideo.svelte';
	import { channel, maxChannel, address } from '#lib/agency.ts';

	// city – вариант страницы под город: тексты, порядок проектов и кейсов, блок офиса.
	let { city }: { city?: 'spb' | 'msk' } = $props();
	const C = {
		spb: { where: 'в Санкт-Петербурге', by: 'по Санкт-Петербургу', name: 'Санкт-Петербург' },
		msk: { where: 'в Москве', by: 'по Москве', name: 'Москва' }
	};
	const c = $derived(city ? C[city] : undefined);
	const title = $derived(c ? `SEO-продвижение сайтов ${c.where}` : 'SEO-продвижение сайтов');

	// Главная сайта SEO-агентства «Фальков» и её варианты под города (шапка и футер – в +layout.svelte). Стиль okonti.ru: белый фон, плоские синие кнопки, фото.
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
			y: { city: 'Москва', top: 970, q: ['бесплатный онлайн психолог', 'консультация психолога бесплатно'] },
			g: { city: 'Москва', top: 3504, q: ['семейный психолог', 'кпт терапевт', 'помощь онлайн психолога'] }
		}
	];
	let eng = $state<'y' | 'g'>('y');
	// На странице города проекты этого города идут первыми
	const rows = $derived(c ? [...positions].sort((a, b) => Number(b.y.city === c.name) - Number(a.y.city === c.name)) : positions);

	const allCases = [
		{ img: '2318-1.jpg', post: 2318, big: '2 700', unit: 'посетителей в месяц с нуля', name: 'Юридические услуги' },
		{ img: '2259-1.jpg', post: 2259, big: 'ТОП-3', unit: 'по Москве за 5 месяцев', name: 'Арбитражный адвокат' },
		{ img: '2323-1.jpg', post: 2323, big: '+100', unit: 'посетителей каждый день', name: 'Магазин техники Apple' },
		{ img: '2272-1.jpg', post: 2272, big: 'ТОП-5', unit: 'по Москве', name: 'Ремонт трансформаторов' },
		{ img: '2273-1.jpg', post: 2273, big: '−40%', unit: 'мусорных лидов', name: 'Кухни на заказ' },
		{ img: '2322-1.jpg', post: 2322, big: 'ТОП', unit: 'в Google', name: 'Клиника наркологии' }
	];
	// На московской странице первыми идут кейсы по Москве
	const cases = $derived(city === 'msk' ? [...allCases].sort((a, b) => Number(b.unit.includes('Москв')) - Number(a.unit.includes('Москв'))) : allCases);

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
			lines: ['ТОП сайта в среднем за 1 месяц', 'Техническая оптимизация под Яндекс', 'Продвижение в ответах Алисы AI', 'Оптимизация карточки в Яндекс Картах'],
			price: 'от 55 000 ₽',
			per: 'в месяц',
			more: false
		},
		{
			name: 'SEO-продвижение в Google',
			lines: ['ТОП сайта в среднем за 3 месяца', 'Правки строго по официальным критериям Google', 'Продвижение в Google Gemini и AI-ответах'],
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

	const baseFaq: [string, string][] = [
		['Сколько стоит продвижение?', 'Продвижение в Яндексе – от 55 000 ₽ в месяц, в Google – от 70 000 ₽ в месяц. SEO-аудит бесплатный. Точную сумму называем после аудита: она зависит от ниши и состояния сайта.'],
		['Когда будет результат?', 'В Яндексе сайт выходит в ТОП в среднем за 1 месяц, в Google – в среднем за 3 месяца. Первые изменения позиций видны уже во время бесплатного аудита.'],
		['Что входит в бесплатный аудит?', 'Собираем семантическое ядро, находим запросы, по которым сайт ещё не продвинут, считаем потенциал по трафику и заявкам, проводим техническую диагностику и отдаём план работ.'],
		['Как проверить ваши результаты?', 'Позиции наших проектов можно проверить самому: откройте Яндекс или Google и введите запросы из таблицы на этой странице. Полные разборы с цифрами и скриншотами лежат в наших каналах в Telegram и Максе.'],
		['Вы работали с моей нишей?', 'Скорее всего, да: у нас больше 50 кейсов в медицине, услугах, производстве, строительстве, юриспруденции и интернет-магазинах. Напишите нам свою нишу, пришлём подходящие примеры.']
	];
	const faq = $derived<[string, string][]>(
		city === 'spb'
			? [...baseFaq, ['Можно приехать к вам в офис?', `Да. Офис находится по адресу: ${address}. Напишите за день до приезда, договоримся о времени и покажем кейсы с экрана.`]]
			: city === 'msk'
				? [...baseFaq, ['У вас есть офис в Москве?', 'Офиса в Москве у нас нет, агентство находится в Санкт-Петербурге. С московскими клиентами работаем удалённо: созвоны, общий чат и отчёты с цифрами. Многие наши кейсы сделаны по Москве.']]
				: baseFaq
	);


</script>

<svelte:head>
	<title>{title} – агентство «Фальков»</title>
	<meta name="description" content="{title}: выводим сайты в ТОП Яндекса и Google{c ? ` ${c.by}` : ''}. Начинаем с бесплатного аудита и показываем результат до договора." />
</svelte:head>

{#snippet ya()}<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#fc3f1d" /><path fill="#fff" d="M13.6 19.5h2.3V4.5h-3.4c-3.4 0-5.2 1.7-5.2 4.3 0 2 .9 3.2 2.6 4.4l-3 6.3h2.5l3.3-6.9-1.1-.8c-1.4-.9-2-1.7-2-3.2 0-1.400.9-2.300 2.800-2.300h1.2z" /></svg>{/snippet}
{#snippet go()}<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#fff" /><path fill="#4285f4" d="M19.6 12.2c0-.6 0-1.100-.100-1.600H12v3h4.300c-.2 1-.7 1.800-1.600 2.400v2h2.600c1.500-1.400 2.300-3.400 2.300-5.800z" /><path fill="#34a853" d="M12 20c2.200 0 4-.7 5.300-1.900l-2.600-2c-.7.5-1.600.8-2.700.8-2.100 0-3.800-1.400-4.500-3.300H4.900v2.100C6.200 18.300 8.900 20 12 20z" /><path fill="#fbbc05" d="M7.500 13.600c-.2-.5-.3-1-.3-1.600s.1-1.100.3-1.600V8.300H4.900C4.300 9.400 4 10.700 4 12s.3 2.600.9 3.700z" /><path fill="#ea4335" d="M12 7.200c1.200 0 2.200.4 3.100 1.200l2.300-2.300C16 4.800 14.200 4 12 4 8.900 4 6.200 5.700 4.900 8.300l2.600 2.100C8.200 8.600 9.900 7.200 12 7.200z" /></svg>{/snippet}

<main id="top">
	<!-- Оффер + видео руководителя -->
	<div class="wrap">
		<div class="banner">
			<div class="btxt">
				<h1>{title}</h1>
				<p>
					Выводим в ТОП
					<span class="se">{@render ya()}Яндекса</span>
					и
					<span class="se">{@render go()}Google.</span>
					{#if c}Продвигаем сайты {c.by}.{/if}
					Начинаем с бесплатного аудита и показываем результат до договора.
				</p>
				<div class="ctas">
					<button type="button" class="btn btn-white" onclick={() => ask()}>Получить бесплатный аудит</button>
					<a class="btn line" href="#cases">Смотреть кейсы</a>
				</div>
			</div>
			<AgencyVideo />
		</div>
	</div>

	<!-- Клиенты: слайдер логотипов -->
	<div class="wrap clients">
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
			<ChannelBand />
		</div>
	</section>

	<!-- Позиции, которые можно проверить в поиске -->
	<section id="positions">
		<div class="wrap">
			<div class="phead">
				<h2>Проверьте реальные позиции наших проектов{c ? ` ${c.where}` : ''}</h2>
				<div class="switch" role="tablist" aria-label="Поисковая система">
					<button type="button" role="tab" aria-selected={eng === 'y'} class:on={eng === 'y'} onclick={() => (eng = 'y')}>{@render ya()}Яндекс</button>
					<button type="button" role="tab" aria-selected={eng === 'g'} class:on={eng === 'g'} onclick={() => (eng = 'g')}>{@render go()}Google</button>
				</div>
			</div>
			<div class="ptable" class:open={allPos}>
				{#each rows as p}
					{@const e = p[eng]}
					<div class="prow">
						<img src={pic(p.logo)} alt="" />
						<div class="pname"><b>{p.name}</b><a href="https://{p.site}" target="_blank" rel="noopener">{p.site}</a></div>
						<div class="pq"><i>{e.city}</i>{#each e.q as q}<span>{q}</span>{/each}</div>
						<div class="ptop"><b>{e.top.toLocaleString('ru-RU')}</b><span>в ТОП-5</span></div>
					</div>
				{/each}
			</div>
			{#if !allPos && rows.length > 3}
				<button type="button" class="btn btn-outline wide pmore" onclick={() => (allPos = true)}>Показать все {rows.length} проектов</button>
			{/if}
		</div>
	</section>

	<!-- Услуги -->
	<section id="services">
		<div class="wrap">
			<h2>{c ? `SEO-услуги ${c.where}` : 'Наши услуги'}</h2>
			<div class="series">
				{#each services as sv}
					<div class="ser">
						<h3>{sv.name}</h3>
						<ul>{#each sv.lines as l}<li>{l}</li>{/each}</ul>
						<b class="price">{sv.price}{#if sv.per}<span> {sv.per}</span>{/if}</b>
						{#if sv.more}
							<a class="btn btn-primary" href={resolve('/agency/seo-audit')}>Подробнее о SEO-аудите</a>
						{:else}
							<button type="button" class="btn btn-outline" onclick={() => ask()}>Начать с бесплатного аудита</button>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Форма заявки -->
	<section>
		<div class="wrap"><AgencyForm id="zayavka-mid" title="Пришлите сайт для аудита" /></div>
	</section>

	<!-- Кейсы: посты из канала -->
	<section id="cases">
		<div class="wrap">
			<h2>{city === 'msk' ? 'Кейсы SEO-продвижения в Москве и других городах' : city ? 'Кейсы SEO-продвижения' : 'Кейсы'}</h2>
			<div class="cases">
				{#each cases as c}
					<div class="case">
						<img src={pic(c.img)} alt={c.name} loading="lazy" />
						<div>
							<b class="big">{c.big}</b>
							<span class="unit">{c.unit}</span>
							<h3>{c.name}</h3>
							<div class="read">
								<a class="btn btn-primary" href="{channel}/{c.post}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#fff" /><path fill="#29a9eb" d="M5.400 11.700l11.300-4.400c.5-.2 1 .1.800.9l-1.900 9c-.1.600-.5.800-1 .5l-2.900-2.100-1.400 1.300c-.2.2-.3.300-.6.300l.2-3 5.400-4.900c.2-.2 0-.3-.3-.1l-6.700 4.200-2.900-.9c-.6-.2-.6-.6 0-.8z" /></svg><span class="lg">Читать в Telegram</span><span class="sm">Telegram</span></a>
								<a class="btn btn-outline" href={maxChannel} target="_blank" rel="noopener"><img src={a('/img/icons/max.png')} alt="" /><span class="lg">Читать в Максе</span><span class="sm">Макс</span></a>
							</div>
						</div>
					</div>
				{/each}
			</div>
			<a class="btn btn-primary wide" href={resolve('/agency/keysy')}>Читать ещё кейсы</a>
		</div>
	</section>

	{#if city === 'spb'}
		<!-- Офис: только на странице Санкт-Петербурга -->
		<section>
			<div class="wrap">
				<div class="office">
					<img src={pic('2354-2.jpg')} alt="Офис агентства в Санкт-Петербурге" loading="lazy" />
					<div>
						<h2>Офис в Санкт-Петербурге</h2>
						<p>{address}. Встречаемся лично и показываем кейсы с экрана. Напишите за день до приезда.</p>
						<button type="button" class="btn btn-outline" onclick={() => ask()}>Договориться о встрече</button>
					</div>
				</div>
			</div>
		</section>
	{/if}

	<!-- Частые вопросы -->
	<section id="faq">
		<div class="wrap">
			<h2>Частые вопросы</h2>
			<div class="faq">
				{#each faq as [q, ans]}
					<details><summary>{q}</summary><p>{ans}</p></details>
				{/each}
			</div>
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
	.ctas .btn { font: inherit; font-weight: 600; cursor: pointer; }
	.line { color: #fff; border: 2px solid #fff; background: none; }

	.clients { display: flex; align-items: center; gap: 28px; padding-top: 28px; }
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
	.sm { display: none; }
	.read .btn { flex: 1 1 100%; min-height: 0; padding: 9px 8px; font-size: 14px; white-space: nowrap; gap: 8px; }
	.read svg, .read img { width: 22px; height: 22px; flex: none; border: 0; aspect-ratio: auto; }
	.wide { width: 100%; margin-top: 16px; }

	.series { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
	.ser { background: #e8eefa; border-radius: 12px; padding: 24px; display: flex; flex-direction: column; gap: 8px; }
	.ser h3 { font-size: 22px; }
	.price span { margin-left: 6px; font-size: 16px; font-weight: 600; color: var(--muted); }
	.ser ul { margin: 4px 0 0; padding-left: 18px; display: grid; gap: 6px; }
	.price { margin-top: auto; padding-top: 14px; font-size: 28px; font-weight: 800; color: var(--navy); }
	.ser .btn { margin-top: 6px; font: inherit; font-weight: 600; cursor: pointer; }
	.ser .btn-outline { background: #fff; }

	.free { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
	.fcard { border: 1px solid var(--line); border-radius: 12px; padding: 22px; display: grid; gap: 8px; align-content: start; }
	.fcard span { width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--green); color: var(--green); font-weight: 700; display: grid; place-items: center; }
	.fcard h3 { font-size: 20px; }
	.fcard p { color: var(--muted); }

	.office { display: grid; grid-template-columns: 300px 1fr; gap: 28px; align-items: center; background: var(--soft); border-radius: 16px; padding: 24px; }
	.office img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: 12px; }
	.office div { display: grid; gap: 12px; justify-items: start; }
	.office p { font-size: 17px; }
	.office .btn { font: inherit; font-weight: 600; cursor: pointer; }

	.faq { margin-top: 24px; border: 1px solid var(--line); border-radius: 12px; }
	details + details { border-top: 1px solid var(--line); }
	summary { cursor: pointer; list-style: none; padding: 18px 56px 18px 22px; font-weight: 700; font-size: 18px; position: relative; }
	summary::-webkit-details-marker { display: none; }
	summary::after { content: '+'; position: absolute; right: 22px; top: 50%; translate: 0 -50%; font-size: 26px; font-weight: 400; color: var(--blue); }
	details[open] summary::after { content: '–'; }
	details p { padding: 0 22px 20px; color: var(--muted); max-width: 900px; }

	button.wide { font: inherit; font-weight: 600; cursor: pointer; }


	@media (max-width: 820px) {
		.series, .free { grid-template-columns: 1fr; }
	}

	@media (max-width: 1000px) {
		.banner { grid-template-columns: 1fr; padding: 28px; }
		.prow { grid-template-columns: 96px 1fr auto; row-gap: 6px; }
		.pq { grid-column: 1 / -1; order: 3; }
		.cases { grid-template-columns: 1fr 1fr; }
	}

	@media (max-width: 640px) {
		.office { grid-template-columns: 1fr; padding: 16px; gap: 16px; }
		section { padding-top: 44px; }
		.pq span { font-size: 13px; padding: 2px 8px; }
		section { scroll-margin-top: 125px; }
		.banner { padding: 22px 18px; margin-top: 16px; gap: 24px; }
		.btxt p { font-size: 16px; }
		.clients { display: none; }
		.track img { height: 34px; margin-right: 36px; }
		.prow { grid-template-columns: 1fr auto; gap: 6px 10px; padding: 10px 14px; }
		.prow img { display: none; }
		.ptable:not(.open) .prow:nth-child(n + 4) { display: none; }
		.pmore { display: flex; }
		.series, .free { grid-template-columns: 1fr; }
		.cases { grid-template-columns: 1fr 1fr; gap: 10px; }
		.case:nth-child(n + 5) { display: none; }
		.case div { padding: 10px 10px 12px; }
		.big { font-size: 22px; display: block; margin: 0; }
		.unit { font-size: 13px; }
		.case h3 { font-size: 14px; margin-top: 4px; }
		.read { gap: 6px; margin-top: 8px; }
		.read .btn { padding: 7px 2px; font-size: 12.5px; gap: 5px; }
		.read svg, .read img { width: 16px; height: 16px; }
		.lg { display: none; }
		.sm { display: inline; }
	}
</style>
