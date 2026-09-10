const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 5432,
});

pool.on('connect', () => {
  console.log('Conectado ao PostgreSQL com sucesso!');
});

pool.on('error', (err) => {
  console.error('Erro inesperado no PostgreSQL', err);
  process.exit(-1);
});

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tabela users verificada/criada!');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        description VARCHAR(255) NOT NULL,
        amount NUMERIC(10, 2) NOT NULL,
        type VARCHAR(50) NOT NULL CHECK (type IN ('entrada', 'saída')),
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        category VARCHAR(100),
        month VARCHAR(20)
      );
    `);
    console.log('Tabela transactions verificada/criada!');

  } catch (err) {
    console.error('Erro ao criar tabelas no PostgreSQL:', err.message);
  }
};

createTables();

module.exports = pool;