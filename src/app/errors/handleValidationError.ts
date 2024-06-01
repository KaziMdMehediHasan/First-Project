import mongoose from "mongoose";
import { TErrorSource } from "../interface/error";

const handleValidationError = (err: mongoose.Error.ValidationError) => {
    const valuesOfMongooseError = Object.values(err.errors);
    const errorSources: TErrorSource = valuesOfMongooseError.map((val) => {
        return {
            path: val?.path,
            message: val?.message
        };
    })

    const statusCode = 400;

    return {
        statusCode,
        message: 'Validation Error',
        errorSources
    }
}

export default handleValidationError;