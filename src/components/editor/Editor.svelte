<script>
	import { pipe, __, tap, propEq } from 'ramda';
	import { focus, nodes } from '../../stores.js';
	import { format } from '../../utils/prettier.js';
	import { bindAll } from '../../utils/object.js';
	import { assign } from '../../utils/impure.js';
	import { nothing } from '../../utils/function.js';
	import { codemirror, fromTextArea, setSize, defineEx } from './codemirror.js';

	let spec = { code: '' };

	export function editSpec(x) {
		spec = x;
		setValue(format(spec.code));
	}

	let editor = codemirror();

	const setEditor = tap((x) => (editor = x));

	const init = pipe(fromTextArea, setSize('100%', '100%'), setEditor, focus.register(__, 'editor'));

	$: ({ setValue, getValue } = bindAll(editor));

	$: onChange = pipe(nothing, getValue, format, tap(setValue), (x) => {
		spec.code = x;
		/* nodes.filter(propEq('spec', spec.name)).forEach(assign({ updated: Date.now() })); */
		nodes.filter(propEq('spec', spec.name)).forEach((x) => x.assign({ updated: Date.now() }));
	});

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









	/* const update = pipe( 
	 	propEq('spec'), 
	 	nodes.filter, 
	 	forEach((x) => x.assign({ updated: Date.now() })) 
	 ); */
	// TODO scroll after format, example:
	/* const { left, top } = editor.getScrollInfo(); 
	 editor.setValue((value = new_value)); 
	 editor.scrollTo(left, top); */
	-->
