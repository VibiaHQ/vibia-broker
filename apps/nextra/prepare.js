const fs = require('fs')

if(!fs.existsSync('./dist/apps/nextra/server.js')) {
    //run yarn package
    const { exec } = require('child_process');
    console.log("Compiling documentation...")
    exec('yarn package', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
}