<script lang="ts">
	// Форма заявки агентства: адрес сайта + телефон. Пока никуда не отправляет.
	let { title = 'Пришлите сайт для аудита', id = 'zayavka' }: { title?: string; id?: string } = $props();

	let sent = $state(false);
	const submit = (e: SubmitEvent) => {
		e.preventDefault();
		sent = true; // TODO: отправка заявки в CRM / Telegram
	};
</script>

<div class="offer" {id}>
	<h3>{title}</h3>
	{#if sent}
		<p class="ok">Заявка принята. Ответим сегодня.</p>
	{:else}
		<form onsubmit={submit}>
			<input class="field" required placeholder="Адрес сайта" />
			<input class="field" required type="tel" placeholder="Телефон" />
			<button class="btn btn-primary" type="submit">Получить бесплатный аудит</button>
		</form>
	{/if}
</div>

<style>
	.offer { scroll-margin-top: 80px; background: var(--soft); border-radius: 16px; padding: 32px; display: grid; grid-template-columns: 1fr 1.6fr; gap: 32px; align-items: center; }
	h3 { font-size: 24px; font-weight: 700; }
	form { display: grid; grid-template-columns: 1fr 1fr auto; gap: 10px; }
	.btn { border-radius: 8px; }
	.ok { font-weight: 700; font-size: 18px; color: var(--navy); }

	@media (max-width: 1000px) {
		.offer { grid-template-columns: 1fr; }
	}
	@media (max-width: 640px) {
		.offer { padding: 20px; scroll-margin-top: 130px; }
		form { grid-template-columns: 1fr; }
	}
</style>
