import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester is created successfully',
        data: result,
    })
})

const getAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester fetched successfully',
        data: result,
    })
})

const fetchSingleSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.getSemesterForId(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester fetched successfully',
        data: result,
    })
    return result;
})

const updateSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.updateSemesterInfoToDB(req.params.id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester updated successfully',
        data: result,
    })
    return result;
})

export const AcademicSemesterControllers = {
    createAcademicSemester,
    getAcademicSemester,
    fetchSingleSemester,
    updateSemester
}