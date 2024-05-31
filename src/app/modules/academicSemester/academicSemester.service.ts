import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import { TAcademicSemesterNameCodeMapper } from './academicSemester.interface';
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {

    // semester name --> semester code
    // mapped type
    // type TAcademicSemesterNameCodeMapper = {
    //     [key: string]: string
    // };

    // const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    //     Autumn: '01',
    //     Summer: '02',
    //     Fall: '03'
    // }

    // we are not letting anyone to input wrong code against the semester name
    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid Semester Code')
    }
    const result = await AcademicSemester.create(payload);
    return result;
}

const getAllAcademicSemestersFromDB = async () => {
    const result = await AcademicSemester.find();
    return result;
}

const getSemesterForId = async (payload: string) => {
    const result = await AcademicSemester.findById({
        _id: payload
    });
    return result;
}

const updateSemesterInfoToDB = async (id: string, payload: Partial<TAcademicSemester>) => {
    if (payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid Semester Code')
    }
    const result = await AcademicSemester.findOneAndUpdate(
        { _id: id },
        payload,
        // { $set: payload },
        { new: true }
    );
    return result;
}
export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemestersFromDB,
    getSemesterForId,
    updateSemesterInfoToDB
}