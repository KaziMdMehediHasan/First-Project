import { TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
    // extract value within double quotes using regex
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    // console.log(match);
    const errorSources = [{
        path: '',
        message: `${extractedMessage} already exists`
    }]

    const statusCode = 400;
    return {
        statusCode,
        message: `Duplicate Error`,
        errorSources
    }
}

export default handleDuplicateError;