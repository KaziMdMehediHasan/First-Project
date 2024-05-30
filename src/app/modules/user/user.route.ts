import express, { Request, Response, NextFunction } from 'express';
import { UserControllers } from './user.controller';
import { AnyZodObject } from 'zod';
import { StudentValidations } from '../student/student.zod.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();


router.post('/create-student', validateRequest(StudentValidations.createStudentValidationSchema), UserControllers.createStudent);

export const UserRoutes = router;