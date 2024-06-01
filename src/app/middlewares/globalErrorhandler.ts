//eslint-disable no-unused-vars,
//eslint-disable @typescript-eslint/no-unused-vars
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    // setting default values
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong!';

    let errorSources: TErrorSource = [{
        path: '',
        message: 'Something went wrong!'
    }]


    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources
    } else if (err?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }

    return res.status(statusCode).json({
        success: false,
        message: message,
        errorSources,
        stack: config.NODE_ENV === 'development' ? err?.stack : null,
        // err
    })
}

export default globalErrorHandler;

/*
Pattern for error messages

success: boolean
message:string
errorSources:[
    path: '',
    message: ''
]
stack:
*/