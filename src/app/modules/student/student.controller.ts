import { NextFunction, Request, RequestHandler, Response } from "express"
import { StudentServices } from "./student.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
// import studentValidationSchema from "./student.validation";

// updated catchAsync method
const getAllStudents = catchAsync(async (req, res, next) => {
    console.log(`From controller:`, req.query);
    const result = await StudentServices.getAllStudentsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Students are retrieved successfully',
        data: result
    });
});


const getSingleStudent = catchAsync(async (req, res, next) => {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is retrieved successfully',
        data: result
    });
})


//old method
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

const updateStudent = catchAsync(async (req, res) => {
    // console.log('This is how client sends the data- controller :', req.body);
    const result = await StudentServices.updateStudentIntoDB(req.params.studentId, req.body.student);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student updated successfully',
        data: result
    });
})
export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,
    updateStudent
}