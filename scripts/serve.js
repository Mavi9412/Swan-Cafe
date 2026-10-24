import { createServer } from 'vite';

async function start() {
  const server = await createServer({
    server: {
      port: 3000,
      host: '127.0.0.1',
    },
  });
  await server.listen();
  console.log('Swan Cafe dev server running stably at http://127.0.0.1:3000');

  // Keep event loop alive indefinitely
  setInterval(() => {}, 1000 * 60 * 60);
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
