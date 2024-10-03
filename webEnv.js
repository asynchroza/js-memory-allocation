export const envFiles = {
    'index.js': {
        file: {
            contents: `console.log("HELLO WORLD");`
        }
    },
    'package.json': {
        file: {
            contents: `
{
  "name": "example-app",
  "type": "module",
  "dependencies": {
    "express": "latest",
    "nodemon": "latest"
  },
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
