<script lang="ts">
	import { prod } from '#lib/data.ts';
	import Icon from './Icon.svelte';
</script>

<!-- Главная боль ниши — цвет. Блок в духе «Пересчитаем смету» у okonti.ru -->
<section>
	<div class="wrap">
		<div class="box">
			<img src={prod('colors')} alt="Подбор цвета на производстве" loading="lazy" />
			<div class="txt">
				<span class="badge">Гарантия цвета</span>
				<h2>Цвет совпадёт с образцом — или перепечатаем бесплатно</h2>
				<ul>
					<li><Icon name="check" size={20} />Бесплатный пробник материала и цветопроба вашего дизайна</li>
					<li><Icon name="check" size={20} />Подгоним оттенок под ваши стены, мебель и текстиль</li>
					<li><Icon name="check" size={20} />Печатаем, только когда вы утвердили цвет</li>
				</ul>
				<a class="btn btn-primary" href="#lead"><Icon name="gift" size={20} />Получить пробник бесплатно</a>
			</div>
		</div>
	</div>
</section>

<style>
	.box {
		display: grid;
		grid-template-columns: 1fr 1.1fr;
		background: var(--soft);
		border-radius: 20px;
		overflow: hidden;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		min-height: 280px;
	}

	.txt {
		padding: 40px;
		display: grid;
		gap: 18px;
		align-content: center;
		justify-items: start;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 10px;
	}

	li {
		display: flex;
		gap: 10px;
	}

	li :global(svg) {
		flex: none;
		color: var(--green);
		margin-top: 2px;
	}

	@media (max-width: 820px) {
		.box {
			grid-template-columns: 1fr;
		}
		img {
			min-height: 0;
			aspect-ratio: 16 / 9;
		}
		.txt {
			padding: 24px 18px;
		}
	}
</style>
