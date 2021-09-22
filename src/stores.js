import { thunkify } from 'ramda';
import cursor from './stores/cursor.js';
import edges from './stores/edges.js';
import focus from './stores/focus.js';
import focused from './stores/focused.js';
import nodes from './stores/nodes.js';
import mode from './stores/mode.js';
import visual from './stores/visual.js';
import writable from './stores/writable.js';

const selection = writable([]);

const settings = writable({ gridActive: true });

const thunks = {
	focusEq: thunkify(x => focus.get().id === x),
	getNodes: thunkify(nodes.get),
	modeEq: thunkify(x => mode.get() === x),
	setMode: thunkify(mode.set),
	setSelection: thunkify(selection.set),
	updateCursor: thunkify(cursor.update),
};

export { settings, mode, cursor, visual, focus, nodes, edges, selection, focused, thunks };
