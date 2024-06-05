import mongoose from "mongoose";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Users } from "../user/user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { searchableFields } from "./student.constant";

// const createStudentIntoDB = async (studentData: TStudent) => {
//     // static method
//     if (await Student.isUserExists(studentData.id)) {
//         throw new Error('User already exists');
//     }

//     const result = await Student.create(studentData); //built in static method

//     // instance method
//     // const student = new Student(studentData); //create an instance
//     // if (await student.isUserExists(studentData.id)) {
//     //     throw new Error('User already exists')
//     // }
//     // const result = await student.save(); //built in instance method
//     return result;
// }

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
    // console.log('From services:', query);
    // const queryObj = { ...query }; //copied
    // const searchableFields = ['name.firstName', 'email', 'name.middleName', 'name.lastName'];

    // let searchTerm = '';
    // if (query?.searchTerm) {
    //     searchTerm = query.searchTerm as string;
    // }

    // // filtering

    // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    // excludeFields.forEach(el => delete queryObj[el]);
    // console.log(query, queryObj);

    // const searchQuery = Student.find({
    //     $or: searchableFields.map((field) => {
    //         return { [field]: { $regex: searchTerm, $options: 'i' } }
    //     })
    // });

    // const filterQuery = searchQuery.find(queryObj).populate('admissionSemester').populate({
    //     path: 'academicDepartment',
    //     populate: {
    //         path: 'academicFaculty'
    //     }
    // });

    // let sort = '-createdAt';

    // if (query?.sort) {
    //     sort = query.sort as string;
    // }

    // const sortQuery = filterQuery.sort(sort);

    // let page = 1;
    // let limit = 1;
    // let skip = 0;

    // if (query?.limit) {
    //     limit = Number(query.limit);
    // }

    // if (query?.page) {
    //     page = Number(query.page);
    //     skip = (page - 1) * limit;
    // }

    // const paginateQuery = sortQuery.skip(skip)

    // const limitQuery = paginateQuery.limit(limit);

    // //filed limiting
    // let fields = '-__v';

    // //fields = 'name, email',
    // if (query?.fields) {
    //     fields = (query.fields as string).split(',').join(' ');
    //     console.log(fields);
    // }

    // const fieldQuery = await limitQuery.select(fields);
    // return fieldQuery;

    const studentQuery = new QueryBuilder(Student.find(), query).search(searchableFields).filter().sort().paginate().fields();

    const result = await studentQuery.modelQuery;
    return result;
}

const getSingleStudentFromDB = async (id: string) => {
    // const result = await Student.findOne({ id });

    // [{'$match': {isDeleted: {$ne: true}}},{ '$match': { id: '789456' } }]
    // const result = await Student.aggregate([
    //     {
    //         $match: { id: id }
    //     }
    // ])
    const result = await Student.findOne({ id: id }).populate('admissionSemester').populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty'
        }
    });
    return result;
}

const deleteStudentFromDB = async (id: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        // first transaction
        const deletedStudent = await Student.findOneAndUpdate(
            { id: id },
            { isDeleted: true },
            { new: true, session }
        );

        if (!deletedStudent) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
        }

        // second transaction

        const deletedUser = await Users.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session }
        )

        if (!deletedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedStudent;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error('Could not delete student')
    }

}

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {

    const { name, guardian, localGuardian, ...remainingStudentData } = payload;
    const modifiedUpdatedData: Record<string, unknown> = { ...remainingStudentData };

    /*
    from client side data comes like this:
    {
     guardian: {
        fatherOccupation: 'Teacher'
    }
    }
    we will send the data like "guardian.fatherOccupation = value" format
    */

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value
        }
    }

    console.log(modifiedUpdatedData);
    const result = await Student.findOneAndUpdate(
        { id },
        modifiedUpdatedData,
        { new: true, runValidators: true }
    );
    return result;
}
export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    updateStudentIntoDB
}