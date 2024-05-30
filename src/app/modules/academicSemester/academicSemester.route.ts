import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { AcademicSemesterValidations } from './academicSemester.validation';
import validateRequest from '../../middlewares/validateRequest';


const router = express.Router();

router.post('/create-academic-semester', validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema), AcademicSemesterControllers.createAcademicSemester)

router.get('/', AcademicSemesterControllers.getAcademicSemester);
router.get('/:id', AcademicSemesterControllers.fetchSingleSemester);
router.patch('/:id', AcademicSemesterControllers.updateSemester);

export const AcademicSemesterRoutes = router;