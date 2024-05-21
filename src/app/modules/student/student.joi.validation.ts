import Joi from "joi";

const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .required()
        .max(20)
        .regex(/^[A-Z][a-z]*$/)
        .messages({
            'string.empty': 'First name cannot be empty',
            'string.max': 'First name cannot be more than 20 characters',
            'string.pattern.base': '{#value} is not in capitalized format',
        }),
    middleName: Joi.string().trim().allow(null, ''),
    lastName: Joi.string()
        .trim()
        .required()
        .max(20)
        .regex(/^[a-zA-Z]+$/)
        .messages({
            'string.empty': 'Last name cannot be empty',
            'string.max': 'Last name cannot be more than 20 characters',
            'string.pattern.base': '{#value} is not valid',
        }),
});

const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().trim().required(),
    fatherOccupation: Joi.string().trim().required(),
    fatherContactNo: Joi.string().trim().required(),
    motherName: Joi.string().trim().required(),
    motherOccupation: Joi.string().trim().required(),
    motherContactNo: Joi.string().trim().required(),
});

const localGuardianValidationSchema = Joi.object({
    name: Joi.string().trim().required(),
    occupation: Joi.string().trim().required(),
    contactNo: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
});

const studentValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameValidationSchema.required(),
    gender: Joi.string()
        .valid('male', 'female')
        .required()
        .messages({
            'any.only': '{#value} is not valid. The gender field can only be one of the following: "male" or "female"',
        }),
    dateOfBirth: Joi.date().iso(),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': '{#value} is not a valid email',
        }),
    contactNumber: Joi.string().trim().required(),
    emergencyContactNo: Joi.string().trim().required(),
    bloodGroup: Joi.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    presentAddress: Joi.string().trim().required(),
    permanentAddress: Joi.string().trim().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImg: Joi.string().uri(),
    isActive: Joi.string()
        .valid('active', 'blocked')
        .default('active'),
});

export default studentValidationSchema;