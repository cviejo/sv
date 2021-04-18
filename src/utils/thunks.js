import { thunkify } from 'ramda';
import { mode, cursor } from '../stores.js';

const setMode = thunkify(mode.set);

const updateCursor = thunkify(cursor.update);

export { setMode, updateCursor };
