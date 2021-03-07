import { writable, get } from 'svelte/store';

const mode = { ...writable('normal'), get: () => get(mode) };

export default mode;
