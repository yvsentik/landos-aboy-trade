<script lang="ts">
	import { brand } from '#lib/data.ts';

	// Подвал основного сайта: ссылки на все страницы
</script>

<footer>
	<div class="wrap cols">
		<div>
			<b class="logo">{brand.name}</b>
			<p>Фотообои и фрески на заказ по вашему размеру. Печать от 3 дней, доставка по всей России.</p>
			<a class="phone" href={brand.phoneHref}>{brand.phone}</a>
			<a href={brand.max}>Написать в Макс</a>
			<a href={brand.telegram}>Telegram: @oboitrade_moscow</a>
			<p>{brand.hours}</p>
		</div>
		<div>
			<h4>Печатаем</h4>
			<a href="/fotooboi/">Фотообои</a>
			<a href="/freski/">Фрески</a>
			<a href="/oboi-na-zakaz/">Обои на заказ</a>
			<a href="/catalog/">Каталог</a>
		</div>
		<div>
			<h4>Покупателям</h4>
			<a href="/ceny/">Цены</a>
			<a href="/dostavka/">Доставка и монтаж</a>
			<a href="/probnik/">Бесплатный пробник</a>
		</div>
		<div>
			<h4>Компания</h4>
			<a href="/proizvodstvo/">Производство</a>
			<a href="/kontakty/">Контакты</a>
		</div>
		<div>
			<h4>Отправить изображение</h4>
			<a href={brand.max}>Макс</a>
			<a href={brand.telegram}>Telegram</a>
			<a href={brand.phoneHref}>Позвонить</a>
		</div>
	</div>
	<div class="wrap bottom">
		<span>© 2026 {brand.name}</span>
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
