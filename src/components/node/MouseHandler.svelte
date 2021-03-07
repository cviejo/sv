<script>
	import { unless } from 'ramda';
	import { mode } from '../../stores.js';
	import { stopPropagation } from '../../utils/dom.js';

	const normalMode = () => $mode !== 'normal';

	const handler = unless(normalMode, stopPropagation);
</script>

<div on:mouseup|capture={handler} on:mousedown|capture={handler} on:click|capture={handler}>
	<slot />
</div>
