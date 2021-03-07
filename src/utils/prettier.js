import prettier from 'prettier/esm/standalone.mjs';
import babelParser from 'prettier/esm/parser-babel.mjs';

const format = (x) => prettier.format(x, { tabWidth: 3, parser: 'babel', plugins: [babelParser] });

export { format };
