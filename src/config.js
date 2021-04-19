const step = 25;
const region = step * 10;
const grid = region * 10;

const svg = {
	preserveAspectRatio: 'none',
	width: grid + 1,
	height: grid + 1,
};

const sizes = { step, region, grid };

export { sizes, svg };
