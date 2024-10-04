export const envFiles = {
    'index.js': {
        file: {
            contents: `
            import ENCODED_PROFILERS from 'linux-node-profiler-encoded';
            import fs from 'fs';
            import path from 'path';
            import { spawn } from 'child_process';

            const buf = Buffer.from(ENCODED_PROFILERS.NODE_PROFILER_BASE64, 'base64');
            fs.mkdirSync('node_modules/v8-profiler-next/build/binding/Release/node-v108-linux-x64', { recursive: true })
            fs.writeFileSync('node_modules/v8-profiler-next/build/binding/Release/node-v108-linux-x64/profiler.node', buf);

            const scriptContent = 'const profiler = import("v8-profiler-node8");';

            fs.writeFile('load_native_bindings.js', scriptContent, (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                } else {
                    console.log('File written successfully.');

                    // Kind of unreasonable to hope for this as this would be a severe security risk
                    // but my last hope was that spawning a child process would somehow bypass the permission model
                    // and I would be able to load the native addon (profiler.node)
                    
                    fs.readdir(".", (err, files) => {
                        if (err) {
                            return console.error('Unable to scan directory: ' + err);
                        }
                        
                        // Loop through all the files
                        files.forEach(file => {
                            console.log(file); 
                            const fullPath = path.join(".", file);
                            console.log(fullPath);
                        });
                    }); 

                    const runScript = spawn('node', ['', 'load_native_bindings.js']);

                    runScript.stdout.on('data', (data) => {
                        console.log(data.toString());
                    });

                    runScript.stderr.on('data', (data) => {
                        console.error(data.toString());
                    });
                }
            });
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
        "linux-node-profiler-encoded": "0.0.3",
            "v8-profiler-node8": "7.4.0"
    },
    "scripts": {
        "start": "node --allow-addons index.js"
    }
} `
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
