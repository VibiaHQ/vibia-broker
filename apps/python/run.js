const { spawn } = require('child_process');
const path = require('path');
const { exit } = require('process');

if (process.argv.length < 3) {
    console.error('Usage: node run.js <python_script>');
    process.exit(1);
}

const params = process.argv.slice(2);

// Construct the absolute path to the 'packages' directory
const currentDir = __dirname; // Directory of run.js
const packagesDir = path.resolve(path.join(currentDir, '..', '..', 'packages'));

// Determine the path to the Python executable in the virtual environment
const venvDir = path.resolve(path.join(currentDir, '..', '..', 'packages', 'app', '.venv'));

const pythonExecutable = process.platform === 'win32' 
    ? path.join(venvDir, 'Scripts', 'python.exe') 
    : path.join(venvDir, 'bin', 'python');

let subprocess;  // Declare subprocess variable to use globally

try {
    // Set up the environment variables for the child process
    const env = { ...process.env };

    // Add the 'packages' directory to PYTHONPATH
    // If PYTHONPATH is already set, append to it; otherwise, set it
    const pathSeparator = process.platform === 'win32' ? ';' : ':';
    env.PYTHONPATH = env.PYTHONPATH
        ? packagesDir + pathSeparator + env.PYTHONPATH
        : packagesDir;

    // Execute the Python script and keep it running
    subprocess = spawn(pythonExecutable, params, {
        windowsHide: true, // Hide the window on Windows
        env: env, // Pass the modified environment variables
    });

    // Redirect output to the parent process' stdout and stderr
    subprocess.stdout.on('data', (data) => {
        process.stdout.write(data);
    });

    subprocess.stderr.on('data', (data) => {
        process.stderr.write(data);
    });

    subprocess.on('close', (code) => {
        process.exit(code);
    });

} catch (err) {
    console.error(err.message);
}

// Handle process termination and stop the subprocess
process.on('SIGINT', () => {
    console.log('Received SIGINT. Shutting down...');
    if (subprocess) {
        subprocess.kill('SIGINT');
    }
    process.exit();
});

process.on('SIGTERM', () => {
    console.log('Received SIGTERM. Shutting down...');
    if (subprocess) {
        subprocess.kill('SIGTERM');
    }
    process.exit();
});