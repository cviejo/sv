import App from './App.svelte';
import flyd from 'flyd';
import nexus from 'nexusui';

window.flyd = flyd;
window.nexus = nexus;

let app = new App({ target: document.body });

export default app;
