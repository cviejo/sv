<script>
	import { either, whereEq, prop, tap, map, pipe, forEach } from 'ramda';
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
	import { nodes, selection, edges } from '../../stores.js';
	import { sizes } from '../../config.js';

	export let id;

	const node = nodes.byId(id);

	const { assign } = bindAll(node);

	const fillSize = fill(sizes.step);

	const resize = S_(setSize, pickWith(['width', 'height'], append('px')));

	const adjustSize = pipe(getSize, map(fillSize));

	const ui = x => x.ui(x.id);

	const connections = id => $edges.filter(either(whereEq({ from: id }), whereEq({ to: id })));

	const disconnect = pipe(prop('id'), connections, tap(forEach(edges.remove)));

	const runUi = pipe(tap(ui), mergeResult(adjustSize), tap(resize), assign);

	const update = async x => {
		const temp = disconnect(x);
		await runUi(x);
		temp.forEach(edges.add);
	};

	const run = pipeP(tap(resetSize), mergeResult(runCode), update);

	$: ({ spec, updated } = $node);

	$: selected = $selection.includes(id);

	$: updated && run(node);

	run(node);
</script>

<style>
	.node {
		overflow: hidden;
		position: absolute;
		border-radius: 2px;
	}
</style>

<div class="node" style="top: {$node.y - 4}px; left: {$node.x}px; ">
	<MouseHandler>
		<IO {selected} items={$node.inlets} />
		<div {id}>
			<DefaultContent {spec} />
		</div>
		<IO {selected} items={$node.outlets} />
	</MouseHandler>
</div>
