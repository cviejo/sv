<script>
	// TODO: this is better as an action
	import { unless } from 'ramda';
	import { mode } from '../../stores.js';
	import { stopPropagation } from '../../utils/effects.js';

	const normalMode = () => $mode !== 'normal';

	const handler = unless(normalMode, stopPropagation);
</script>

<div on:mouseup|capture={handler} on:mousedown|capture={handler} on:click|capture={handler}>
	<slot />
</div>
