<script lang="ts">
	import { onMount } from 'svelte';
	import { asset } from '$app/paths';

	// Своя капча «выберите похожий цвет» для новых посетителей.
	// Решение «показывать или нет» – в app.html (window.__captchaNeeded).
	// Прошёл – 30 дней не показываем; Метрика стартует только после прохождения.
	type W = Window & { __captchaNeeded?: boolean; __ymStart?: () => void };
	type Ch = { target: string; options: string[]; token: string };

	const DAYS = 30;
	let show = $state(false);
	let ch = $state<Ch | null>(null);
	let busy = $state(false);
	let wrong = $state(false);
	let left = $state(5);
	let wait = $state(0);
	let timer: ReturnType<typeof setInterval>;

	function block(sec: number) {
		wait = sec;
		clearInterval(timer);
		timer = setInterval(() => {
			if (--wait <= 0) {
				clearInterval(timer);
				wrong = false;
				load();
			}
		}, 1000);
	}
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

	async function load() {
		try {
			const r = await fetch('/api/captcha', { cache: 'no-store' });
			if (!r.ok) return pass(); // сервер недоступен – не держим человека перед закрытой дверью
			ch = await r.json();
		} catch {
			pass();
		}
	}

	async function choose(i: number) {
		if (!ch || busy) return;
		busy = true;
		try {
			const r = await fetch('/api/captcha', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token: ch.token, choice: i })
			});
			if (r.ok || r.status >= 500 || r.status === 404) pass();
			else {
				const d = await r.json().catch(() => ({}));
				wrong = true;
				left = d.left ?? left;
				if (d.wait > 0) {
					ch = null;
					block(d.wait);
				} else await load();
			}
		} catch {
			pass();
		}
		busy = false;
	}

	onMount(() => {
		if (!(window as W).__captchaNeeded) return;
		show = true;
		document.documentElement.style.overflow = 'hidden';
		load();
	});
</script>

{#if show}
	<div class="gate" role="dialog" aria-modal="true" aria-label="Проверка">
		<div class="card">
			<img src={logo} alt="Обоитрейд" width="214" height="40" />
			<h2>Подтвердите, что вы не робот</h2>
			<p>Выберите цвет, самый похожий на образец.</p>
			{#if wait > 0}
				<p class="err">Слишком много попыток. Попробуйте через {wait} сек.</p>
			{:else if ch}
				<div class="target" style:background={ch.target} aria-label="Образец цвета"></div>
				<div class="opts">
					{#each ch.options as c, i (c + i)}
						<button
							type="button"
							style:background={c}
							disabled={busy}
							aria-label={`Вариант ${i + 1}`}
							onclick={() => choose(i)}
						></button>
					{/each}
				</div>
			{:else}
				<p class="small">Загружаем…</p>
			{/if}
			{#if wrong && !wait}<p class="err">Не тот цвет, попробуйте ещё раз (осталось попыток: {left}).</p>{/if}
			<p class="small">
				Не получается? Позвоните <a href="tel:+79933434080">+7 (993) 343-40-80</a>
			</p>
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
		gap: 14px;
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

	.target {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		box-shadow: 0 6px 20px rgb(0 0 0 / 0.18);
	}

	.opts {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 12px;
		width: 100%;
	}

	.opts button {
		aspect-ratio: 1;
		border-radius: 14px;
		border: 3px solid #fff;
		box-shadow: 0 0 0 1px #d6dbe6;
		cursor: pointer;
		transition: transform 0.15s;
	}

	.opts button:hover:not(:disabled) {
		transform: scale(1.06);
		box-shadow: 0 0 0 2px var(--navy);
	}

	.err {
		color: #d0263a;
		font-weight: 600;
	}

	.small {
		font-size: 13px;
	}

	.small a {
		color: var(--navy);
		font-weight: 600;
	}
</style>
