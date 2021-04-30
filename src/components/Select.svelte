<script>
	import { cond, whereEq, prop, thunkify } from 'ramda';
	import { thunks } from '../stores.js';
	import Select from 'svelte-select';
	/* const formatted = x => ({ value: x.name, label: x.name, group: x.group }); */

	export let items = [];

	let select = null;

	let props = {
		items,
		listOpen: true,
		listAutoWidth: false,
		placeholder: '',
		groupBy: prop('group'),
	};

	const keyboardEvent = key => new KeyboardEvent('keydown', { key, bubbles: true });

	const triggerKeydown = thunkify(key => select.dispatchEvent(keyboardEvent(key)));

	const keydown = cond([
		[whereEq({ key: 'n', ctrlKey: true }), triggerKeydown('ArrowDown')],
		[whereEq({ key: 'p', ctrlKey: true }), triggerKeydown('ArrowUp')],
	]);
</script>

<style>
	.cover {
		background-color: rgba(0, 0, 0, 0.6);
		position: absolute;
		left: 0px;
		top: 0px;
		width: 100%;
		height: 100%;
		z-index: 100;
	}
	.theme {
		background-color: var(--background-dark);
		position: absolute;
		top: 4em;
		left: calc(50% - 10em);
		width: 20em;
		height: 20em;
		--background: var(--background-light);
		--border: 0px solid black;
		--borderRadius: 0px;
		--groupItemPaddingLeft: 1em;
		--groupTitleColor: rgba(255, 255, 255, 0.3);
		--groupTitlePadding: 0 1em;
		--inputColor: white;
		--inputFontSize: 1em;
		--itemActiveBackground: rgb(120, 120, 120);
		--itemColor: white;
		--itemFirstBorderRadius: 0px;
		--itemHoverBG: var(--background-medium);
		--itemIsActiveBG: rgb(120, 120, 120);
		--listBackground: var(--background-dark);
		--listBorderRadius: 0px;
	}
</style>

<div class="cover" on:click={thunks.setMode('normal')}>
	<div class="theme" bind:this={select} on:keydown|capture={keydown}>
		<Select {...props} on:select />
	</div>
</div>

<!-- 
		/* --borderFocusColor: black; */
		/* --borderHoverColor: black; */
		/* --disabledPlaceholderColor: white; */
		/* --placeholderColor: black; */
		/* --placeholderColor: white; */
-->
