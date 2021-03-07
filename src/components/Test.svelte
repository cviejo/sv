<script>
	import { cond, whereEq, prop, thunkify } from 'ramda';
	import { mode } from '../stores.js';
	import Select from 'svelte-select';
	import specs from '../specs.js';

	let select;

	let props = {
		items: specs.data.map((x) => ({ value: x.name, label: x.name, group: x.group })),
		listOpen: true,
		listAutoWidth: false,
		placeholder: '',
		groupBy: prop('group'),
	};

	const dispatchKeyDown = thunkify((key) =>
		select.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key }))
	);

	const keydown = cond([
		[whereEq({ key: 'n', ctrlKey: true }), dispatchKeyDown('ArrowDown')],
		[whereEq({ key: 'p', ctrlKey: true }), dispatchKeyDown('ArrowUp')],
	]);
</script>

<style>
	.cover {
		background-color: rgba(0, 0, 0, 0.6);
		height: 100%;
		left: 0px;
		position: absolute;
		top: 0px;
		width: 100%;
		z-index: 100;
	}
	.theme {
		background-color: var(--background-dark);
		height: 20em;
		left: calc(50% - 10em);
		position: absolute;
		top: 4em;
		width: 20em;
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

<div class="cover" on:click={() => ($mode = 'normal')}>
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
