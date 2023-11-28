import express, { Application } from 'express';
import cors from 'cors';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('🚀 Assignment-2 is running  🚀');
});

export default app;
