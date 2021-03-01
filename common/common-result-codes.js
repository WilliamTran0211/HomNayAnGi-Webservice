const ResultError = require('./result-error');

module.exports = {
    ERROR: 'error',
    SUCCESS: 'success',
    UNAUTHORIZED: 'unauthorized',
    FORBIDDEN: 'forbidden',
    PARAM_INVALID: 'param_invalid', // wrong format or missing
    PARAM_INVALID_VALUE: 'param_invalid_value', // right format, but wrong value
    TOKEN_EXPIRED: 'token_expired',
    TOKEN_INVALID: 'token_invalid',
    NO_CONTENT: 'no_content',
    DUPLICATED: 'duplicated',
    INVALID_STATE: 'invalid_state', // request params is correct + ser

    newError: (message, resultCode, resultData = null) => {
        return new ResultError(message, resultCode, resultData);
    }
};
