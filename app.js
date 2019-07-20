const express = require('express');
const sha256 = require('sha256');
const Girl = require('./src/models.js');
const { success, error } = require('./util.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



/**
 * 查询账号信息
 * @param account
 * @returns {Promise<any>}
 */
function findAccount({ account } = {}) {
    return new Promise((resolve, reject) => {
        Girl.findOne({ account }, (err, docs) => {
            if (!err) {
                resolve(docs);
            } else {
                reject(err);
            }
        });
    });
}

/**
 * 更新用户信息
 * @param params
 * @returns {Promise<any>}
 */
function update(params) {
    return new Promise((resolve, reject) => {
        if (params.account) {
            Girl.findOneAndUpdate({ account: params.account }, params , (err, docs) => {
                if (err) reject(err);
                resolve(docs);
            });
        } else {
            return reject(error('没找到对应账户'))
        }
    });

}

/**
 * 删除账户
 * @param account
 * @returns {Promise<any>}
 */
function remove(account) {
    return new Promise( async (resolve, reject) => {
        Girl.findOneAndRemove({ account }, (err, docs) => {
           if (err) reject(err);
           resolve(docs);
        });
    });
}

/**
 * 登陆
 * @param account
 * @returns {Promise<*>}
 */
async function signIn(account) {
    const docs = await findAccount({ account });
    if (docs) return success(docs);
    else return error('账户还没有注册');
}

/**
 * 添加账户
 * @param account
 * @returns {Promise<any>}
 */
async function signUp(params) {
    return new Promise(async (resolve, reject) => {
        const docs = await findAccount({ account: params.account });
        if (docs) {
            reject(error('该账户已存在'));
        } else {
            Girl.create({
                id: sha256(params.account),
                ...params
            }, (err, docs) => {
                if (err) reject(error('err'));
                resolve(success(docs));
            });
        }
    });
}

app.listen(8083, () => {
    console.log('localhost:8083');
});
