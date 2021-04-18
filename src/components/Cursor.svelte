<script>
	import { mode, cursor } from '../stores.js';
	import { sizes } from '../config.js';

	const colors = {
		connect: 'rgba(163, 190, 140, 0.2)',
		insert: 'rgb(143, 161, 179)',
		normal: 'rgb(163, 190, 140)',
		visual: 'rgb(180, 142, 175)',
		'visual-line': 'rgb(180, 142, 175)',
	};

	$: style = `
		background-color: ${colors[$mode]};
		top: ${$cursor.y}px;
		left: ${$cursor.x}px;
		width: ${sizes.step}px;
		height: ${sizes.step}px;
	`;
</script>

<style>
	@keyframes pulsate {
		0% {
			opacity: 0.9;
		}
		50% {
			opacity: 0.4;
		}
		100% {
			opacity: 0.9;
		}
	}
	div {
		position: absolute;
		animation: pulsate 1.5s infinite;
	}
</style>

<div {style} />
