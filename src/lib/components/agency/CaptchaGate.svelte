<script lang="ts">
	import { onMount } from 'svelte';
	import { tg } from '#lib/agency.ts';

	// Капча «выберите похожий цвет» для новых посетителей – как на сайте Обоитрейда,
	// но без сервера: сайт статический, задание и проверка живут в браузере.
	// Решение «показывать или нет» – в app.html (window.__captchaNeeded).
	// Прошёл – 30 дней не показываем. 5 ошибок подряд – пауза 1 мин, дальше вдвое дольше.
	type W = Window & { __captchaNeeded?: boolean };
	type Fail = { n: number; lvl: number; until: number };

	const DAYS = 30;
	const FAMILIES = [0, 28, 52, 125, 178, 215, 275, 325]; // красный … розовый, градусы по цветовому кругу
	const rnd = (a: number, b: number) => a + Math.random() * (b - a);

	function hsl2hex(h: number, s: number, l: number) {
		h = ((h % 360) + 360) % 360;
		s /= 100;
		l /= 100;
		const k = (n: number) => (n + h / 30) % 12;
		const a = s * Math.min(l, 1 - l);
		const f = (n: number) => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))));
		return '#' + [f(0), f(8), f(4)].map((x) => x.toString(16).padStart(2, '0')).join('');
	}

	let show = $state(false);
	let target = $state('');
	let options = $state<string[]>([]);
	let answer = -1;
	let wrong = $state(false);
	let left = $state(5);
	let wait = $state(0);
	let timer: ReturnType<typeof setInterval>;

	const readFail = (): Fail => {
		try {
			return { n: 0, lvl: 0, until: 0, ...JSON.parse(localStorage.getItem('cpt_fail') || '{}') };
		} catch {
			return { n: 0, lvl: 0, until: 0 };
		}
	};
	const saveFail = (f: Fail) => {
		try {
			localStorage.setItem('cpt_fail', JSON.stringify(f));
		} catch {
			/* без хранилища пауза действует до перезагрузки страницы */
		}
	};

	function make() {
		const h = FAMILIES[Math.floor(Math.random() * FAMILIES.length)];
		target = hsl2hex(h, rnd(70, 85), rnd(45, 55));
		// правильный: тот же цвет, чуть темнее или светлее
		const close = hsl2hex(h + rnd(-6, 6), rnd(65, 85), Math.random() < 0.5 ? rnd(38, 43) : rnd(57, 62));
		// неправильные: цвета не ближе 70° по кругу, иногда почти чёрный
		const far = FAMILIES.filter((f) => {
			const d = Math.abs(f - h) % 360;
			return Math.min(d, 360 - d) >= 70;
		}).sort(() => Math.random() - 0.5);
		const bad = [hsl2hex(far[0], rnd(65, 85), rnd(40, 55)), hsl2hex(far[1], rnd(65, 85), rnd(40, 55))];
		bad.push(Math.random() < 0.5 ? hsl2hex(0, 0, rnd(8, 16)) : hsl2hex(far[2], rnd(65, 85), rnd(40, 55)));
		options = [close, ...bad].sort(() => Math.random() - 0.5);
		answer = options.indexOf(close);
	}

	function block(sec: number) {
		wait = sec;
		clearInterval(timer);
		timer = setInterval(() => {
			if (--wait <= 0) {
				clearInterval(timer);
				wrong = false;
				left = 5;
				make();
			}
		}, 1000);
	}

	function pass() {
		try {
			localStorage.setItem('cpt_ok', String(Date.now() + DAYS * 864e5));
			localStorage.removeItem('cpt_fail');
		} catch {
			/* без хранилища – покажем снова в следующий раз */
		}
		show = false;
		document.documentElement.style.overflow = '';
	}

	function choose(i: number) {
		if (wait > 0) return;
		if (i === answer) return pass();
		const f = readFail();
		f.n++;
		wrong = true;
		if (f.n >= 5) {
			f.n = 0;
			f.lvl++;
			const sec = Math.min(60 * 2 ** (f.lvl - 1), 3600);
			f.until = Date.now() + sec * 1000;
			saveFail(f);
			block(sec);
		} else {
			left = 5 - f.n;
			saveFail(f);
			make();
		}
	}

	onMount(() => {
		if (!(window as W).__captchaNeeded) return;
		show = true;
		document.documentElement.style.overflow = 'hidden';
		const f = readFail();
		left = 5 - f.n;
		if (f.until > Date.now()) block(Math.ceil((f.until - Date.now()) / 1000));
		else make();
		return () => clearInterval(timer);
	});
</script>

{#if show}
	<div class="gate" role="dialog" aria-modal="true" aria-label="Проверка">
		<div class="card">
			<b class="logo">falkov</b>
			<h2>Подтвердите, что вы не робот</h2>
			<p>Выберите цвет, самый похожий на образец.</p>
			{#if wait > 0}
				<p class="err">Слишком много попыток. Попробуйте через {wait} сек.</p>
			{:else}
				<div class="target" style:background={target} aria-label="Образец цвета"></div>
				<div class="opts">
					{#each options as c, i (c + i)}
						<button type="button" style:background={c} aria-label={`Вариант ${i + 1}`} onclick={() => choose(i)}></button>
					{/each}
				</div>
			{/if}
			{#if wrong && !wait}<p class="err">Не тот цвет, попробуйте ещё раз (осталось попыток: {left}).</p>{/if}
			<p class="small">Не получается? <a href={tg} target="_blank" rel="noopener">Напишите нам в Telegram</a></p>
		</div>
	</div>
{/if}

<style>
	.gate { position: fixed; inset: 0; z-index: 100; background: linear-gradient(160deg, #0b3aa8, #002670); display: grid; place-items: center; padding: 16px; }
	.card { background: #fff; border-radius: 20px; padding: 28px 24px; width: min(420px, 100%); display: grid; gap: 14px; justify-items: center; text-align: center; }
	.logo { font-size: 28px; font-weight: 800; letter-spacing: -0.02em; color: #111; line-height: 1; }
	h2 { font-size: 22px; color: var(--navy); }
	p { color: var(--muted); font-size: 15px; }
	.target { width: 120px; height: 120px; border-radius: 50%; box-shadow: 0 6px 20px rgb(0 0 0 / 0.18); }
	.opts { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; width: 100%; }
	.opts button { aspect-ratio: 1; border-radius: 14px; border: 3px solid #fff; box-shadow: 0 0 0 1px #d6dbe6; cursor: pointer; transition: transform 0.15s; }
	.opts button:hover { transform: scale(1.06); box-shadow: 0 0 0 2px var(--navy); }
	.err { color: #d0263a; font-weight: 600; }
	.small { font-size: 13px; }
	.small a { color: var(--navy); font-weight: 600; }
</style>
