class ResultError extends Error {
    constructor(name, resultCode, resultDetail) {
        super(name);
        this.resultCode = resultCode;
        this.resultDetail = resultDetail;
    }
}

module.exports = ResultError;
