const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, '../bin/profiler.node'), (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    fs.writeFile(path.join(__dirname, '../bin/profile.node.base64'), data.toString('base64'), (err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('File has been saved');
    });
})
