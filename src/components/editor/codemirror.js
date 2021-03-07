import { curry } from 'ramda';
import codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/addon/comment/comment.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/keymap/vim';
import './vs-dark.css';

codemirror.Vim.noremap('S', 'J');
codemirror.Vim.map(';', ':');
codemirror.Vim.map("'w", ':write');
codemirror.Vim.map("'q", '@q');
codemirror.Vim.map("'h", ':noh');
codemirror.Vim.map("'n", '*');
codemirror.Vim.map("'a", 'ggVG');

const options = {
	autoCloseBrackets: '()[]{}\'\'""``',
	indentUnit: 3,
	indentWithTabs: true,
	keyMap: 'vim',
	lineWrapping: true,
	mode: { name: 'javascript', json: true },
	theme: 'vs',
};

const fromTextArea = (elem) => codemirror.fromTextArea(elem, options);

const setSize = curry((width, height, editor) => (editor.setSize(width, height), editor));

const defineEx = (...args) => codemirror.Vim.defineEx(...args);

export { codemirror, fromTextArea, setSize, defineEx };
