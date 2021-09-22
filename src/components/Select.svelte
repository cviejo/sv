<script>
	import { cond, whereEq, prop, thunkify } from 'ramda';
	import { thunks } from '../stores.js';
	import Select from 'svelte-select';

	export let placeholder = 'New node...';
	export let items = [];

	let select = null;

	const props = {
		items,
		placeholder,
		labelIdentifier: 'title',
		listOpen: true,
		listAutoWidth: false,
		groupBy: prop('group'),
	};

	const keyboardEvent = key => new KeyboardEvent('keydown', { key, bubbles: true });

	const dispatch = thunkify(key => select.dispatchEvent(keyboardEvent(key)));

	const keydown = cond([
		[whereEq({ key: 'n', ctrlKey: true }), dispatch('ArrowDown')],
		[whereEq({ key: 'p', ctrlKey: true }), dispatch('ArrowUp')],
	]);
</script>

<div class="cover" on:click={thunks.setMode('normal')}>
	<div class="theme" bind:this={select} on:keydown|capture={keydown}>
		<Select {...props} on:select />
	</div>
</div>

<style>
	* {
		font-family: var(--font-family);
	}

	.cover {
		background-color: rgba(0, 0, 0, 0.5);
		position: absolute;
		left: 0px;
		top: 0px;
		width: 100%;
		height: 100%;
		z-index: 100;
	}

	.theme {
		--background: var(--background-light);
		--border: 0px solid black;
		--borderRadius: 0px;
		--groupItemPaddingLeft: 1em;
		--groupTitleColor: rgba(255, 255, 255, 0.3);
		--groupTitlePadding: 0 1em;
		--inputColor: white;
		--inputMargin: 0px;
		--inputFontSize: 1em;
		--itemActiveBackground: rgb(120, 120, 120);
		--itemColor: white;
		--itemFirstBorderRadius: 0px;
		--itemHoverBG: var(--background-medium);
		--itemIsActiveBG: rgb(120, 120, 120);
		--listBackground: var(--background-dark);
		--listBorderRadius: 0px;
		--placeholderColor: rgb(120, 120, 130);
		background-color: var(--background-dark);
		height: 15em;
		left: calc(50% - 15em);
		position: absolute;
		top: 4em;
		width: 30em;
	}

	:global(.listContainer) {
		box-shadow: none !important;
		margin-top: -5px;
	}
	:global(.listContainer::-webkit-scrollbar) {
		width: 7px;
		background-color: transparent;
	}
	:global(.listContainer::-webkit-scrollbar-thumb) {
		background-color: var(--background-light);
	}
</style>
