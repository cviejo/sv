import { createEventDispatcher } from 'svelte';

const eventDispatcher = name => {
	const dispatch = createEventDispatcher();

	return x => dispatch(name, x);
};

export { eventDispatcher };
