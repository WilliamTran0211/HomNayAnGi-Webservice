const ResultCodes = require('./common-result-codes');
const Kinds = require('./kinds');

class Res {
    constructor(res) {
        this.res = res;
    }

    end(status, body) {
        this.res.status(status).send(body);
    }

    send(httpStatus, code, message, data, meta) {
        let payload;
        if (Kinds.isSet(data)) {
            payload = Kinds.isArray(data) ? data : [data];
        }

        this.end(httpStatus, {
            code,
            message,
            results: payload,
            meta
        });
    }

    ok(message, data, meta) {
        this.send(200, ResultCodes.SUCCESS, message, data, meta);
    }

    bad(message, data, fields) {
        this.send(400, ResultCodes.PARAM_INVALID, message, fields);
    }

    invalidState(message, data) {
        this.send(200, ResultCodes.INVALID_STATE, message, data); // be simple
        // this.send(422, ResultCodes.INVALID_STATE, message, data, 400);
    }

    unauthorized() {
        this.send(401, ResultCodes.UNAUTHORIZED, 'Login required'); // be simple
        // this.send(401, ResultCodes.UNAUTHORIZED, 'Login required', 401);
    }

    forbidden(message, data) {
        this.send(403, ResultCodes.FORBIDDEN, message, data); // be simple
    }

    noContent(message, data) {
        // this.send(204, ResultCodes.NO_CONTENT, message, data);
        this.send(200, ResultCodes.NO_CONTENT, message, data); // be simple
    }
}

module.exports = (res) => new Res(res);
