import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { Users } from "./user.model";

const findLastStudentId = async () => {
    const lastStudent = await Users.findOne({
        role: 'student'
    }, {
        id: 1,
        _id: 0,
    }).sort({ createdAt: -1 })
        .lean();

    //203001  0001
    return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
}
// year, semesterCode, 4 digit number
export const generateStudentId = async (payload: TAcademicSemester) => {
    console.log(await findLastStudentId());
    // first time id 0000
    const currentId = await findLastStudentId() || (0).toString();
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

    incrementId = `${payload.year}${payload.code}${incrementId}`;

    return incrementId;
}