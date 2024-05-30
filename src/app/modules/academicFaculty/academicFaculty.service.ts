import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
    const result = await AcademicFaculty.create(payload);
    return result;
}

const getAllAcademicFaculitesFromDB = async () => {
    const result = await AcademicFaculty.find();
    return result;
}

const getSingleAcademicFacultyFromDB = async (payload: string) => {
    const result = await AcademicFaculty.findOne({
        _id: payload
    })
    return result;
}

const updateAcademicFacultyIntoDB = async (id: string, payload: Partial<TAcademicFaculty>) => {
    const result = AcademicFaculty.findByIdAndUpdate(
        { _id: id }, payload, { new: true }
    );
    return result;
}

export const AcademicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFaculitesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB
}