import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bycrypt from 'bcrypt';

const UserSchema = new Schema<TUser>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    needsPasswordChange: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin'],
        required: true
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

UserSchema.pre('save', async function (next) {
    // console.log(this, 'pre hook: we will save the data');
    const user = this; //this refers to the document
    // hashing the pass and save to the database
    user.password = await bycrypt.hash(user.password, Number(config.bycrypt_salt_rounds));
    next();
})

// post middleware / hook
UserSchema.post('save', function (doc, next) {
    doc.password = '';
    console.log('Password is hidden');
    next();
})

export const Users = model<TUser>('Users', UserSchema);