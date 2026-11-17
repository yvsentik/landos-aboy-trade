<script lang="ts">
	import { asset } from '$app/paths';

	// Видео руководителя с розовым стикером и кнопкой воспроизведения.
	let { label = 'О бесплатном аудите сайта' }: { label?: string } = $props();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const a = (f: string) => asset(f as any);

	let video = $state<HTMLVideoElement>();
	let started = $state(false);
	const play = () => {
		started = true;
		video?.play();
	};
</script>

<figure>
	<figcaption><span class="sticker">{label}</span><svg class="arr" viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 8c22 0 38 12 40 40" /><path d="M34 40l14 9 6-16" /></svg></figcaption>
	<div class="vid">
		<video bind:this={video} src={a('/video/podhod.mp4')} poster={a('/video/podhod.jpg')} controls={started} playsinline preload="none"></video>
		{#if !started}
			<button type="button" class="playbtn" onclick={play} aria-label="Смотреть видео о бесплатном аудите">
				<span><svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.540 6.347c1.295.712 1.295 2.573 0 3.286L7.280 19.990c-1.250.687-2.779-.217-2.779-1.643V5.653Z" /></svg></span>
			</button>
		{/if}
	</div>
</figure>

<style>
	figure { margin: 0; }
	.vid { position: relative; }
	.playbtn { position: absolute; inset: 0; border: 0; background: none; cursor: pointer; display: grid; place-items: center; border-radius: 10px; }
	.playbtn span { width: 92px; height: 92px; border-radius: 50%; background: rgb(236 239 244 / 0.45); border: 3px solid rgb(255 255 255 / 0.9); display: grid; place-items: center; transition: background 0.15s, transform 0.15s; }
	.playbtn:hover span { background: rgb(236 239 244 / 0.7); transform: scale(1.06); }
	.playbtn svg { display: block; width: 40px; height: 40px; }
	video { width: 100%; aspect-ratio: 640 / 350; display: block; border-radius: 10px; background: #000; }
	figcaption { position: relative; z-index: 2; display: flex; align-items: center; gap: 10px; margin-bottom: -12px; padding-left: 14px; font-weight: 700; font-size: 14px; }
	.sticker { background: var(--pink); color: #fff; padding: 7px 14px; border-radius: 7px; transform: rotate(-4deg); box-shadow: 0 6px 18px rgb(0 0 0 / 0.3); }
	.arr { width: 34px; height: 34px; flex: none; transform: translateY(-8px); }

	@media (max-width: 640px) {
		figcaption { font-size: 13px; padding-left: 8px; }
		.playbtn span { width: 68px; height: 68px; }
		.playbtn svg { width: 30px; height: 30px; }
	}
</style>
