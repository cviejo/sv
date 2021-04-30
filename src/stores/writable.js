import { writable } from 'svelte/store';

// just a regular writable with a getter
export default initialState => {
	let state = initialState;

	const store = writable(initialState);

	store.subscribe(x => {
		state = x;
	});

	return { ...store, get: () => state };
};
