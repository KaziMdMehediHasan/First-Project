import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const academicDepartmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty'
    },

}, {
    timestamps: true,
})

// prevent creation of a duplicate department
academicDepartmentSchema.pre('save', async function (next) {
    const isDocumentExist = await AcademicDepartment.findOne({
        name: this.name
    })

    if (isDocumentExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Department already exists!')
    }
    next();
})



// error handling when target document is not found while performing the update operarion
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();
    // console.log(query);
    const isDepartmentExist = await AcademicDepartment.findOne(
        // {_id: query._id} --> this is same as using the query directly because query = {_id: XXXXX}
        query
    )

    if (!isDepartmentExist) {
        // throw new Error('Document does not exist')
        throw new AppError(404, 'Document does not exist');
    }
    next();
})

export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema);