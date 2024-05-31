import { Schema, model } from 'mongoose';
import validator from 'validator';
import { TGuardian, TLocalGuardian, TStudent, /*StudentMethods,*/ StudentModel, TUserName } from './student.interface';
import bycrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First name cannot be empty'],
        maxlength: [20, 'First name cannot be more than 20 characters'],
        validate: {
            validator: function (value: string) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
                return firstNameStr === value;
            },
            message: `{VALUE} is not in capitalized format`,
        }
    },
    middleName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last name cannot be empty'],
        maxlength: [20, 'Last name cannot be more than 20 characters'],
        validate: {
            validator: (value: string) => {
                return validator.isAlpha(value);
            },
            message: `{VALUE} is not valid`
        }
    },
})

const guardianSchema = new Schema<TGuardian>({
    fatherName: {
        type: String,
        trim: true,
        required: true
    },
    fatherOccupation: {
        type: String,
        trim: true,
        required: true
    },
    fatherContactNo: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        trim: true,
        required: true
    },
    motherOccupation: {
        type: String,
        trim: true,
        required: true
    },
    motherContactNo: {
        type: String,
        required: true
    },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
    name: {
        type: String,
        trim: true,
        required: true
    },
    occupation: {
        type: String,
        required: true,
        trim: true,
    },
    contactNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
})

const studentSchema = new Schema<TStudent, StudentModel /*,StudentMethods */>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User ID is required'],
        unique: true,
        ref: 'Users'
    },
    name: {
        type: userNameSchema,
        required: true,
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: "{VALUE} is not valid. The gender field can only be on of the following: 'male' or 'female'"
        },
        required: true,
    },
    dateOfBirth: { type: Date },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value: string) => {
                return validator.isEmail(value)
            },
            message: "{VALUE} is not valid email"
        }
    },
    contactNumber: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
        type: guardianSchema,
        required: true,
    },
    localGuardian: {
        type: localGuardianSchema,
        required: true
    },
    profileImg: { type: String },

    admissionSemester: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicSemester',
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    // password: {
    //     type: String,
    //     required: [true, "Password is required"],
    //     maxlength: [20, 'Password cannot be more than 20 characters!']
    // },
    // isActive: {
    //     type: String,
    //     enum: ['active', 'blocked'],
    //     default: 'active'
    // },
}, {
    toJSON:
        { virtuals: true }
})
// document middleware
// pre save middleware /hook: works on create()  save() function

// studentSchema.pre('save', async function (next) {
//     // console.log(this, 'pre hook: we will save the data');
//     const user = this; //this refers to the document
//     // hashing the pass and save to the database
//     user.password = await bycrypt.hash(user.password, Number(config.bycrypt_salt_rounds));
//     next();
// })

// // post middleware / hook
// studentSchema.post('save', function (doc, next) {
//     doc.password = '';
//     console.log('Password is hidden');
//     next();
// })

// query middleware

studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } })
    next();
})
studentSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } })
    next();
})

// applying pre hook to aggregation method
studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } }); //pipline gives an array
    next();
})

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
    const existingUser = await Student.findOne({ id });
    return existingUser;
}

studentSchema.virtual('fullName').get(function () {
    return (`${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`)
});
// creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//     const existingUser = await Student.findOne({ id: id });
//     return existingUser;
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema);