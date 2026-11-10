<svelte:head>
	<title>Заебись!</title>
</svelte:head>

<main>
	<h1>Заебись<span>!</span></h1>
</main>

<style>
	:global(html, body) {
		margin: 0;
		height: 100%;
		background: #fff;
	}

	main {
		min-height: 100vh;
		display: grid;
		place-items: center;
		padding: 0 16px;
		box-sizing: border-box;
	}

	h1 {
		margin: 0;
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-weight: 700;
		font-size: clamp(48px, 12vw, 160px);
		letter-spacing: -0.04em;
		line-height: 1;
		color: #000;
	}

	span {
		color: #e30613;
	}
</style>
