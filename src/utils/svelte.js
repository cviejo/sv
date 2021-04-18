import { tick, createEventDispatcher } from 'svelte';

const t = x => tick().then(() => x);

const eventDispatcher = name => {
	const dispatch = createEventDispatcher();

	return x => dispatch(name, x);
};

export { t as tick, eventDispatcher };
