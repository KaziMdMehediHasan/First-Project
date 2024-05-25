import { NextFunction, Request, RequestHandler, Response } from "express"
import { StudentServices } from "./student.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
// import studentValidationSchema from "./student.validation";


const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(err => next(err));
    }
}
const getAllStudents: RequestHandler = async (req, res, next) => {
    // try {
    // will call service function to send this data
    const result = await StudentServices.getAllStudentsFromDB();
    // res.status(200).json({
    //     success: true,
    //     message: 'Student data is retrieved successfully',
    //     data: result
    // })
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is created successfully',
        data: result
    });
    // } catch (error) {
    //     // res.status(500).json({
    //     //     success: false,
    //     //     message: error.message || 'something went wrong',
    //     //     error: error
    //     // })
    //     next(error);
    // }
}

const getSingleStudent = catchAsync(async (req, res, next) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.getSingleStudentFromDB(studentId);
        // res.status(200).json({
        //     success: true,
        //     message: 'Student data has been found!',
        //     data: result
        // })
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student is created successfully',
            data: result
        });
    } catch (error) {
        // res.status(500).json({
        //     success: false,
        //     message: error.message || 'something went wrong',
        //     error: error
        // })
        next(error);
    }
})

const deleteStudent: RequestHandler = async (req, res, next) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.deleteStudentFromDB(studentId);
        // res.status(200).json({
        //     success: true,
        //     message: 'Student data has been deleted successfully!',
        //     data: result
        // })
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student is created successfully',
            data: result
        });
    } catch (error) {
        // res.status(500).json({
        //     success: false,
        //     message: error.message || 'something went wrong',
        //     error: error
        // })
        next(error);
    }
}
export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
    deleteStudent
}