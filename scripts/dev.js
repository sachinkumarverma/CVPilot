const net = require('net');
const { spawn } = require('child_process');

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port);
  });
}

async function findAvailablePort(startPort) {
  let port = startPort;
  while (!(await isPortAvailable(port))) {
    console.log(`Port ${port} is in use, trying ${port + 1}...`);
    port++;
  }
  return port;
}

async function main() {
  const defaultPort = parseInt(process.env.PORT || '5000', 10);
  const availablePort = await findAvailablePort(defaultPort);

  console.log(`🚀 Starting Next.js dev server on port ${availablePort}...`);
  
  const nextDev = spawn('npx', ['next', 'dev', '-p', availablePort.toString()], {
    stdio: 'inherit',
    shell: true,
  });

  nextDev.on('exit', (code) => {
    process.exit(code || 0);
  });
}

main();
