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
    // return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
    return lastStudent?.id ? lastStudent.id : undefined;
}
// year, semesterCode, 4 digit number
export const generateStudentId = async (payload: TAcademicSemester) => {
    // console.log(await findLastStudentId());
    // first time id 0000
    // const currentId = await findLastStudentId() || (0).toString();
    let currentId = (0).toString(); //0000 by default
    const lastStudentId = await findLastStudentId();
    const lastStudentYear = lastStudentId?.substring(0, 4);
    const lastStudentIdSemesterCode = lastStudentId?.substring(4, 6);
    const currentSemesterCode = payload.code;
    const currentYear = payload.year;

    // checks if the semester and year are same as the previous student then takes that id as a reference to assign a new id for the new student in the same session
    if (lastStudentId && lastStudentIdSemesterCode === currentSemesterCode && lastStudentYear === currentYear) {
        currentId = lastStudentId?.substring(6);
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

    incrementId = `${payload.year}${payload.code}${incrementId}`;

    return incrementId;
}