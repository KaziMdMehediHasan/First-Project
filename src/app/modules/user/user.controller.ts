import { UserServices } from "./user.service";
import { NextFunction, Request, Response } from 'express';

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //creating a schema validation using zod
        const { password, student: studentData } = req.body;

        // validating through joi library
        // const { value, error } = studentValidationSchema.validate(studentData);

        //validate data using zod

        // const zodParsedData = studentValidationSchema.parse(studentData);
        // console.log(`from joi : ${error}`, { value });
        // will call servUserRoutes, { redirecton to send this validated data
        const result = await UserServices.createStudentIntoDB(password, studentData);

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
    } catch (error) {
        // res.status(500).json({
        //     success: false,
        //     message: error.message || 'something went wrong',
        //     error: error
        // })
        next(error)
    }

}

export const UserControllers = {
    createStudent
}