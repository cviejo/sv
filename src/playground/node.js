/* eslint-disable no-undef */
import nexus from 'https://cdn.skypack.dev/nexusui';

const out = outlet();

ui((node) => {
	new nexus.Dial(node, {
		size: [75, 75],
		interaction: 'radial', // radial | vertical | horizontal
		mode: 'relative', // absolute | relative
		min: 0,
		max: 1,
		step: 0,
		value: 0,
	}).on('change', out);
});

const ixx = inlet();
ui((node) => {
	const style = 'width: 75px; height: 50px;';
	flyd.on((x) => node.innerHTML(`<pre style=${style}>${JSON.stringify(x, null, 3)}</pre>`), ixx);
});
