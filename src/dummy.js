import { take } from 'ramda';
import { forEachAsync } from './utils/function.js';
import { nodes } from './stores.js';

import edges from './stores/edges.js';

const graph = {
	nodes: [
		{ id: 'ping', x: 0, y: 0, spec: 'ping' },
		{ id: '1a', x: 250, y: 200, spec: 'pre' },
		{ id: '1b', x: 350, y: 300, spec: 'pre' },
		{ id: '0', x: 0, y: 0, spec: 'nexus/sequencer' },
		{ id: '00', x: 350, y: 50, spec: 'aha' },
		{ id: '1bc', x: 325, y: 200, spec: 'pre' },
		{ id: 'aaa', x: 325, y: 300, spec: 'pre' },
		{ id: 'eee', x: 425, y: 200, spec: 'pre' },
		{ id: 'ddd', x: 525, y: 200, spec: 'pre' },
		{ id: '3', x: 50, y: 150, spec: 'nexus/toggle' },
	],
	edges: [{ from: 'ping', outlet: 1, to: '1a', inlet: 0 }],
};

forEachAsync(x => nodes.add(x), take(3, graph.nodes)).then(() => {
	setTimeout(() => graph.edges.forEach(x => edges.add(x)), 500);
});
