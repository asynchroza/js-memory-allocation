import './style.css'
import { WebContainer } from '@webcontainer/api';
import { envFiles, spawnProcess } from './webEnv';

/** @type {import('@webcontainer/api').WebContainer}  */
let webcontainerInstance;

window.addEventListener('load', async () => {
  webcontainerInstance = await WebContainer.boot();
  webcontainerInstance.mount(envFiles);

  spawnProcess(async () => await webcontainerInstance.spawn('npm', ['run', 'start']))
});

document.querySelector('#app').innerHTML = `
  <div>
    <h1>HELLO</h1>
  </div>
`
