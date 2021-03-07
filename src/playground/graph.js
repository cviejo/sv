import flyd from 'flyd';

const code = (fn) => {
	const io = { inlets: [], outlets: [] };

	const createIO = (all) => () => {
		const stream = flyd.stream();
		all.push(stream);
		return stream;
	};

	const inlet = createIO(io.inlets);
	const outlet = createIO(io.outlets);

	const run = () => {
		fn(inlet, outlet);
		return io;
	};
	return { run };
};

const data = {
	nodes: [
		{ id: 1, spec: 'timer' },
		{ id: 2, spec: 'log' },
	],
	edges: [{ from: { id: 1, outlet: 0 }, to: { id: 2, inlet: 0 } }],
	specs: [
		{
			id: 'timer',
			code: code((_, outlet) => {
				const out1 = outlet();
				const bang = () => out1('bang!');
				setInterval(bang, 1000);
			}),
		},
		{
			id: 'log',
			code: code((inlet) => {
				inlet().map(console.log);
			}),
		},
	],
};

// const { nodes, edges } = data;

// const connect = (from, to) => {};

const timer = data.specs[0].code.run();
const log = data.specs[1].code.run();

const nn = timer.outlets[0].map(log.inlets[0]);

// const n1 = timer.outlets[0].map((x) => console.log('oha', x));

// nn.map(console.log);
// nn.map((x) => console.log('third level', x));

setTimeout(() => nn.end(true), 2000);

setTimeout(() => {
	timer.outlets[0].map(log.inlets[0]);
}, 5000);

setTimeout(() => {
	timer.outlets[0].end(true);
}, 6000);

// timer.outlets[0].map(console.log);

// console.log(nn);
