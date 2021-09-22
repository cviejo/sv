import { __ } from 'ramda';
import { findByProp } from './utils/list.js';

const data = [
	{
		name: 'pre',
		code: `
const input = inlet();
outlet();

const stringify = (x) => JSON.stringify(x, null, 3);

const pre = (style) => (x) => \`<pre style="\${style}">\${stringify(x)}</pre>\`;

const w = "width: 146px";
const h = "height: 46px";

const display = pre(
   \`color: var(--white); overflow-y: scroll; margin: 0px;  color: white; \${w}; \${h}; min-\${w}; min-\${h}; max-\${w}; max-\${h};\`
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
		code: `ui.innerHTML = '<pre id="notes" contenteditable="true" style="margin: 0; color: white;">Comment</pre>';`,
	},
	{
		name: 'ping',
		code: `
outlet();
const out = outlet();

setInterval(() => out(Date.now()), 1000);`,
	},
	{
		name: 'nexus/sequencer',
		code: `
import nexus from 'https://cdn.skypack.dev/nexusui';

outlet();
const out = outlet();

ui(async(node) => {
	node.innerHTML = '';
	const seq = new nexus.Sequencer(node, {
		size: [200, 100],
		mode: 'toggle',
		rows: 4,
		columns: 8,
		paddingRow: 1,
		paddingColumn: 1,
	}).on('change', out);
	console.log("seq", seq);
});

// seq.matrix.toggle.cell(2,1)

const dispatch = e => {
	console.log('do something with', e);
}

export { dispatch };`,
	},
	{
		name: 'nexus/dial',
		code: `
import nexus from 'https://cdn.skypack.dev/nexusui';
const out = outlet();

ui((node) => {
	node.innerHTML = '';
	new nexus.Dial(node, { size: [75, 75],
		interaction: 'radial', // radial | vertical | horizontal
		mode: 'relative', // absolute | relative
		min: 0,
		max: 1,
		step: 0,
		value: 0
	}).on('change', out);
});`,
	},
	{
		name: 'nexus/toggle',
		code: `
import nexus from "https://cdn.skypack.dev/nexusui";

const out = outlet();

ui((node) => {
	node.innerHTML = '';
	new nexus.Toggle(node, {
		size: [50, 25],
	}).on("change", out);
});`,
	},
	{
		name: 'log',
		code: 'flyd.on(console.log, inlet());',
	},
];

const get = findByProp('name', __, data);

const add = x => data.push(x);

export default { get, add, data };
