import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import chatRouter from './routes/chat.js';

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

app.use('/api/chat', chatRouter);

app.listen(PORT, () => {
  console.log(`API server → http://localhost:${PORT}`);
});
