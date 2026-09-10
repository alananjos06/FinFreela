const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const app = express();
const port = process.env.PORT || 3001;

// Configuração de CORS flexível
const allowedOrigins = [
  'https://alananjos06.github.io',
  'http://localhost:5173',
  'http://localhost:3000',
  'https://front-end-eight-olive.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado pela política de CORS'));
    }
  }
}));

// Permite que a API receba JSON no corpo das requisições (req.body)
app.use(express.json());

// Rotas
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const transactionsRoutes = require('./routes/transactions');
app.use('/api/transactions', transactionsRoutes);

// Rota de teste
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'FinFreela API rodando!' });
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});