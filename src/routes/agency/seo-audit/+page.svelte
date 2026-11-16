<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import AgencyModal from '#lib/components/agency/AgencyModal.svelte';

	// Бесплатный SEO-аудит: скелет страницы по видео руководителя агентства.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const a = (f: string) => asset(f as any);
	let modal = $state(false);

	const gets = [
		['Семантическое ядро', 'Собираем запросы, по которым вас ищут клиенты.'],
		['Запросы без позиций', 'Находим спрос, по которому сайт ещё не продвинут.'],
		['Расчёт потенциала', 'Считаем, сколько трафика и заявок может дать поиск.'],
		['Техническая диагностика', 'Проверяем сайт по своей методике и отдаём план работ.']
	];

	const reasons = [
		['50+ кейсов в канале', 'В Telegram-канале больше 50 кейсов, на деле их больше. Напишите нам свою нишу: скорее всего, мы с ней уже работали и пришлём примеры.'],
		['Рост виден уже на тесте', 'Во время бесплатного теста мы используем все безопасные методы, чтобы показать рост трафика. Ждать результата полгода для этого не нужно.'],
		['Понятно, что мы делаем', 'Показываем примеры ТЗ для вас и ваших разработчиков. Каждую правку объясняем: зачем она и что даст.']
	];

	const steps = [
		['Вы пишете нам', 'В Telegram, в Макс или через форму. Присылаете адрес сайта.'],
		['Разбираем сайт и нишу', 'Собираем запросы, смотрим конкурентов и считаем потенциал.'],
		['Проводим тест', 'Делаем техническую диагностику и первые правки. Позиции сайта растут уже на этом этапе.'],
		['Показываем результат', 'Присылаем позиции, трафик, план работ и кейсы в вашей нише.'],
		['Вы принимаете решение', 'Договор подписываем после того, как вы увидели результат на своём сайте.']
	];
</script>

<svelte:head>
	<title>Бесплатный SEO-аудит сайта – агентство «Фальков»</title>
	<meta name="description" content="Бесплатный SEO-аудит: семантика, расчёт трафика и заявок, техническая диагностика и план работ. Результат показываем до договора." />
</svelte:head>

<main>
	<div class="wrap">
		<div class="phero">
			<div class="ptxt">
				<p class="crumbs"><a href={resolve('/agency')}>Главная</a> / SEO-аудит</p>
				<h1>Бесплатный SEO-аудит сайта</h1>
				<p>Показываем рост на вашем сайте до договора. Вы платите, когда увидели результат.</p>
				<button type="button" class="btn btn-white" onclick={() => (modal = true)}>Получить бесплатный аудит</button>
			</div>
			<video src={a('/video/podhod.mp4')} poster={a('/video/podhod.jpg')} controls playsinline preload="none"></video>
		</div>

		<section>
			<h2>Что входит в аудит</h2>
			<div class="gets">
				{#each gets as [name, text]}<div class="card"><h3>{name}</h3><p>{text}</p></div>{/each}
			</div>
		</section>

		<section>
			<h2>Три причины начать с аудита</h2>
			<div class="reasons">
				{#each reasons as [name, text], i}<div class="card"><span class="n">{i + 1}</span><h3>{name}</h3><p>{text}</p></div>{/each}
			</div>
		</section>

		<section>
			<h2>Как проходит аудит</h2>
			<ol class="steps">
				{#each steps as [name, text], i}<li><span class="n">{i + 1}</span><div><h3>{name}</h3><p>{text}</p></div></li>{/each}
			</ol>
		</section>

		<section class="why">
			<h2>Почему это бесплатно</h2>
			<p>Многие агентства хотят заработать на клиенте в первый же месяц. Мы зарабатываем на долгом сотрудничестве. Если покажем результат на бесплатном аудите, вы останетесь с нами надолго. Поэтому нам выгодно начать с работы, а деньги обсудить потом.</p>
			<p>Офис в Санкт-Петербурге, пр. Энергетиков, 10. Можно приехать и посмотреть кейсы с экрана: напишите за день, договоримся о времени.</p>
			<div class="ctas">
				<button type="button" class="btn btn-primary" onclick={() => (modal = true)}>Получить бесплатный аудит</button>
				<a class="btn btn-outline" href={resolve('/agency/keysy')}>Смотреть кейсы</a>
			</div>
		</section>
	</div>
</main>

<AgencyModal bind:open={modal} />

<style>
	.phero { margin-top: 28px; background: var(--navy); color: #fff; border-radius: 16px; padding: 40px 44px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
	.ptxt { display: grid; gap: 14px; justify-items: start; }
	.crumbs { font-size: 14px; opacity: 0.8; }
	.crumbs a:hover { text-decoration: underline; }
	h1 { font-size: clamp(28px, 3.4vw, 44px); font-weight: 800; text-transform: uppercase; line-height: 1.1; }
	.ptxt p:not(.crumbs) { font-size: 18px; }
	video { width: 100%; aspect-ratio: 640 / 350; display: block; border-radius: 10px; background: #000; }
	.btn { border-radius: 8px; cursor: pointer; font: inherit; font-weight: 600; }

	section { padding-top: 56px; }
	h2 { font-size: clamp(24px, 3vw, 32px); }
	.card { border: 1px solid var(--line); border-radius: 12px; padding: 22px; display: grid; gap: 8px; align-content: start; min-width: 0; }
	.card h3, .steps h3 { font-size: 20px; }
	.card p, .steps p { color: var(--muted); }
	.gets { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 24px; }
	.gets .card { background: #e8eefa; border: 0; }
	.reasons { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
	.n { flex: none; width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--green); color: var(--green); font-weight: 700; display: grid; place-items: center; }
	.steps { list-style: none; padding: 0; margin: 24px 0 0; display: grid; gap: 0; border: 1px solid var(--line); border-radius: 12px; }
	.steps li { display: flex; gap: 16px; align-items: flex-start; padding: 18px 22px; }
	.steps li + li { border-top: 1px solid var(--line); }
	.steps div { display: grid; gap: 4px; }
	.why { display: grid; gap: 12px; }
	.why p { max-width: 900px; font-size: 17px; }
	.ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 6px; }

	@media (max-width: 1000px) {
		.phero { grid-template-columns: 1fr; padding: 28px; gap: 24px; }
		.gets { grid-template-columns: 1fr 1fr; }
		.reasons { grid-template-columns: 1fr; }
	}
	@media (max-width: 640px) {
		.phero { padding: 22px 18px; margin-top: 16px; }
		section { padding-top: 40px; }
		.gets { grid-template-columns: 1fr; }
		.steps li { padding: 14px; gap: 12px; }
		.ctas .btn { width: 100%; }
	}
</style>
