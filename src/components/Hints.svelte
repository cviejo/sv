<script>
	import { evolve, replace, pipe, prop, cond, T } from 'ramda';
	import { hintStrings, notIncluded } from '../utils/string.js';
	import { findByProp } from '../utils/list.js';
	import { nothing } from '../utils/function.js';
	import { eventDispatcher } from '../utils/svelte.js';

	export let items = [];

	const dispatch = eventDispatcher('selection');

	const chars = 'sadfjkle;wcmpgh';

	const invalid = notIncluded(chars);

	const match = key => findByProp('hint', key, hints);

	const filter = key => {
		const regex = new RegExp(`^${key}`);

		const newHint = evolve({ hint: replace(regex, '') });

		hints = hints.filter(x => regex.test(x.hint)).map(newHint);
	};

	const keydown = cond([
		[invalid, nothing],
		[match, pipe(match, dispatch)],
		[T, filter],
	]);

	$: hints = hintStrings(chars, items.length).map((hint, i) => ({ ...items[i], hint }));
</script>

{#each hints as x (x.hint)}
	<span style=" top: {x.y}px; left: {x.x}px;">{x.hint}</span>
{/each}

<svelte:window on:keydown|capture={pipe(prop('key'), keydown)} />

<style>
	span {
		color: white;
		background-color: var(--background-light);
		overflow: hidden;
		position: absolute;
		padding: 0px 3px;
	}
</style>
