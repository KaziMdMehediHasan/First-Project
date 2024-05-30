import { z } from 'zod';

// UserName Schema
const userNameValidationSchema = z.object({
    firstName: z.string()
        .trim()
        .min(1, { message: 'First name cannot be empty' })
        .max(20, 'First name cannot be more than 20 characters')
        .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, {
            message: 'First name is not in capitalized format'
        }),
    middleName: z.string().trim().optional(),
    lastName: z.string()
        .trim()
        .min(1, { message: 'Last name cannot be empty' })
        .max(20, 'Last name cannot be more than 20 characters')
        .refine(value => /^[a-zA-Z]+$/.test(value), {
            message: 'Last name is not valid'
        })
});

// Guardian Schema
const guardianValidationSchema = z.object({
    fatherName: z.string().trim().min(1, { message: 'Father name cannot be empty' }),
    fatherOccupation: z.string().trim().min(1, { message: 'Father occupation cannot be empty' }),
    fatherContactNo: z.string().min(1, { message: 'Father contact number cannot be empty' }),
    motherName: z.string().trim().min(1, { message: 'Mother name cannot be empty' }),
    motherOccupation: z.string().trim().min(1, { message: 'Mother occupation cannot be empty' }),
    motherContactNo: z.string().min(1, { message: 'Mother contact number cannot be empty' })
});

// LocalGuardian Schema
const localGuardianValidationSchema = z.object({
    name: z.string().trim().min(1, { message: 'Name cannot be empty' }),
    occupation: z.string().trim().min(1, { message: 'Occupation cannot be empty' }),
    contactNo: z.string().min(1, { message: 'Contact number cannot be empty' }),
    address: z.string().trim().min(1, { message: 'Address cannot be empty' })
});

// boolean schema
// const isDeleted = z.boolean({
//     required_error: "isDeleted is required",
//     invalid_type_error: "isDeleted must be a boolean",
// });

// Student Schema
const createStudentValidationSchema = z.object({
    body: z.object({
        // id: z.string().min(1, { message: 'ID cannot be empty' }),
        password: z.string().max(20),
        student: z.object({
            name: userNameValidationSchema,
            gender: z.enum(['male', 'female'], {
                errorMap: () => ({ message: "Gender must be either 'male' or 'female'" })
            }),
            dateOfBirth: z.string().optional(),
            email: z.string()
                .min(1, { message: 'Email cannot be empty' })
                .email({ message: 'Invalid email' }),
            contactNumber: z.string().min(1, { message: 'Contact number cannot be empty' }),
            emergencyContactNo: z.string().min(1, { message: 'Emergency contact number cannot be empty' }),
            bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
            presentAddress: z.string().min(1, { message: 'Present address cannot be empty' }),
            permanentAddress: z.string().min(1, { message: 'Permanent address cannot be empty' }),
            guardian: guardianValidationSchema,
            localGuardian: localGuardianValidationSchema,
            admissionSemester: z.string(),
            profileImg: z.string().optional()
            // isActive: z.enum(['active', 'blocked']).default('active'),
            // isDeleted: z.boolean()
        })
    })

});

export const StudentValidations = {
    createStudentValidationSchema
};