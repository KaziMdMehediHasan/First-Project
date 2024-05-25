import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorhandler';

const app: Application = express()
// const port = 3000;

// parsers

app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);
// app.use('/api/v1/students', StudentRoutes);

console.log(process.cwd())

//C:\Users\Foxtrot\Desktop\Reboot\Node-Express-TypeScript\firstProject
app.use(globalErrorHandler);
export default app
