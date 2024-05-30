import { UserServices } from "./user.service";
import { NextFunction, Request, RequestHandler, Response } from 'express';
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res, next) => {
    //creating a schema validation using zod
    const { password, student: studentData } = req.body;
    console.log(req.body);
    const result = await UserServices.createStudentIntoDB(password, studentData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is created successfully',
        data: result
    });
})

export const UserControllers = {
    createStudent
}