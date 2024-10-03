export const envFiles = {
  'index.js': {
    file: {
      contents: `
              import { getHeapSnapshot } from 'node:v8';
              console.log(getHeapSnapshot());
            `
    }
  },
  'package.json': {
    file: {
      contents: `
{
  "name": "app",
  "type": "module",
  "dependencies": {},
  "scripts": {
    "start": "node index.js"
  }
}`
    }
  }
}

export async function spawnProcess(asyncProcessCallback) {
  const process = await asyncProcessCallback();
  process.output.pipeTo(new WritableStream({
    write(data) {
      console.log(data)
    }
  }))
}
