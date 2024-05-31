import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Department created successfully',
        data: result
    })
})

const getAllAcademicDepartments = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Departments fetched successfully',
        data: result
    })
})

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(req.params.departmentId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Department fetched successfully',
        data: result
    })
})

const updateAcademicDepartment = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(req.params.departmentId, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Department updated successfully',
        data: result
    })
})

export const AcademicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment
}