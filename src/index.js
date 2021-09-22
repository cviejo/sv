import App from './App.svelte';
import flyd from 'flyd';

window.flyd = flyd;

let app = new App({ target: document.body });

export default app;
