import { derived } from 'svelte/store';
import cursor from './cursor.js';
import nodes from './nodes.js';
import { withinRect } from '../utils/relation.js';

const focused = derived(
	[cursor, nodes],
	([$cursor, $nodes]) => ($nodes.find(withinRect($cursor)) || {}).id
);

export default focused;
