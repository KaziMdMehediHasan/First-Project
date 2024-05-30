import { z } from 'zod';

const createAcademicFacultyValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Acadedmic faculty must be a string',
            required_error: 'Academic faculty must be provided'
        })
    })
})

const updateAcademicFacultyValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Acadedmic faculty must be a string',
            required_error: 'Academic faculty must be provided'
        })
    })
})


export const AcademicFacultyValidation = {
    createAcademicFacultyValidationSchema,
    updateAcademicFacultyValidationSchema
}