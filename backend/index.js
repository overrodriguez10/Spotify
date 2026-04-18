require('dotenv').config();
const app = require('./src/app');
const syncDb = require('./src/sync');

const PORT = process.env.PORT || 5000;

async function startServer() {
  await syncDb();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();
