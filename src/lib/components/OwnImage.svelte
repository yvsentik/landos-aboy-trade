<script lang="ts">
	import { prod, brand } from '#lib/data.ts';
	import Icon from './Icon.svelte';
	import MaxLogo from './MaxLogo.svelte';

	// lite — версия без каталога: всё строится вокруг изображения клиента
	let { lite = false }: { lite?: boolean } = $props();
</script>

<section id="own">
	<div class="wrap">
		<div class="box">
			<div>
				{#if lite}
					<h2>Обои на заказ по вашей идее</h2>
					<p>
						Пришлите фото, картину, референс или просто опишите идею — дизайнер подготовит макет
						под размер стены, рассчитает цену и согласует всё с вами. Бесплатно.
					</p>
				{:else}
					<h2>Нет подходящего дизайна? Напечатаем ваш</h2>
					<p>
						Пришлите фото, картину или референс — дизайнер подготовит макет под размер стены
						и согласует его с вами. Бесплатно.
					</p>
				{/if}
			</div>
			{#if lite}
				<div class="msg">
					<a class="btn btn-white" href={brand.max}><MaxLogo size={20} />Отправить в Макс</a>
					<a class="btn btn-white" href={brand.telegram}><Icon name="send" size={20} />Отправить в Telegram</a>
				</div>
			{:else}
				<a class="btn btn-white" href="#lead"><Icon name="upload" size={20} />Отправить изображение</a>
			{/if}
			<img src={prod('retouch')} alt="" loading="lazy" />
		</div>
	</div>
</section>

<style>
	.box {
		position: relative;
		overflow: hidden;
		border-radius: 20px;
		background: var(--blue);
		color: #fff;
		padding: 36px 40px;
		display: grid;
		grid-template-columns: 1fr auto 220px;
		gap: 28px;
		align-items: center;
	}

	.msg {
		display: grid;
		gap: 10px;
	}

	p {
		opacity: 0.9;
		margin-top: 10px;
		max-width: 560px;
	}

	img {
		width: 220px;
		height: 160px;
		object-fit: cover;
		border-radius: 14px;
		transform: rotate(3deg);
		box-shadow: 0 10px 30px rgb(0 0 0 / 0.25);
	}

	@media (max-width: 900px) {
		.box {
			grid-template-columns: 1fr;
			padding: 24px 18px;
		}
		img {
			display: none;
		}
	}
</style>
