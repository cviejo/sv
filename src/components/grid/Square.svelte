<script>
	export let id = 'not-set';
	export let step = 35;
	export let strokeWidth = 1;
</script>

<pattern {id} width={step} height={step} patternUnits="userSpaceOnUse">
	<slot />
	<path d="M {step} 0 L 0 0 0 {step}" fill="none" stroke="gray" stroke-width={strokeWidth} />
</pattern>
