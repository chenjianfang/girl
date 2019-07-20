function resMsg(data, message, code = 0) {
    return {
        code,
        data,
        message,
    }
}

/**
 * 成功消息
 * @param data
 * @param message
 * @returns {{code, data, message}}
 */
function success(data, message = '') {
    return resMsg(data, message, 0);
}

/**
 * 错误消息
 * @param message
 * @param data
 * @returns {{code, data, message}}
 */
function error( message = '', data = '') {
    return resMsg(data, message, -1);
}

module.exports = {
    success,
    error,
};
