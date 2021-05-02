<script>
	import { cond, __, whereEq, pipe, juxt } from 'ramda';
	import { stopPropagation } from '../utils/dom.js';
	import { nothing } from '../utils/function.js';
	import normal from '../modes/normal.js';
	import visual from '../modes/visual.js';
	import { focus, thunks } from '../stores.js';

	const { setSelection, setMode, modeEq, focusEq } = thunks;

	const keydown = cond([
		[whereEq({ key: 'w', ctrlKey: true }), pipe(stopPropagation, focus.next)],
		[whereEq({ key: 'K' }), pipe(stopPropagation, focus.next)],
		[whereEq({ key: 'J' }), pipe(stopPropagation, focus.next)],
		[focusEq('editor'), nothing],
		[whereEq({ key: 'Escape' }), juxt([setSelection([]), setMode('normal')])],
		[modeEq('insert'), nothing],
		[whereEq({ key: 'p', ctrlKey: true }), setMode('select-menu')],
		[whereEq({ key: 'f' }), setMode('connect')],
		[whereEq({ key: 't' }), setMode('to')],
		[whereEq({ key: 'v' }), setMode('visual')],
		[whereEq({ key: 'V' }), setMode('visual-line')],
		[modeEq('normal'), normal],
		[modeEq('visual'), visual],
		[modeEq('visual-line'), visual],
	]);
</script>

<svelte:window on:keydown|capture={keydown} />
