const { ObjectId } = require('mongoose').Types;
const util = require('util');
const ResultError = require('./result-error');

const Kinds = function () {};
module.exports = Kinds;

Kinds.isArray = Array.isArray;
Kinds.isString = (value) => typeof value === 'string' || value instanceof String;
Kinds.isBoolean = (value) => typeof value === 'boolean';
Kinds.isNumber = (value) => typeof value === 'number';
Kinds.isObjectId = (value) => typeof value !== 'number' && ObjectId.isValid(value);
Kinds.isObjectIdString = (value) => Kinds.isString(value) && ObjectId.isValid(value);
Kinds.isEmpty = (value) => value === undefined || value === null || value.length === 0;
Kinds.isSet = (value) => value !== undefined && value !== null && (value.length !== undefined || value.length !== 0);
Kinds.isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
Kinds.isObject = (value) => value && typeof value === 'object' /* && value.constructor === Object */;
Kinds.isFunction = (value) => typeof value === 'function';
Kinds.isRegExp = (value) => value && typeof value === 'object' && value.constructor === RegExp;
Kinds.isError = (value) => value instanceof Error && typeof value.message !== 'undefined';
Kinds.isDate = (value) => value instanceof Date;

Kinds.mustExist = (value, message = 'Unset value!', resultCode = null, resultDetail = null) => {
    if (value === null || value === undefined) {
        throw new ResultError(message, resultCode, resultDetail);
    }
};
Kinds.mustBeNumber = (value, message = 'Value must be a Number', resultCode = null, resultDetail = null) => {
    if (!Kinds.isNumber(value)) {
        throw new ResultError(message, resultCode, resultDetail);
    }
};
Kinds.mustBeString = (value, message = 'Value must be a String', resultCode = null, resultDetail = null) => {
    if (!Kinds.isString(value)) {
        throw new ResultError(message, resultCode, resultDetail);
    }
};
Kinds.mustBeBoolean = (value, message = 'Value must be a Boolean', resultCode = null, resultDetail = null) => {
    if (!Kinds.isBoolean(value)) {
        throw new ResultError(message, resultCode, resultDetail);
    }
};
Kinds.mustBeDate = (value, message = 'Value must be a Date', resultCode = null, resultDetail = null) => {
    if (!Kinds.isDate(value)) {
        throw new ResultError(message, resultCode, resultDetail);
    }
};
Kinds.mustBeObject = (value, message = 'Value must be a Object', resultCode = null, resultDetail = null) => {
    if (!Kinds.isObject(value)) {
        throw new ResultError(message, resultCode, resultDetail);
    }
};
Kinds.mustBeArray = (value, message = 'Value must be an Array', resultCode = null, resultDetail = null) => {
    if (!Kinds.isArray(value)) {
        throw new ResultError(message, resultCode, resultDetail);
    }
};
Kinds.mustIn = (arrayOrObject, value, message = 'Value is not acceptable', resultCode = null, resultDetail = null) => {
    if (Kinds.isArray(arrayOrObject)) {
        if (!arrayOrObject.includes(value)) {
            throw new ResultError(message, resultCode, resultDetail);
        }
    } else if (Kinds.isObject(arrayOrObject)) {
        if (!Kinds.objectKeys(arrayOrObject).includes(value)) {
            throw new ResultError(message, resultCode, resultDetail);
        }
    } else {
        throw new ResultError(`arrayOrObject must be Array or Object but: ${typeof arrayOrObject}`, resultCode, resultDetail);
    }
};

/**
 * Validating number
 *
 * @param {number} value
 * @param {number} compareValue
 * @param {string} message
 */
Kinds.mustGreaterThan = (value, compareValue, message = null, resultCode = null, resultDetail = null) => {
    Kinds.mustBeNumber(value);
    Kinds.mustBeNumber(compareValue);

    if (value <= compareValue) {
        throw new ResultError(message || `value[${value}] must greater than ${compareValue}`, resultCode, resultDetail);
    }
};

/**
 * Validating number
 *
 * @param {number} value
 * @param {number} compareValue
 * @param {string} message
 */
Kinds.mustGreaterThanOrEquals = (value, compareValue, message = null, resultCode = null, resultDetail = null) => {
    Kinds.mustBeNumber(value);
    Kinds.mustBeNumber(compareValue);

    if (value < compareValue) {
        throw new ResultError(message || `value[${value}] must smaller than or equals ${compareValue}`, resultCode, resultDetail);
    }
};

/**
 * Validating number
 *
 * @param {number} value
 * @param {number} compareValue
 * @param {string} message
 */
Kinds.mustSmallerThan = (value, compareValue, message = null, resultCode = null, resultDetail = null) => {
    Kinds.mustBeNumber(value);
    Kinds.mustBeNumber(compareValue);

    if (value >= compareValue) {
        throw new ResultError(message || `value[${value}] must smaller than ${compareValue}`, resultCode, resultDetail);
    }
};

/**
 * Validating number
 *
 * @param {number} value
 * @param {number} compareValue
 * @param {string} message
 */
Kinds.mustSmallerThanOrEquals = (value, compareValue, message = null, resultCode = null, resultDetail = null) => {
    Kinds.mustBeNumber(value);
    Kinds.mustBeNumber(compareValue);

    if (value > compareValue) {
        throw new ResultError(message || `value[${value}] must smaller than or equals ${compareValue}`, resultCode, resultDetail);
    }
};

/**
 *
 * @type {Array<String>}
 */
Kinds.objectKeys = Object.keys;

/**
 *
 * @type {Array}
 */
Kinds.objectValues = Object.values;

Kinds.asStrings = (arrayOfString) => {
    if (Kinds.isArray(arrayOfString)) {
        return arrayOfString.map((item) => (item === null || item === undefined ? item : `${item}`));
    }
    return arrayOfString === null || arrayOfString === undefined ? [] : [`${arrayOfString}`];
};

Kinds.asNumbers = (array) => {
    const result = [];

    if (!Kinds.isArray(array)) {
        return [Kinds.asNumber(array, null)];
    }

    if (array) {
        array.forEach((value) => {
            const n = Kinds.asNumber(value, null);
            if (n !== null) {
                result.push(n);
            }
        });
    }
    return result;
};

Kinds.asDate = (date, resultCode = null, resultDetail = null) => {
    if (Kinds.isDate(date)) {
        return date;
    }
    try {
        return new Date(date);
    } catch (e) {
        throw new ResultError(e.message, resultCode, resultDetail);
    }
};

Kinds.asNumber = (value, defaultValue, resultCode = null, resultDetail = null) => {
    if (Kinds.isSet(defaultValue) && !Kinds.isNumber(defaultValue)) {
        throw new ResultError(`Invalid Default Number: ${JSON.stringify(defaultValue)}`, resultCode, resultDetail);
    }

    const r = Number(value);
    if (isNaN(r) || !Kinds.isSet(value)) {
        if (Kinds.isNumber(defaultValue)) {
            return defaultValue;
        }
        throw new ResultError(`Invalid Number value: ${JSON.stringify(value)}`, resultCode, resultDetail);
    }
    return r;
};

Kinds.asObjectId = (stringOrObjectId) => {
    if (Kinds.isString(stringOrObjectId)) {
        try {
            return new ObjectId(stringOrObjectId);
        } catch (e) {
            throw new ResultError(`Invalid ObjectId string: ${JSON.stringify(stringOrObjectId)}`);
        }
    }
    if (Kinds.isObjectId(stringOrObjectId)) {
        return stringOrObjectId;
    }
    throw new ResultError(`singleOrArray must be String or ObjectId, but ${typeof singleOrArray}`);
};

Kinds.asObjectIds = (arrayOrObjectId, skipNull = false) => {
    if (Kinds.isEmpty(arrayOrObjectId)) return [];

    if (Kinds.isArray(arrayOrObjectId)) {
        let result = [];
        for (const item of arrayOrObjectId) {
            if (Kinds.isEmpty(item) && skipNull) {
                break;
            }
            result.push(Kinds.asObjectId(item));
        }
        return result;
    }
    return [Kinds.asObjectId(arrayOrObjectId)];
};

Kinds.randomString = (n) => {
    let str = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < n; i += 1) {
        str += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return str;
};

Kinds.randomNumber = (n) => {
    let str = '';
    const possible = '0123456789';

    for (let i = 0; i < n; i += 1) {
        str += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return str;
};

Kinds.randomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

Kinds.moveArrayElement = (array, fromIndex, toIndex) => {
    Kinds.mustBeArray(array);
    if (fromIndex >= array.length) {
        throw new Error('fromIndex must small than array.length');
    }
    if (toIndex >= array.length) {
        throw new Error('toIndex must small than array.length');
    }

    const x = array[fromIndex];
    array[fromIndex] = array[toIndex];
    array[toIndex] = x;
};

Kinds.randomElelment = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

Kinds.randomUniqueElements = (array) => {
    Kinds.mustBeArray(array);
    result = [];

    const indexes = {};
    let count = Kinds.randomInt(array.length - 1) + 1;
    while (count > 0) {
        indexes[Kinds.randomInt(array.length)] = true;
        count--;
    }

    for (const index of Object.keys(indexes)) {
        result.push(array[index]);
    }

    return result;
};

Kinds.toString = (myObject) => {
    return util.inspect(myObject, false, null, true /* enable colors */);
};

Kinds.equals = (a, b) => {
    return Kinds.getDiffField(a, b) === null;
};

/**
 * return null if no diff.
 * otherwise, return string descripble diff field.
 * this functions desn't compare functions.
 */
Kinds.getDiffField = (a, b, path = '') => {
    if (Kinds.isEmpty(a) || Kinds.isEmpty(b)) {
        if (Kinds.isEmpty(a) === Kinds.isEmpty(b)) {
            return null;
        } else {
            return path;
        }
    }

    if (typeof a !== typeof b) {
        return path;
    }

    if (Kinds.isArray(a)) {
        if (a.length !== b.length) {
            return path;
        }
        for (let i = 0; i < a.length; i++) {
            const x = Kinds.getDiffField(a[i], b[i], path + `[${i}]`);
            if (x) {
                return x;
            }
        }
        return null;
    }

    if (Kinds.isObject(a)) {
        // if (Kinds.isFunction(a.equals)) {
        //     return a.equals(b) ? null : path;
        // }

        const fields = {};
        for (let key of Kinds.objectKeys(a)) {
            if (!Kinds.isFunction(a[key])) {
                fields[key] = 1;
            }
        }
        for (let key of Kinds.objectKeys(b)) {
            if (!Kinds.isFunction(b[key])) {
                fields[key] = 1;
            }
        }
        for (let key of Kinds.objectKeys(fields)) {
            const x = Kinds.getDiffField(a[key], b[key], path + `.${key}`);
            if (x) {
                return x;
            }
        }
        return null;
    }

    return a === b ? false : path;
};
