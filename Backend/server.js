import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Test database endpoint
app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    res.json({ success: true, message: 'Database connected', data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Database error', error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});