<script lang="ts">
	import { onMount } from 'svelte';
	import { asset } from '$app/paths';

	// Яндекс SmartCaptcha для первого захода из поисковика.
	// Ключ и решение «показывать или нет» задаются в app.html (window.__captchaKey / __captchaNeeded).
	// Прошёл – 30 дней не показываем; Метрика стартует только после прохождения.
	type W = Window & {
		__captchaKey?: string;
		__captchaNeeded?: boolean;
		__ymStart?: () => void;
		smartCaptcha?: {
			render: (el: HTMLElement, o: Record<string, unknown>) => number;
			reset: (id?: number) => void;
		};
		__onCaptchaLoad?: () => void;
	};

	const DAYS = 30;
	let show = $state(false);
	let box = $state<HTMLDivElement>();
	let checking = $state(false);
	let widget: number | undefined;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const logo = asset('/img/icons/oboitrade-logo.png' as any);

	function pass() {
		try {
			localStorage.setItem('cpt_ok', String(Date.now() + DAYS * 864e5));
		} catch {
			/* без хранилища – покажем снова в следующий раз */
		}
		show = false;
		document.documentElement.style.overflow = '';
		(window as W).__ymStart?.();
	}

	async function onToken(token: string) {
		checking = true;
		try {
			const r = await fetch('/api/captcha', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token })
			});
			// сервер недоступен – пропускаем, чтобы не терять клиентов
			if (r.ok || r.status >= 500 || r.status === 404) pass();
			else (window as W).smartCaptcha?.reset(widget); // токен не принят – пройти ещё раз
		} catch {
			pass();
		}
		checking = false;
	}

	onMount(() => {
		const w = window as W;
		if (!w.__captchaNeeded || !w.__captchaKey) return;
		show = true;
		document.documentElement.style.overflow = 'hidden';

		const render = () => {
			if (!box || !w.smartCaptcha) return;
			widget = w.smartCaptcha.render(box, {
				sitekey: w.__captchaKey,
				hl: 'ru',
				callback: onToken
			});
		};
		w.__onCaptchaLoad = render;
		const s = document.createElement('script');
		s.src = 'https://smartcaptcha.yandexcloud.net/captcha.js?render=onload&onload=__onCaptchaLoad';
		s.defer = true;
		// капча не загрузилась (блокировщик, сеть) – не держим человека перед закрытой дверью
		s.onerror = pass;
		document.head.appendChild(s);
	});
</script>

{#if show}
	<div class="gate" role="dialog" aria-modal="true" aria-label="Проверка">
		<div class="card">
			<img src={logo} alt="Обоитрейд" width="214" height="40" />
			<h2>Подтвердите, что вы не робот</h2>
			<p>Одна проверка – и вы на сайте. Повторно спрашивать не будем.</p>
			<div class="cap" bind:this={box}></div>
			{#if checking}<p class="small">Проверяем…</p>{/if}
		</div>
	</div>
{/if}

<style>
	.gate {
		position: fixed;
		inset: 0;
		z-index: 100;
		background: linear-gradient(160deg, #0b3aa8, #002670);
		display: grid;
		place-items: center;
		padding: 16px;
	}

	.card {
		background: #fff;
		border-radius: 20px;
		padding: 28px 24px;
		width: min(420px, 100%);
		display: grid;
		gap: 12px;
		justify-items: center;
		text-align: center;
	}

	img {
		height: 36px;
		width: auto;
	}

	h2 {
		font-size: 22px;
		color: var(--navy);
	}

	p {
		color: var(--muted);
		font-size: 15px;
	}

	.cap {
		min-height: 102px;
		width: 100%;
		display: grid;
		place-items: center;
	}

	.small {
		font-size: 13px;
	}
</style>
