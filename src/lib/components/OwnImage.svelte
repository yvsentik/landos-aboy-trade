<script lang="ts">
	import { prod } from '#lib/data.ts';
	import Icon from './Icon.svelte';
</script>

<section>
	<div class="wrap">
		<div class="box">
			<div>
				<h2>Нет подходящего дизайна? Напечатаем ваш</h2>
				<p>
					Пришлите фото, картину или референс — дизайнер подготовит макет под размер стены
					и согласует его с вами. Бесплатно.
				</p>
			</div>
			<a class="btn btn-white" href="#lead"><Icon name="upload" size={20} />Отправить изображение</a>
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
