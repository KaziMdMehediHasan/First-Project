import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
// import { NewUser, TUser } from "./user.interface";
import { Users } from "./user.model";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./user.utils";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
    // static method
    // if (await Student.isUserExists(studentData.id)) {
    //     throw new Error('User already exists');
    // }

    // if password is not provided , use default password

    // create a user object
    const userData: Partial<TUser> = {};

    userData.password = password || (config.default_password as string);
    // if (!password) {
    //     user.password = config.default_password as string;
    // } else {
    //     user.password = password;
    // }

    // set student role

    userData.role = 'student';

    // find academic semester info

    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);
    //set manually generated id
    // userData.id = '2104';

    const session = await mongoose.startSession();
    try {
        session.startTransaction(); //--> transaction started
        // set generatedId
        if (admissionSemester) {
            userData.id = await generateStudentId(admissionSemester);
        }

        //create a user (transaction 1)
        //const newUser = await Users.create(userData); //--> built in static method
        const newUser = await Users.create([userData], { session }); //--> send the data as array for transaction
        console.log(userData);
        // create a student

        // if (Object.keys(newUser).length) {
        //     console.log('I am in');
        //     //set id , ._id as user
        //     payload.id = newUser?.id;
        //     payload.user = newUser?._id; //reference _id
        //     const newStudent = await Student.create(payload);
        //     return newStudent;
        // }

        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
        }
        payload.id = newUser[0]?.id;
        payload.user = newUser[0]?._id; //reference _id


        // create a student --> transaction - 2
        const newStudent = await Student.create([payload], { session });
        if (!newStudent.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
        }

        await session.commitTransaction();
        await session.endSession();
        return newStudent;
        // instance method
        // const student = new Student(studentData); //create an instance
        // if (await student.isUserExists(studentData.id)) {
        //     throw new Error('User already exists')
        // }
        // const result = await student.save(); //built in instance method
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error('Student creation failed')
    }

}

export const UserServices = {
    createStudentIntoDB
}