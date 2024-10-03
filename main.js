import './style.css'
import { WebContainer } from '@webcontainer/api';
import { envFiles, spawnProcess } from './webEnv';

/** @type {HTMLIFrameElement | null} */
const iframeEl = document.querySelector('iframe');

/** @type {import('@webcontainer/api').WebContainer}  */
let webcontainerInstance;

window.addEventListener('load', async () => {
  // Call only once
  webcontainerInstance = await WebContainer.boot();
  webcontainerInstance.mount(envFiles);
  spawnProcess(async () => await webcontainerInstance.spawn('npm', ['run', 'start']))
});

document.querySelector('#app').innerHTML = `
  <div>
    <iframe></iframe>
  </div>
`
