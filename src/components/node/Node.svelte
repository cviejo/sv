<script>
	import { tap, map, pipe } from 'ramda';
	import { onMount } from 'svelte';
	import IO from './IO.svelte';
	import DefaultContent from './DefaultContent.svelte';
	import MouseHandler from './MouseHandler.svelte';
	import { bindAll, pickWith, mergeResult } from '../../utils/object.js';
	import { fill } from '../../utils/relation.js';
	import { pipeP } from '../../utils/function.js';
	import { S_ } from '../../utils/combinators.js';
	import { append } from '../../utils/string.js';
	import { getSize, resetSize, setSize } from '../../utils/impure.js';
	import { runCode } from '../../utils/graph.js';
	import { nodes, selection } from '../../stores.js';
	import { sizes } from '../../config.js';

	export let id;

	const node = nodes.byId(id);

	const { assign } = bindAll(node);

	const fillSize = fill(sizes.step);

	const resize = S_(setSize, pickWith(['width', 'height'], append('px')));

	const adjustSize = pipe(getSize, map(fillSize));

	const callUi = x => (x.ui(x.id), x);

	const runUi = pipe(callUi, mergeResult(adjustSize), tap(resize), assign);

	const run = pipeP(tap(resetSize), mergeResult(runCode), runUi);

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
