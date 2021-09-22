<script>
	import { pipe, prop, __ } from 'ramda';
	import codemirror from './codemirror.js';
	import { dispatchEvent } from '../../utils/effects.js';
	import { noop } from '../../utils/function.js';
	import { focus } from '../../stores.js';

	let textarea = null;
	let callback = noop;
	let title = '';

	export function edit(label, code, cb = noop) {
		title = label;
		callback = cb;
		dispatchEvent(textarea, 'value', code);
	}

	$: onWrite = pipe(prop('detail'), callback);
</script>

<div class="container">
	{#if title !== ''}
		<h3>{title}</h3>
	{/if}
	<div class="editor">
		<textarea use:codemirror={focus.register('editor')} bind:this={textarea} on:write={onWrite} />
	</div>
</div>

<style>
	* {
		--title-margin: 0.3rem;
		--margin: 5px;
		background-color: var(--background-dark);
	}

	h3 {
		font-weight: bold;
		font-size: 1.3rem;
		font-family: var(--font-family);
		border-bottom-color: var(--background-light) !important;
		border-bottom: 2px solid;
		color: var(--white);
		margin: 0;
		margin-left: var(--margin);
		margin-top: var(--title-margin);
		padding-bottom: var(--title-margin);
	}

	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.editor {
		box-sizing: border-box;
		flex-grow: 1;
		padding: var(--margin);
		height: 100%;
		width: 100%;
	}

	:global(.CodeMirror *) {
		font-family: var(--font-family-mono);
		font-size: 0.9rem;
	}

	:global(.CodeMirror-dialog-bottom > pre) {
		margin: 2px 0 0 0;
	}

	:global(.CodeMirror-dialog-bottom > span[style]),
	:global(.CodeMirror-dialog input) {
		font-family: var(--font-family-mono) !important;
	}

	:global(.CodeMirror-dialog-bottom) {
		border-top-color: var(--background-light) !important;
		border-top: 2px solid;
	}
</style>
