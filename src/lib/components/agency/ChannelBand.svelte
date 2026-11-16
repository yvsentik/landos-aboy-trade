<script lang="ts">
	import { asset } from '$app/paths';
	import { channel, maxChannel } from '#lib/agency.ts';

	// Плашка каналов с кейсами: Telegram и Макс. variant меняет только мобильную раскладку.
	let { variant = 'a' }: { variant?: 'a' | 'b' | 'c' } = $props();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const maxIcon = asset('/img/icons/max.png' as any);
</script>

<div class="band v{variant}">
	<div class="nums">
		<div><b>1 000+</b><span>подписчиков</span></div>
		<div><b>50+</b><span>кейсов</span></div>
	</div>
	<p>в наших каналах в Telegram и Максе. Разбираем проекты клиентов с цифрами и скриншотами.</p>
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

<style>
	.band { background: var(--navy); color: #fff; border-radius: 16px; padding: 36px 44px; display: flex; align-items: center; gap: 36px; }
	.nums { display: flex; gap: 36px; flex: none; }
	.nums div { display: grid; }
	.nums b { font-size: 44px; font-weight: 800; line-height: 1; }
	.nums span { opacity: 0.85; margin-top: 4px; }
	p { font-size: 18px; opacity: 0.9; }
	.subs { flex: none; margin-left: auto; display: grid; gap: 8px; }
	.subs a { display: flex; align-items: center; gap: 10px; background: #fff; color: var(--navy); font-weight: 700; padding: 11px 18px; border-radius: 8px; white-space: nowrap; }
	.subs a:hover { background: var(--soft); }
	.subs svg, .subs img { width: 26px; height: 26px; flex: none; }
	.sm, i { display: none; font-style: normal; }

	@media (max-width: 1000px) {
		.band { flex-wrap: wrap; padding: 28px; gap: 20px; }
		.subs { margin-left: 0; }
	}

	@media (max-width: 640px) {
		.band { padding: 20px 16px; gap: 14px; }
		.lg { display: none; }
		.sm { display: inline; }

		/* А: цифры по центру, две кнопки в ряд */
		.va { display: grid; justify-items: center; text-align: center; }
		.va .nums { gap: 28px; }
		.va .nums b { font-size: 34px; }
		.va p { font-size: 15px; }
		.va .subs { width: 100%; grid-template-columns: 1fr 1fr; }
		.va .subs a { justify-content: center; padding: 11px 8px; }

		/* Б: строка цифр и две плитки с крупными логотипами */
		.vb { display: grid; }
		.vb .nums { gap: 8px 18px; flex-wrap: wrap; align-items: baseline; }
		.vb .nums div { display: flex; align-items: baseline; gap: 6px; }
		.vb .nums b { font-size: 26px; }
		.vb .nums span { margin: 0; font-size: 14px; }
		.vb p { display: none; }
		.vb .subs { width: 100%; grid-template-columns: 1fr 1fr; gap: 10px; }
		.vb .subs a { flex-direction: column; gap: 6px; padding: 16px 8px 14px; border-radius: 14px; }
		.vb .subs svg, .vb .subs img { width: 46px; height: 46px; }
		.vb .sm { font-size: 17px; }
		.vb i { display: block; font-size: 13px; font-weight: 600; color: var(--blue); }

		/* В: компактная строка – цифры слева, круглые значки справа */
		.vc { flex-wrap: nowrap; align-items: center; gap: 12px; }
		.vc .nums { display: grid; gap: 2px; flex: 1; }
		.vc .nums div { display: flex; align-items: baseline; gap: 6px; }
		.vc .nums b { font-size: 24px; }
		.vc .nums span { margin: 0; font-size: 14px; }
		.vc p { display: none; }
		.vc .subs { grid-template-columns: auto auto; gap: 10px; }
		.vc .subs a { padding: 9px; border-radius: 50%; }
		.vc .subs svg, .vc .subs img { width: 36px; height: 36px; }
		.vc .sm { display: none; }
	}
</style>
