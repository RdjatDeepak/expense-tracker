import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http'; // Native Node layer to lock the event loop open
import expenseController from './src/controllers/expenseController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Application Mid-tier Config
app.use(cors());
app.use(express.json());

// Enterprise Clean App Routing Matrix
app.get('/api/expenses', expenseController.getExpenses);
app.post('/api/expenses', expenseController.createExpense);
app.put('/api/expenses/:id', expenseController.updateExpense);
app.delete('/api/expenses/:id', expenseController.deleteExpense);
app.get('/api/summary', expenseController.getSummary);

// Base Check Route
app.get('/', (req, res) => {
  res.json({ status: "healthy", architecture: "layered-industry-standard" });
});

// Centralized Catch-All Exception Core
app.use((err, req, res, next) => {
  console.error('💥 Execution failure context:', err.stack);
  res.status(500).json({ error: 'Internal system operational bottleneck encountered.' });
});

// Create native server wrapper to guarantee the event loop refs stay > 0
const server = http.createServer(app);

console.log("🔄 Attempting to lock network socket listener onto port...");
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Architecture Engine permanently live on: http://localhost:${PORT}`);
});