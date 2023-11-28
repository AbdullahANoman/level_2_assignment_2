import mongoose from 'mongoose';
import app from './app';
import config from './config';

const port = 5000;

async function connect() {
  try {
    await mongoose.connect(config.dataBase_url as string);
    app.listen(port, () => {
      console.log(`🚀 Assignment-2 is running on port ${port} 🚀`);
    });
  } catch (error) {
    console.log(error);
  }
}

connect();
