<script lang="ts">
	import { brand, prod } from '#lib/data.ts';
	import Icon from './Icon.svelte';
	import MaxLogo from './MaxLogo.svelte';

	let {
		title = 'Получите бесплатный пробник и расчёт за 15 минут',
		text = 'Дизайнер подберёт сюжет под вашу стену, а курьер привезёт образец материала и цветопробу.'
	}: { title?: string; text?: string } = $props();

	let sent = $state(false);

	function submit(e: SubmitEvent) {
		e.preventDefault();
		// TODO: подключить отправку заявки (CRM / Telegram-бот / почта)
		sent = true;
	}
</script>

<section id="lead">
	<div class="wrap">
		<div class="box" style:--bg="url({prod('warehouse')})">
			<div class="txt">
				<h2>{title}</h2>
				<p>{text}</p>
				<div class="alt">
					<a href={brand.phoneHref}><Icon name="phone" size={18} />{brand.phone}</a>
					<a href={brand.max}><MaxLogo size={18} light />Макс</a>
					<a href={brand.telegram}><Icon name="send" size={18} />Telegram</a>
				</div>
			</div>

			{#if sent}
				<div class="form done">
					<Icon name="check" size={40} />
					<h3>Заявка принята</h3>
					<p>Перезвоним в течение 15 минут в рабочее время.</p>
				</div>
			{:else}
				<form class="form" onsubmit={submit}>
					<input class="field" name="name" placeholder="Имя" autocomplete="name" />
					<input
						class="field"
						name="phone"
						type="tel"
						required
						placeholder="Телефон*"
						autocomplete="tel"
					/>
					<input class="field" name="size" placeholder="Размер стены, например 3 × 2,7 м" />
					<button class="btn btn-pink" type="submit">
						<Icon name="gift" size={20} />Получить пробник бесплатно
					</button>
					<small>Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных</small>
				</form>
			{/if}
		</div>
	</div>
</section>

<style>
	.box {
		position: relative;
		border-radius: 20px;
		overflow: hidden;
		padding: 48px;
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: 40px;
		align-items: center;
		color: #fff;
		background:
			linear-gradient(100deg, rgb(0 38 112 / 0.96) 35%, rgb(0 38 112 / 0.75)),
			var(--bg) center / cover;
	}

	.txt {
		display: grid;
		gap: 16px;
	}

	.txt p {
		opacity: 0.85;
	}

	.alt {
		display: flex;
		flex-wrap: wrap;
		gap: 10px 20px;
		margin-top: 6px;
	}

	.alt a {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-weight: 600;
	}

	.form {
		background: #fff;
		color: var(--text);
		border-radius: 16px;
		padding: 24px;
		display: grid;
		gap: 12px;
	}

	.form small {
		color: var(--muted);
		font-size: 12px;
	}

	.done {
		justify-items: center;
		text-align: center;
		padding: 40px 24px;
	}

	.done :global(svg) {
		color: var(--green);
	}

	@media (max-width: 820px) {
		.box {
			grid-template-columns: 1fr;
			padding: 24px 18px;
			gap: 24px;
		}
		.form {
			padding: 18px;
		}
	}
</style>
