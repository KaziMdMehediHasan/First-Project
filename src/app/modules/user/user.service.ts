import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
// import { NewUser, TUser } from "./user.interface";
import { Users } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
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

    //set manually generated id
    userData.id = '203010001';
    //create a user

    const newUser = await Users.create(userData); //built in static method

    // create a student

    if (Object.keys(newUser).length) {
        //set id , ._id as user
        studentData.id = newUser?.id;
        studentData.user = newUser?._id; //reference _id
        const newStudent = await Student.create(studentData);
        return newStudent;
    }
    // instance method
    // const student = new Student(studentData); //create an instance
    // if (await student.isUserExists(studentData.id)) {
    //     throw new Error('User already exists')
    // }
    // const result = await student.save(); //built in instance method
}

export const UserServices = {
    createStudentIntoDB
}