<script lang="ts">
	import type { MuralKind } from '#lib/data.ts';

	// Демо-«фотообои», нарисованные в SVG. В реальном каталоге — превью из базы.
	let { kind, palette, seed = 1 }: { kind: MuralKind; palette: string[]; seed?: number } = $props();

	const [c0, c1, c2, c3] = $derived(palette);
	const uid = $derived(`m${seed}${kind}`);

	function rnd(n: number) {
		const x = Math.sin(seed * 9301 + n * 49297) * 233280;
		return x - Math.floor(x);
	}

	function ridge(base: number, amp: number, k: number) {
		let d = `M0 400 L0 ${base}`;
		for (let x = 0; x <= 300; x += 30) {
			const y = base - amp * (0.4 + rnd(x + k) * 0.6) * Math.abs(Math.sin((x + k * 40) / 55));
			d += ` L${x} ${y.toFixed(1)}`;
		}
		return d + ' L300 400 Z';
	}

	function leaf(cx: number, cy: number, len: number, ang: number) {
		const r = (ang * Math.PI) / 180;
		const ex = cx + Math.cos(r) * len;
		const ey = cy + Math.sin(r) * len;
		const nx = -Math.sin(r) * len * 0.28;
		const ny = Math.cos(r) * len * 0.28;
		const mx = (cx + ex) / 2;
		const my = (cy + ey) / 2;
		return `M${cx} ${cy} Q${mx + nx} ${my + ny} ${ex} ${ey} Q${mx - nx} ${my - ny} ${cx} ${cy} Z`;
	}

	const leaves = $derived(
		Array.from({ length: 14 }, (_, i) => ({
			d: leaf(rnd(i) * 300, 120 + rnd(i + 50) * 300, 70 + rnd(i + 9) * 80, -150 + rnd(i + 3) * 120),
			fill: [c1, c2, c3][i % 3],
			o: 0.65 + rnd(i + 7) * 0.35
		}))
	);
</script>

<svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Пример дизайна">
	<defs>
		<linearGradient id="{uid}g" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color={c0} />
			<stop offset="1" stop-color={c1} />
		</linearGradient>
	</defs>
	<rect width="300" height="400" fill="url(#{uid}g)" />

	{#if kind === 'mountains'}
		<circle cx={200 + rnd(1) * 60} cy="110" r="34" fill={c0} opacity="0.9" />
		<path d={ridge(250, 110, 1)} fill={c1} opacity="0.8" />
		<path d={ridge(300, 120, 2)} fill={c2} opacity="0.85" />
		<path d={ridge(350, 90, 3)} fill={c3} />
	{:else if kind === 'botanical'}
		{#each leaves as l}
			<path d={l.d} fill={l.fill} opacity={l.o} />
		{/each}
	{:else if kind === 'geometry'}
		{#each Array.from({ length: 6 }) as _, i}
			<path
				d="M0 {60 + i * 60} Q150 {20 + i * 60 + rnd(i) * 40} 300 {70 + i * 60} L300 400 L0 400 Z"
				fill={[c1, c2, c3][i % 3]}
				opacity={0.35 + i * 0.1}
			/>
		{/each}
		<circle cx="90" cy="120" r="46" fill="none" stroke={c3} stroke-width="2" />
	{:else if kind === 'waves'}
		{#each Array.from({ length: 7 }) as _, i}
			<path
				d="M0 {150 + i * 38} C75 {120 + i * 38} 150 {190 + i * 38} 300 {140 + i * 38} L300 400 L0 400 Z"
				fill={i % 2 ? c2 : c3}
				opacity={0.25 + i * 0.1}
			/>
		{/each}
	{:else if kind === 'arches'}
		{#each [0, 1, 2] as i}
			<path
				d="M{30 + i * 90} 400 L{30 + i * 90} {210 - i * 20} A45 45 0 0 1 {120 + i * 90} {210 - i * 20} L{120 + i * 90} 400 Z"
				fill={[c1, c2, c3][i]}
			/>
		{/each}
		<circle cx="230" cy="90" r="30" fill={c3} opacity="0.7" />
	{:else}
		<circle cx="150" cy="300" r="120" fill={c2} opacity="0.6" />
		{#each Array.from({ length: 5 }) as _, i}
			<ellipse
				cx={rnd(i) * 300}
				cy={60 + i * 50}
				rx={60 + rnd(i + 4) * 60}
				ry="18"
				fill={c0}
				opacity="0.8"
			/>
		{/each}
		<path d={ridge(360, 50, 5)} fill={c3} opacity="0.8" />
	{/if}
</svg>

<style>
	svg {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
