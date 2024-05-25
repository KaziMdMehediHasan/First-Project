import { TStudent } from "./student.interface";
import { Student } from "./student.model";

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

const getAllStudentsFromDB = async () => {
    const result = await Student.find();
    return result;
}

const getSingleStudentFromDB = async (id: string) => {
    // const result = await Student.findOne({ id });

    // [{'$match': {isDeleted: {$ne: true}}},{ '$match': { id: '789456' } }]
    const result = await Student.aggregate([
        {
            $match: { id: id }
        }
    ])
    return result;
}

const deleteStudentFromDB = async (id: string) => {
    const result = await Student.updateOne({ id: id }, { isDeleted: true });
    return result;
}


export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB
}