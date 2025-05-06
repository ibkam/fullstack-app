const express = require('express');
const { Pool } = require('pg');
const app = express();
const pool = new Pool({
  user: 'postgres',
  host: 'db',  // Matches Docker service name
  password: process.env.DB_PASSWORD,
  database: 'mydb'
});

app.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM users');
  res.json(rows);
});

app.listen(3000, () => console.log('API running on port 3000'));
