import { __ } from 'ramda';
import { findByProp } from './utils/list.js';

const data = [
	{
		name: 'hi',
		code: `
			console.log('hi!!');
		`,
	},
	{
		name: 'pre',
		code: `
const input = inlet();
outlet();

const stringify = (x) => JSON.stringify(x, null, 3);

const pre = (style) => (x) => \`<pre style="\${style}">\${stringify(x)}</pre>\`;

const w = "width: 175px";
const h = "height: 50px";

const display = pre(
   \`overflow-y: scroll; margin: 0px; background-color: grey; color: white; \${w}; \${h}; min-\${w}; min-\${h}; max-\${w}; max-\${h};\`
);

ui((node) => {
   node.innerHTML = display({});
   flyd.on((x) => {
      node.innerHTML = display(x);
   }, input);
});
		`,
	},
	{
		name: 'comment',
		code: `
			ui.innerHTML = '<pre id="notes" contenteditable="true" style="margin: 0; color: white;">Comment</pre>';
		`,
	},
	{
		name: 'ping',
		code: `
outlet();
const out = outlet();

setInterval(() => out(Date.now()), 1000);
		`,
	},

	{
		name: 'nexus/sequencer',
		code: `
			outlet();
			const out = outlet();

			// import nexus from 'https://cdn.skypack.dev/nexusui';
			ui((node) => {
				// console.log("node", node);

				node.innerHTML = '';
				new nexus.Sequencer(node, {
					size: [200, 100],
					mode: 'toggle',
					rows: 4,
					columns: 8,
					paddingRow: 1,
					paddingColumn: 1,
				}).on('change', out);
			})`,
	},
	{
		name: 'aha',
		code: `
			ui.innerHTML = \`
<select name="pets" id="pet-select">
    <option value="">Select pets</option>
    <option value="dog">Dog</option>
    <option value="cat">Cat</option>
</select>
\`;`,
	},

	{
		name: 'nexus/dial',
		code: `
			// import nexus from 'https://cdn.skypack.dev/nexusui';
			ui.innerHTML = '';
			inlet();
			inlet();
			inlet();
			new nexus.Dial(ui, { size: [75, 75],
				interaction: 'radial', // radial | vertical | horizontal
				mode: 'relative', // absolute | relative
				min: 0, max: 1, step: 0, value: 0
			}).on('change', outlet());`,
	},
	{
		name: 'nexus/toggle',
		code: `
			// import nexus from 'https://cdn.skypack.dev/nexusui';
			ui.innerHTML = '';
			new nexus.Toggle(ui, {
				'size': [50, 25],
			}).on('change', outlet());`,
	},
	{
		name: 'log',
		code: 'flyd.on(console.log, inlet());',
	},
];

const get = findByProp('name', __, data);

const add = x => data.push(x);

export default { get, add, data };
