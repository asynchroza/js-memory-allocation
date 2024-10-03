export const envFiles = {
  'index.js': {
    file: {
      contents: `
              import { getHeapSnapshot, getHeapStatistics } from 'node:v8';

              console.log(getHeapSnapshot())
              console.log(getHeapStatistics());

              const a = [5, 7, 8];
              console.log(getHeapSnapshot());
              console.log(getHeapStatistics());
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
