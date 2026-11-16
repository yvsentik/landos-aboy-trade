<script lang="ts">
	import { asset } from '$app/paths';
	import Icon from '#lib/components/Icon.svelte';
	import AgencyForm from './AgencyForm.svelte';
	import { tg, max } from '#lib/agency.ts';
	import { ui } from '#lib/agencyModal.svelte.ts';

	// Окно выбора способа связи: Telegram, Макс или форма заявки.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const maxIcon = asset('/img/icons/max.png' as any);
	let dialog = $state<HTMLDialogElement>();

	$effect(() => {
		if (!dialog) return;
		if (ui.open && !dialog.open) dialog.showModal();
		else if (!ui.open && dialog.open) dialog.close();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog bind:this={dialog} onclose={() => (ui.open = false)} onclick={(e) => e.target === dialog && (ui.open = false)}>
	<div class="box">
		<button type="button" class="x" onclick={() => (ui.open = false)} aria-label="Закрыть">×</button>
		{#if ui.form}
			<h3>Пришлите сайт для аудита</h3>
			<p>Оставьте адрес сайта и телефон. Аудит бесплатный.</p>
			<AgencyForm id="zayavka-modal" title="Пришлите сайт для аудита" />
		{:else}
			<h3>Как вам удобнее начать?</h3>
			<p>Напишите нам в мессенджер или оставьте сайт в форме. Аудит бесплатный.</p>
			<div class="ways">
				<a href={tg} target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#29a9eb" /><path fill="#fff" d="M5.400 11.700l11.300-4.400c.5-.2 1 .1.800.9l-1.900 9c-.1.600-.5.800-1 .5l-2.900-2.100-1.400 1.300c-.2.2-.3.300-.6.300l.2-3 5.400-4.900c.2-.2 0-.3-.3-.1l-6.700 4.200-2.900-.9c-.6-.2-.6-.6 0-.8z" /></svg><b>Telegram</b><span>Написать менеджеру</span></a>
				<a href={max} target="_blank" rel="noopener"><img src={maxIcon} alt="" /><b>Макс</b><span>Написать менеджеру</span></a>
				<button type="button" onclick={() => (ui.form = true)}><i><Icon name="send" size={26} /></i><b>Форма заявки</b><span>Оставить сайт и телефон</span></button>
			</div>
		{/if}
	</div>
</dialog>

<style>
	dialog[open] { animation: pop 0.22s ease-out; }
	@keyframes pop { from { opacity: 0; transform: translateY(14px) scale(0.97); } }
	dialog { border: 0; padding: 0; border-radius: 18px; width: min(640px, calc(100vw - 24px)); max-height: calc(100dvh - 24px); background: #fff; color: inherit; box-shadow: 0 24px 80px rgb(0 20 70 / 0.35); }
	dialog::backdrop { background: rgb(0 20 60 / 0.55); }
	.box { position: relative; padding: 32px; display: grid; gap: 12px; }
	.x { position: absolute; top: 10px; right: 12px; width: 40px; height: 40px; border: 0; background: none; font-size: 30px; line-height: 1; cursor: pointer; color: var(--muted); }
	h3 { font-size: 26px; font-weight: 800; padding-right: 36px; }
	p { color: var(--muted); }
	.ways { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 8px; }
	.ways a, .ways button { font: inherit; color: inherit; cursor: pointer; text-align: center; display: grid; justify-items: center; gap: 6px; padding: 20px 10px; border: 2px solid var(--line); border-radius: 14px; background: #fff; }
	.ways a:hover, .ways button:hover { border-color: var(--blue); background: var(--soft); }
	.ways svg, .ways img { width: 44px; height: 44px; }
	.ways i { width: 44px; height: 44px; border-radius: 50%; background: var(--blue); color: #fff; display: grid; place-items: center; }
	.ways i :global(svg) { width: 24px; height: 24px; }
	.ways b { font-size: 18px; }
	.ways span { color: var(--muted); font-size: 14px; }
	.box :global(.offer) { grid-template-columns: 1fr; padding: 20px; gap: 14px; }
	.box :global(.offer h3) { display: none; }
	.box :global(.offer form) { grid-template-columns: 1fr; }

	@media (max-width: 560px) {
		.box { padding: 24px 18px; }
		h3 { font-size: 22px; }
		.ways { grid-template-columns: 1fr; }
		.ways a, .ways button { grid-template-columns: 44px 1fr; justify-items: start; text-align: left; column-gap: 14px; row-gap: 0; padding: 14px; }
		.ways svg, .ways img, .ways i { grid-row: span 2; align-self: center; }
	}
</style>
