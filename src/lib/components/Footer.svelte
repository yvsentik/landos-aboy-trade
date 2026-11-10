<script lang="ts">
	import { brand, styles, rooms } from '#lib/data.ts';
</script>

<footer>
	<div class="wrap cols">
		<div>
			<b class="logo">{brand.name}</b>
			<p>Производим фотообои и фрески в Москве. Печать по размеру стены за 2 дня.</p>
			<a class="phone" href={brand.phoneHref}>{brand.phone}</a>
			<p>{brand.hours}</p>
		</div>
		<div>
			<h4>Каталог</h4>
			<a href="#catalog">Фотообои</a>
			<a href="#catalog">Фрески</a>
			<a href="#catalog">Детские обои</a>
			<a href="#catalog">Бесшовные обои</a>
			<a href="#lead">Своё изображение</a>
		</div>
		<div>
			<h4>Стили</h4>
			{#each styles.slice(0, 6) as s}<a href="#styles">{s.name}</a>{/each}
		</div>
		<div>
			<h4>Комнаты</h4>
			{#each rooms.slice(0, 6) as r}<a href="#styles">{r.name}</a>{/each}
		</div>
		<div>
			<h4>Покупателям</h4>
			<a href="#steps">Доставка и монтаж</a>
			<a href="#materials">Цены</a>
			<a href="#lead">Бесплатный пробник</a>
			<a href="#production">Производство</a>
		</div>
	</div>
	<div class="wrap bottom">
		<span>© 2026 {brand.name}. {brand.city}</span>
		<span>Политика конфиденциальности</span>
	</div>
</footer>

<style>
	footer {
		margin-top: 64px;
		background: var(--navy);
		color: #c9d6f2;
		padding: 48px 0 24px;
		font-size: 14px;
	}

	.cols {
		display: grid;
		grid-template-columns: 1.4fr repeat(4, 1fr);
		gap: 24px;
	}

	.cols div {
		display: grid;
		gap: 8px;
		align-content: start;
	}

	.logo {
		color: #fff;
		font-size: 22px;
	}

	.phone {
		color: #fff;
		font-size: 20px;
		font-weight: 700;
	}

	h4 {
		margin: 0 0 4px;
		color: #fff;
		font-size: 15px;
	}

	a:hover {
		color: #fff;
	}

	.bottom {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		margin-top: 32px;
		padding-top: 18px;
		border-top: 1px solid rgb(255 255 255 / 0.12);
		font-size: 13px;
	}

	@media (max-width: 820px) {
		.cols {
			grid-template-columns: 1fr 1fr;
		}
		.cols > div:first-child {
			grid-column: span 2;
		}
		.bottom {
			flex-direction: column;
		}
	}
</style>
