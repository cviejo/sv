// import { tick } from 'svelte';
import { forEachAsync } from './utils/function.js';
import { addNode } from './utils/graph.js';

import edges from './stores/edges.js';

const graph = {
	nodes: [
		{
			id: '0',
			x: 0,
			y: 0,
			spec: 'nexus/sequencer',
		},
		{
			id: '1a',
			x: 250,
			y: 200,
			spec: 'pre',
		},
		{
			id: '00',
			x: 350,
			y: 50,
			spec: 'aha',
		},
		{
			id: '1b',
			x: 325,
			y: 200,
			spec: 'log',
		},
		{
			id: '2',
			x: 250,
			y: 50,
			spec: 'nexus/dial',
		},
		{
			id: '3',
			x: 50,
			y: 150,
			spec: 'nexus/toggle',
		},
	],
	edges: [
		{
			from: '0',
			outlet: 1,
			to: '1a',
			inlet: 0,
		},
	],
};

forEachAsync(addNode, [graph.nodes[0], graph.nodes[1]]).then(() => {
	graph.edges.forEach((x) => edges.add(x));
});
