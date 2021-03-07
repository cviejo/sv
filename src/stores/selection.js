import { derived } from 'svelte/store';
import { prop } from 'ramda';
import visual from './visual.js';
import nodes from './nodes.js';
import { intersect } from '../utils/relation.js';

const selection = derived([visual, nodes], ([$visual, $nodes]) =>
	$nodes.filter(intersect($visual)).map(prop('id'))
);

export default selection;
