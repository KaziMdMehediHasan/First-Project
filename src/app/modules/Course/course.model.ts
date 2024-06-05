import { Schema, model } from "mongoose";
import { TCourse, TPreRequisiteCourses } from "./course.interface";

const preRequisiteCourse = new Schema<TPreRequisiteCourses>({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Courses'
    },
    isDeleted: {
        type: 'boolean',
        default: false,
    }
})

const courseSchema = new Schema<TCourse>({
    title: {
        type: "string",
        trim: true,
        required: true,
        unique: true
    },
    prefix: {
        type: "string",
        required: true,
    },
    code: {
        type: "number",
        trim: true,
        required: true,
    },
    credits: {
        type: "number",
        trim: true,
        required: true,
    },
    preRequisiteCourses: [preRequisiteCourse]
})

export const Courses = model<TCourse>('Courses', courseSchema);