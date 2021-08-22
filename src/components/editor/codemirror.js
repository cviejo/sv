import { pipe, prop, propEq, curry, tap, reject, propOr, find } from 'ramda';
import codemirror from 'codemirror';
import { format } from '../../utils/prettier.js';
import { bindAll } from '../../utils/object.js';
import { noop, nullary } from '../../utils/function.js';
import { dispatchEvent } from '../../utils/effects.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/comment/comment.js';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/hint/anyword-hint.js';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/keymap/vim';
import './vs-dark.css';

codemirror.Vim.noremap('S', 'J');
codemirror.Vim.map(';', ':');
codemirror.Vim.map("'w", ':write');
codemirror.Vim.map("'q", '@q');
codemirror.Vim.map("'h", ':noh');
codemirror.Vim.map("'n", '*');
codemirror.Vim.map("'a", 'ggVG');

let instances = [];

const options = {
	autoCloseBrackets: '()[]{}\'\'""``',
	keyMap: 'vim',
	indentUnit: 3,
	indentWithTabs: true,
	lineWrapping: true,
	mode: {
		json: true,
		name: 'javascript',
	},
	theme: 'vs',
};

const onEx = curry((ex, editor, data) => {
	const callback = pipe(find(propEq('editor', editor)), propOr(noop, ex));
	callback(instances)(data);
});

const defineEx = (long, short) => codemirror.Vim.defineEx(long, short, onEx(long));

const withCursor = curry((editor, fn) => () => {
	const scroll = editor.getScrollInfo();
	const cursor = editor.getCursor();

	fn();

	editor.setCursor(cursor);
	editor.scrollTo(scroll.left, scroll.top);
});

const keydown = (editor, event) => {
	const token = editor.getTokenAt(editor.getCursor());
	const { completionActive } = editor.state;
	const { insertMode } = editor.state.vim;
	const word = /^[a-z0-9]{1,}$/i.test(token.string);

	if (completionActive && event.keyCode === 27) {
		codemirror.Vim.exitInsertMode(editor);
	} else if (insertMode && !completionActive && word) {
		editor.showHint({ completeSingle: false, container: editor.display.wrapper });
		// closeOnUnfocus: false,
	}
};

defineEx('write', 'w');

defineEx('swrite', 'sw');

export default (node, callback) => {
	const editor = codemirror.fromTextArea(node, options);

	const { setSize, setValue, getValue } = bindAll(editor);

	const dispatchWrite = dispatchEvent(node, 'write');

	const write = pipe(nullary(getValue), format, tap(setValue), dispatchWrite);

	const removeEditor = reject(propEq('editor', editor));

	const destroy = () => {
		instances = removeEditor(instances);
	};

	instances.push({ editor, node, write: withCursor(editor, write) });

	node.addEventListener('value', pipe(prop('detail'), format, setValue));

	editor.on('keydown', keydown);

	setSize('100%', '100%');

	callback(editor);

	return { destroy };
};
