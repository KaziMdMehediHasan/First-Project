import express from 'express';
import { CourseValidations } from './course.validation';
import validateRequest from '../../middlewares/validateRequest';
import { CourseControllers } from './course.controller';


const router = express.Router()

router.post(
    '/create-course',
    validateRequest(CourseValidations.createCourseValidationSchema),
    CourseControllers.createCourse
);

router.get('/', CourseControllers.getAllCourses);
router.get('/:courseId', CourseControllers.getSingleCourse);
router.delete('/:courseId', CourseControllers.deleteCourse);

export const CourseRoutes = router;