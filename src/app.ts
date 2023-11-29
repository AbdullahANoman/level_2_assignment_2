import express, { Application } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Assignment-2 is running  🚀');
});

export default app;
