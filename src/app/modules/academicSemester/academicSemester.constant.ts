import { TAcademicSemesterCode, TAcademicSemesterName, TMonths } from "./academicSemester.interface";
import { TAcademicSemesterNameCodeMapper } from './academicSemester.interface';

export const Months: TMonths[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const AcademicSemesterName: TAcademicSemesterName[] = ['Autumn', 'Fall', 'Summer'];
export const AcademicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'];

export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03'
}