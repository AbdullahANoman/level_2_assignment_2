import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('🚀 Assignment-2 is running  🚀');
});

app.all('*', (req: Request, res: Response) => {
  console.log(req);
  res.status(400).json({
    success: false,
    message: 'Route not found 🚀',
  });
});

export default app;
