const { exec } = require('node:child_process');

exec('npm install', (err, stdout, stderr) => {
  if (stderr) {
    console.log('\x1b[31m', '\rerror to install npm pkg', '\x1b[0m');
    console.log(stderr);
  } else if (stdout) {
    console.log('\x1b[32m', '\rall packages node has installed', '\x1b[0m');
  }
});

exec('pip install opencv-python', (err, stdout, stderr) => {
  if (stderr) {
    console.log('\x1b[31m', '\rerror to install pip pkg', '\x1b[0m');
    console.log(stderr);
  } else if (stdout) {
    console.log('\x1b[32m', '\rall packages python has installed', '\x1b[0m');
  }
});