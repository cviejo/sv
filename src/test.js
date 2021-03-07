// file 1
const { curry, juxt } = require('ramda');

const validateArray = curry(({ path, validate }, data) => {
	data[path].forEach(validate);
	return data;
});

// file 2
const { validateArray, uniquePositions } = require('../validators');

const a = {
	additionalValidation: tap(
		juxt([
			validateArray({
				path: 'posts',
				validate: juxt([uniquePositions('posts'), nonZeroPosition('posts')]),
			}),
			validateArray({
				path: 'stories',
				validate: juxt([uniquePositions('stories'), nonZeroPosition('stories')]),
			}),
		])
	),
};

const a = {
	additionalValidation: tap(
		juxt([
			pipe(prop('posts'), forEach(juxt([uniquePositions('posts'), nonZeroPosition('posts')]))),
			pipe(prop('posts'), forEach(juxt([uniquePositions('posts'), nonZeroPosition('posts')]))),
		])
	),
};
