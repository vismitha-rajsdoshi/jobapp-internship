const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initDB() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.log("No DATABASE_URL found in .env");
    return;
  }
  
  const targetClient = new Client({ connectionString: dbUrl });
  try {
    console.log(`Connecting to Neon Cloud Database...`);
    await targetClient.connect();
    const sqlFile = path.join(__dirname, 'init.sql');
    if (fs.existsSync(sqlFile)) {
      console.log("Running init.sql to create tables...");
      const sql = fs.readFileSync(sqlFile, 'utf8');
      await targetClient.query(sql);
      console.log("Tables created successfully.");
    }
  } catch (err) {
    console.error(`Error connecting to target DB or running init.sql: ${err.message}`);
  } finally {
    try { await targetClient.end(); } catch (e) {}
  }
}

initDB().then(() => {
  console.log("Database initialization script finished.");
  process.exit(0);
});
