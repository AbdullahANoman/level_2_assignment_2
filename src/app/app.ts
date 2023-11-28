import express, { Application } from 'express';
import cors from 'cors';
const app: Application = express();
const port = 5000;

//parsers
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
