import { createServer } from 'http';
import app from './app';
import { config } from './config';
import { connectDatabase } from './services/db';

(async () => {
  await connectDatabase();

  const server = createServer(app.callback());

  server.listen(config.PORT, () => {
    console.log(`server running on http://localhost:${config.PORT}`);
  });
})();
