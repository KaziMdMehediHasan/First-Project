import catchAsync from "../../utils/catchAsync";
import { AcademicFacultyServices } from "./academicFaculty.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty created successfully',
        data: result
    })
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.getAllAcademicFaculitesFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculties fetched successfully',
        data: result
    })
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(req.params.facultyId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty fetched successfully',
        data: result
    })
})

const updateAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(req.params.facultyId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty updated successfully',
        data: result
    })
})

export const AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}