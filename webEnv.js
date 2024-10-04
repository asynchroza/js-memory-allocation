export const envFiles = {
    'index.js': {
        file: {
            contents: `
                import v8Profiler from 'v8-profiler-node8';
                const fs = require('fs');

                function captureHeapSnapshot() {
                  // Start snapshot
                  const snapshot = v8Profiler.takeSnapshot();

                  // Write snapshot to file (optional)
                  const stream = snapshot.export();
                  const file = fs.createWriteStream('heapdump.heapsnapshot');
                  stream.pipe(file);

                  stream.on('data', (chunk) => {
                    console.log('Writing snapshot data...');
                    analyzeHeapSnapshot(snapshot);
                  });
                }

                function analyzeHeapSnapshot(snapshot) {
                  const counts = {
                    array: 0,
                    object: 0,
                  };

                  snapshot.forEachObject((obj) => {
                    const typeName = obj.name;

                    if (typeName === 'Array') {
                      counts.array++;
                    } else if (typeName === 'Object') {
                      counts.object++;
                    }
                  });

                  console.log('Number of Arrays:', counts.array);
                  console.log('Number of Objects:', counts.object);

                  snapshot.delete();
                }

                captureHeapSnapshot();

                const something = [5, 6, 3];
                const something__2 = [5, 6, 3];
                console.log("HERE");

                setTimeout(()=>console.log("Time out"), 500000);
            `
        }
    },
    'package.json': {
        file: {
            contents: `
{
  "name": "app",
  "type": "module",
  "dependencies": {
    "v8-profiler-node8": "7.4.0",
  },
  "scripts": {
    "start": "node index.js",
    "install-profiler": "curl -LO https://github.com/hyj1991/v8-profiler-next/releases/download/v1.10.0/profiler-v1.10.0-node-v108-linux-x64.tar.gz && tar -xzf profiler-v1.10.0-node-v108-linux-x64.tar.gz"
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
    return process.exit;
}
