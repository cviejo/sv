<script>
	import { pipe, prop, __ } from 'ramda';
	import codemirror from './codemirror.js';
	import { dispatchEvent } from '../../utils/effects.js';
	import { nothing } from '../../utils/function.js';
	import { focus } from '../../stores.js';

	let textarea = null;
	let callback = nothing;

	export function edit(code, cb = nothing) {
		callback = cb;
		dispatchEvent(textarea, 'value', code);
	}

	$: onWrite = pipe(prop('detail'), callback);
</script>

<div>
	<textarea use:codemirror={focus.register('editor')} bind:this={textarea} on:write={onWrite} />
</div>

<style>
	div {
		background-color: var(--background-dark);
		padding: 5px;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}
	:global(.CodeMirror-dialog-bottom > span[style]),
	:global(.CodeMirror-dialog input) {
		font-family: var(--font-family) !important;
	}
	:global(.CodeMirror-dialog-bottom) {
		border-top-color: var(--background-light) !important;
		border-top: 2px solid;
	}
</style>
