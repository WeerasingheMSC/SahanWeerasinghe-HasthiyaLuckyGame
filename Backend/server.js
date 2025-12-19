import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(cors());

app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});