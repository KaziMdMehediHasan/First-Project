import { Request, Response } from "express"
import { StudentServices } from "./student.service";
// import studentValidationSchema from "./student.validation";
import studentValidationSchema from "./student.zod.validation";

const createStudent = async (req: Request, res: Response) => {
    try {
        //creating a schema validation using zod
        const { student: studentData } = req.body;

        // validating through joi library
        // const { value, error } = studentValidationSchema.validate(studentData);

        //validate data using zod

        const zodParsedData = studentValidationSchema.parse(studentData);
        // console.log(`from joi : ${error}`, { value });
        // will call service function to send this validated data
        const result = await StudentServices.createStudentIntoDB(zodParsedData);

        // handling joy library error
        // if (error) {
        //     res.status(200).json({
        //         success: false,
        //         message: 'something went wrong',
        //         err: error.details
        //     })
        // }
        //send response
        res.status(200).json({
            success: true,
            message: 'Student is created successfully',
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'something went wrong',
            error: error
        })
    }

}

const getAllStudents = async (req: Request, res: Response) => {
    try {
        // will call service function to send this data
        const result = await StudentServices.getAllStudentsFromDB();
        res.status(200).json({
            success: true,
            message: 'Student data is retrieved successfully',
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'something went wrong',
            error: error
        })
    }
}

const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.getSingleStudentFromDB(studentId);
        res.status(200).json({
            success: true,
            message: 'Student data has been found!',
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'something went wrong',
            error: error
        })
    }
}

const deleteStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.deleteStudentFromDB(studentId);
        res.status(200).json({
            success: true,
            message: 'Student data has been deleted successfully!',
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'something went wrong',
            error: error
        })
    }
}
export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent,
    deleteStudent
}