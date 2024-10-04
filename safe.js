import v8Profiler from 'v8-profiler-node8';

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


