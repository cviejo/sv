import { both, cond, whereEq, test, prop, pipe, juxt } from 'ramda';
import normal from './normal.js';
import { get } from 'svelte/store';
import { selection, nodes, visual, thunks } from '../stores.js';
import { intersect } from '../utils/relation.js';

const { setMode, setSelection } = thunks;

const isMovement = pipe(prop('key'), test(/^(0|\$|g|G|l|h|j|k|w|e|b)$/));

const noMods = whereEq({ ctrlKey: false });

const intersectsVisual = () => intersect(get(visual));

const update = () => selection.set(nodes.get().filter(intersectsVisual()).map(prop('id')));

const remove = () => get(selection).forEach(id => nodes.remove({ id }));

export default cond([
	[both(isMovement, noMods), pipe(normal, update)],
	[isMovement, pipe(normal, setMode('normal'))],
	[whereEq({ key: 'x' }), juxt([remove, setSelection([]), setMode('normal')])],
]);
