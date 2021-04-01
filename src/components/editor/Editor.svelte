<script>
	import { pipe, __, tap } from 'ramda';
	import { focus } from '../../stores.js';
	import { format } from '../../utils/prettier.js';
	import { bindAll } from '../../utils/object.js';
	import { nothing } from '../../utils/function.js';
	import { codemirror, fromTextArea, setSize, defineEx } from './codemirror.js';

	let editor = codemirror();
	let callback = nothing;

	export function edit(code, cb = nothing) {
		callback = cb;
		setValue(format(code));
	}

	const setEditor = tap(x => (editor = x));

	const focusable = focus.register(__, 'editor');

	const init = pipe(fromTextArea, setSize('100%', '100%'), setEditor, focusable);

	$: ({ setValue, getValue } = bindAll(editor));

	$: onChange = pipe(nothing, getValue, format, tap(setValue), callback);

	$: defineEx('write', 'w', onChange);
	$: defineEx('swrite', 'sw', nothing);
</script>

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

<div><textarea use:init /></div>

<!--
	// TODO scroll after format, example:
	/* const { left, top } = editor.getScrollInfo(); 
	 editor.setValue((value = new_value)); 
	 editor.scrollTo(left, top); */
-->
