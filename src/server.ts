import app from './app'
import config from './app/config'
import mongoose from 'mongoose'
import { Server } from 'http';
// main().catch(err => console.log(err));

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    server = app.listen(config.port, () => {
      console.log(`Connected to database and app is listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main();

process.on('unhandledRejection', () => {
  console.log(`Unhandled rejection is detected, shutting down the server...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    })
  }
})

process.on('uncaughtException', () => {
  console.log(`Uncaught Exception is detected, shutting down the server...`);
  process.exit(1);
})

// console.log(x);

// process.on('uncaughtException',
