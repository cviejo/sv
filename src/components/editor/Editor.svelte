<script>
	import { __ } from 'ramda';
	import codemirror from './codemirror.js';
	import { dispatchEvent } from '../../utils/impure.js';
	import { nothing } from '../../utils/function.js';
	import { focus } from '../../stores.js';

	let textarea = null;
	let callback = nothing;

	export function edit(code, cb = nothing) {
		callback = cb;
		dispatchEvent(textarea, 'value', code);
	}

	let onon = focus.register(__, 'editor');
</script>

<div>
	<textarea use:codemirror={onon} bind:this={textarea} on:write={x => callback(x.detail)} />
</div>

<style>
	div {
		background-color: var(--background-dark);
		padding: 10px;
		padding-bottom: 0px;
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
