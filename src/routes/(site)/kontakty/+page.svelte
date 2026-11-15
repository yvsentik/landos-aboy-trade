<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import MaxLogo from '#lib/components/MaxLogo.svelte';
	import LeadForm from '#lib/components/LeadForm.svelte';
	import { brand } from '#lib/data.ts';
</script>

<svelte:head>
	<title>Контакты – {brand.name}</title>
	<meta name="description" content="Контакты: телефон +7 (993) 343-40-80, Макс, Telegram @oboitrade_moscow. Пришлите изображение – рассчитаем за 15 минут." />
</svelte:head>

<PageHero title="Контакты" sub="Пришлите изображение в мессенджер – рассчитаем за 15 минут." photo="workshop" />

<section>
	<div class="wrap">
		<div class="cards">
			<a class="card c" href={brand.phoneHref}>
				<span class="ic"><Icon name="phone" size={26} /></span>
				<h3>{brand.phone}</h3>
				<p>{brand.hours}</p>
			</a>
			<a class="card c" href={brand.max}>
				<span class="ic dark"><MaxLogo size={26} light /></span>
				<h3>Макс</h3>
				<p>Пришлите изображение и размеры стены</p>
			</a>
			<a class="card c" href={brand.telegram}>
				<span class="ic tg"><Icon name="send" size={26} /></span>
				<h3>Telegram</h3>
				<p>@oboitrade_moscow</p>
			</a>
			<a class="card c" href="https://oboitrade.ru/contacts/stores/">
				<span class="ic"><Icon name="factory" size={26} /></span>
				<h3>Магазины и самовывоз</h3>
				<p>Адреса и часы работы на oboitrade.ru</p>
			</a>
		</div>
	</div>
</section>

<LeadForm title="Оставьте телефон – перезвоним" text="Или пришлите изображение в Макс или Telegram." />

<style>
	.c:hover h3 {
		color: var(--blue);
	}

	.ic {
		width: 52px;
		height: 52px;
		border-radius: 14px;
		display: grid;
		place-items: center;
		background: var(--blue);
		color: #fff;
		margin-bottom: 6px;
	}

	.dark {
		background: #1f1f1f;
	}

	.tg {
		background: #2aabee;
	}
</style>
