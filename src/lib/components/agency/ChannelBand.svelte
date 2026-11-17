<script lang="ts">
	import { asset } from '$app/paths';
	import { channel, maxChannel } from '#lib/agency.ts';

	// Плашка каналов с кейсами: Telegram и Макс.
	// Компьютер – яркая плашка с крупными цифрами; телефон – строка цифр и две плитки с логотипами.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const maxIcon = asset('/img/icons/max.png' as any);
</script>

<div class="band">
	<span class="st">Кейсы в каналах</span>
	<div class="nums">
		<div><b>1 000+</b><span>подписчиков</span></div>
		<div><b>50+</b><span>кейсов</span></div>
	</div>
	<div class="r">
		<p>Разбираем проекты клиентов с цифрами и скриншотами</p>
		<div class="subs">
			<a href={channel} target="_blank" rel="noopener">
				<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#29a9eb" /><path fill="#fff" d="M5.400 11.700l11.300-4.400c.5-.2 1 .1.800.9l-1.900 9c-.1.600-.5.800-1 .5l-2.900-2.100-1.400 1.300c-.2.2-.3.300-.6.300l.2-3 5.400-4.900c.2-.2 0-.3-.3-.1l-6.700 4.200-2.900-.9c-.6-.2-.6-.6 0-.8z" /></svg>
				<span class="lg">Подписаться в Telegram</span><span class="sm">Telegram</span><i>Подписаться</i>
			</a>
			<a href={maxChannel} target="_blank" rel="noopener">
				<img src={maxIcon} alt="" />
				<span class="lg">Подписаться в Максе</span><span class="sm">Макс</span><i>Подписаться</i>
			</a>
		</div>
	</div>
</div>

<style>
	.band { position: relative; margin-top: 14px; background: linear-gradient(110deg, var(--blue), var(--navy) 70%); color: #fff; border-radius: 20px; padding: 44px 44px; display: flex; align-items: center; gap: 36px; }
	.st { position: absolute; top: -14px; left: 40px; background: var(--pink); font-weight: 800; padding: 8px 16px; border-radius: 8px; transform: rotate(-3deg); box-shadow: 0 6px 18px rgb(0 0 0 / 0.25); }
	.nums { display: flex; gap: 34px; flex: none; }
	.nums div { display: grid; }
	.nums b { font-size: 66px; font-weight: 800; line-height: 0.95; letter-spacing: -0.02em; white-space: nowrap; }
	.nums span { font-size: 18px; opacity: 0.9; margin-top: 6px; }
	.r { display: grid; gap: 16px; margin-left: auto; min-width: 0; }
	p { font-size: 20px; font-weight: 600; }
	.subs { display: flex; gap: 10px; }
	.subs a { display: flex; align-items: center; gap: 10px; background: #fff; color: var(--navy); font-weight: 800; font-size: 16px; padding: 15px 16px; border-radius: 10px; white-space: nowrap; }
	.subs a:hover { background: var(--soft); }
	.subs svg, .subs img { width: 28px; height: 28px; flex: none; }
	.sm, i { display: none; font-style: normal; }

	@media (max-width: 1240px) {
		.band { flex-direction: column; align-items: flex-start; gap: 22px; }
		.r { margin-left: 0; }
	}
	@media (max-width: 640px) {
		.band { padding: 26px 16px 16px; gap: 14px; border-radius: 16px; }
		.st { left: 14px; font-size: 14px; padding: 6px 12px; }
		.nums { gap: 6px 18px; flex-wrap: wrap; align-items: baseline; }
		.nums div { display: flex; align-items: baseline; gap: 6px; }
		.nums b { font-size: 26px; letter-spacing: 0; }
		.nums span { margin: 0; font-size: 14px; }
		p { display: none; }
		.r { width: 100%; }
		.subs { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
		.subs a { flex-direction: column; gap: 6px; padding: 16px 8px 14px; border-radius: 14px; }
		.subs svg, .subs img { width: 46px; height: 46px; }
		.lg { display: none; }
		.sm { display: inline; font-size: 17px; }
		i { display: block; font-size: 13px; font-weight: 600; color: var(--blue); }
	}
</style>
