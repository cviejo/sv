import { writable } from 'svelte/store';
import visual from './visual.js';
import { both, propEq, complement, compose, when, assoc } from 'ramda';
import { withinRect } from '../utils/relation.js';

// import { MultiGraph } from 'graphology';

const graph = {};
// new MultiGraph({ allowSelfLoops: true });

const nodes = {
	...writable([]),
	add: (x) => graph.addNode(x.id, x),
};

const edges = writable([]);

// graph.on('nodeAdded', () => nodes.set(graph.nodeEntries().map((x) => x.attributes)));
graph.on('nodeAdded', () => nodes.set(Array.from(graph.nodeEntries()).map((x) => x.attributes)));

graph.on('nodeAttributesUpdated', () => nodes.set(graph.nodeEntries().map((x) => x.attributes)));

visual.subscribe((rect) => {
	console.log(rect);

	const inside = withinRect(rect);

	const outside = complement(inside);

	const selectable = both(inside, propEq('selected', false));

	const deselectable = both(outside, propEq('selected', true));

	const a = compose(
		when(selectable, assoc('selected', true)),
		when(deselectable, assoc('selected', false))
	);

	graph.updateEachNodeAttributes((node, attr) => {
		console.log(attr);

		return a(attr);
	});

	// nodes.update(map(a));
});

// graph.on('edgeAdded', function ({ key, source, target /* , attributes */ }) {
// 	console.log(key, source, target);
// });

// const addNode =

export { nodes, edges };
