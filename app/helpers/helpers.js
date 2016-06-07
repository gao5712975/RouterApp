var md5 = require('md5');
/**
 * 加密模块
 */
var encrypt = {
    key: 'a2ffa5c9be07488bbb04a3a47d3c5f6a',
    iv: '64175472480004614961023454661220',
    nonce: null,
    init: function() {
        var nonce = this.nonceCreat();
        this.nonce = nonce;
        return this.nonce;
    },
    nonceCreat: function() {
        var type = 0;
        var deviceId = '40:8D:5C:3B:99:E5';
        var time = Math.floor(new Date().getTime() / 1000);
        var random = Math.floor(Math.random() * 10000);
        return [type, deviceId, time, random].join('_');
    },
    encPwd: function(pwd) {
        var md5pwd = md5(pwd);
        return md5(this.nonce + md5pwd);
    },
    newPwd: function(pwd, newpwd) {
        var md5pwd = md5(newpwd);
        return md5pwd;
    }
};

exports.encrypt = encrypt;

function toQueryPair(key, value) {
    if (typeof value == 'undefined') {
        return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
}

/**
 * 参数转换
 */
export function toQueryString(obj) {
    var ret = [];
    for (var key in obj) {
        key = encodeURIComponent(key);
        var values = obj[key];
        if (values && values.constructor == Array) { //数组
            var queryValues = [];
            for (var i = 0, len = values.length, value; i < len; i++) {
                value = values[i];
                queryValues.push(toQueryPair(key, value));
            }
            ret = ret.concat(queryValues);
        } else { //字符串
            ret.push(toQueryPair(key, values));
        }
    }
    return '?' + ret.join('&');
}

/**
 * 参数转换
 */
export function toBodyString(obj) {
    var ret = [];
    for (var key in obj) {
        key = encodeURIComponent(key);
        var values = obj[key];
        if (values && values.constructor == Array) { //数组
            var queryValues = [];
            for (var i = 0, len = values.length, value; i < len; i++) {
                value = values[i];
                queryValues.push(toQueryPair(key, value));
            }
            ret = ret.concat(queryValues);
        } else { //字符串
            ret.push(toQueryPair(key, values));
        }
    }
    return ret.join('&');
}
