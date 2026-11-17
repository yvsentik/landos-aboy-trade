<script lang="ts">
	import { ag } from '#lib/agency.ts';
	import AgencyVideo from '#lib/components/agency/AgencyVideo.svelte';
	import { ask } from '#lib/agencyModal.svelte.ts';

	// Бесплатный SEO-аудит: скелет страницы по видео руководителя агентства.

	const gets = [
		['Семантическое ядро', 'Собираем запросы, по которым вас ищут клиенты.'],
		['Запросы без позиций', 'Находим спрос, по которому сайт ещё не продвинут.'],
		['Расчёт потенциала', 'Считаем, сколько трафика и заявок может дать поиск.'],
		['Техническая диагностика', 'Проверяем сайт по своей методике и отдаём план работ.']
	];

	const reasons = [
		['50+ кейсов в канале', 'В Telegram-канале больше 50 кейсов, на деле их больше. Напишите нам свою нишу: скорее всего, мы с ней уже работали и пришлём примеры.'],
		['Рост виден уже на тесте', 'Во время бесплатного теста мы используем все безопасные методы, чтобы показать рост трафика. Ждать результата полгода для этого не нужно.'],
		['Прозрачный процесс работ', 'До договора показываем примеры технических заданий для вас и ваших разработчиков. Каждая правка сопровождается обоснованием: какую задачу она решает и какой результат даёт.']
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
		<div class="banner">
			<div class="btxt">
				<h1>Бесплатный SEO-аудит сайта</h1>
				<p>Показываем рост на вашем сайте до договора. Вы платите, когда увидели результат.</p>
				<div class="ctas">
					<button type="button" class="btn btn-white" onclick={() => ask()}>Получить бесплатный аудит</button>
					<a class="btn line" href={ag('/keysy')}>Смотреть кейсы</a>
				</div>
			</div>
			<AgencyVideo label="Как проходит аудит" />
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
			<h2>Почему это бесплатно</h2>
			<div class="why">
				<div class="vs">
					<div class="them"><small>Обычное агентство</small><b>Зарабатывает с первого месяца</b><p>Договор и оплата идут вперёд. Результата вы ждёте несколько месяцев и рискуете бюджетом.</p></div>
					<div class="us"><small>Мы</small><b>Зарабатываем на долгом сотрудничестве</b><p>Сначала показываем рост на вашем сайте. Если результат есть, вы остаётесь с нами надолго, и это окупает бесплатный старт.</p></div>
				</div>
				<ul class="facts">
					<li><b>0 ₽</b><span>стоит аудит и тест</span></li>
					<li><b>До договора</b><span>вы видите рост позиций</span></li>
					<li><b>Без обязательств</b><span>решение о работе принимаете вы</span></li>
				</ul>
				<p class="office">Офис в Санкт-Петербурге, пр. Энергетиков, 10. Можно приехать и посмотреть кейсы с экрана: напишите за день, договоримся о времени.</p>
			</div>
		</section>

		<section>
			<h2>Как проходит аудит</h2>
			<ol class="steps">
				{#each steps as [name, text], i}<li><span class="n">{i + 1}</span><div><h3>{name}</h3><p>{text}</p></div></li>{/each}
			</ol>
			<div class="ctas end">
				<button type="button" class="btn btn-primary" onclick={() => ask()}>Получить бесплатный аудит</button>
				<a class="btn btn-outline" href={ag('/keysy')}>Смотреть кейсы</a>
			</div>
		</section>
	</div>
</main>

<style>
	.banner { margin-top: 28px; background: var(--navy); color: #fff; border-radius: 16px; padding: 44px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
	.btxt { display: grid; gap: 18px; justify-items: start; }
	h1 { font-size: clamp(28px, 3.6vw, 46px); font-weight: 800; text-transform: uppercase; line-height: 1.1; }
	.btxt p { font-size: 18px; }
	.line { color: #fff; border: 2px solid #fff; background: none; }
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
	.why { margin-top: 24px; display: grid; gap: 16px; }
	.vs { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
	.vs div { border-radius: 14px; padding: 24px; display: grid; gap: 8px; align-content: start; }
	.vs small { font-weight: 700; font-size: 14px; }
	.vs b { font-size: 22px; line-height: 1.2; }
	.them { background: var(--soft-2); border: 1px solid var(--line); color: var(--muted); }
	.them b { color: inherit; }
	.us { background: var(--navy); color: #fff; }
	.us small { color: #fff; background: var(--pink); justify-self: start; padding: 3px 10px; border-radius: 6px; }
	.us p { opacity: 0.9; }
	.facts { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
	.facts li { border: 1px solid var(--line); border-radius: 12px; padding: 18px 20px; display: grid; gap: 2px; }
	.facts b { font-size: 24px; font-weight: 800; color: var(--blue); }
	.facts span { color: var(--muted); }
	.office { color: var(--muted); max-width: 900px; }
	.ctas { display: flex; gap: 12px; flex-wrap: wrap; }
	.end { margin-top: 20px; }

	@media (max-width: 1000px) {
		.banner { grid-template-columns: 1fr; padding: 28px; }
		.vs { grid-template-columns: 1fr; }
		.gets { grid-template-columns: 1fr 1fr; }
		.reasons { grid-template-columns: 1fr; }
	}
	@media (max-width: 640px) {
		.banner { padding: 22px 18px; margin-top: 16px; gap: 24px; }
		.btxt p { font-size: 16px; }
		.facts { grid-template-columns: 1fr; gap: 10px; }
		section { padding-top: 40px; }
		.gets { grid-template-columns: 1fr; }
		.steps li { padding: 14px; gap: 12px; }
		.ctas .btn { width: 100%; }
	}
</style>
