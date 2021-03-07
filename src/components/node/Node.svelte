<script>
	import { mergeRight, tap, ap, map, pipe, prop } from 'ramda';
	import { onMount } from 'svelte';
	import IO from './IO.svelte';
	import DefaultContent from './DefaultContent.svelte';
	import MouseHandler from './MouseHandler.svelte';
	import { bindAll } from '../../utils/object.js';
	import { fill } from '../../utils/relation.js';
	import { pipeP } from '../../utils/function.js';
	import { getSize, resetSize } from '../../utils/impure.js';
	import { runCode } from '../../utils/graph.js';
	import { nodes, selection } from '../../stores.js';
	import { sizes } from '../../config.js';

	export let id;

	const node = nodes.get(id);

	const { assign } = bindAll(node);

	/* const callWithId = safe(applyTo(id)); */

	const updateSize = pipe(prop('id'), getSize, map(fill(sizes.step)));

	/* const setSize = curry((size, node) => assign(byId(node.id).style, size)); */
	/* const resize =  */

	const runUi = pipe(x => (x.ui(x.id), x), ap(mergeRight, updateSize), assign);

	const run = pipeP(tap(resetSize), runCode, runUi);

	$: ({ spec, updated } = $node);

	$: selected = $selection.includes(id);

	$: updated && run(node);

	onMount(() => runUi(node));
</script>

<div style="overflow: hidden; position: absolute; top: {$node.y - 4}px; left: {$node.x}px; ">
	<MouseHandler>
		<IO {selected} items={$node.inlets} />
		<div {id}>
			<DefaultContent {spec} />
		</div>
		<IO {selected} items={$node.outlets} />
	</MouseHandler>
</div>
