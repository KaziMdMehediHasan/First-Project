import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Courses } from "./course.model"

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Courses.create(payload);
    return result;
}

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(Courses.find().populate('preRequisiteCourses.course'), query)
        .search(courseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields()
    const result = await courseQuery.modelQuery;
    return result;
}

const getSingleCourseFromDB = async (id: string) => {
    const result = await Courses.findById({
        _id: id
    });
    return result;
}
const deleteCourseFromDB = async (id: string) => {
    const result = await Courses.findByIdAndUpdate(
        { _id: id }, { isDeleted: true }, { new: true }
    )
    return result;
}

export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB
}