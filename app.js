var express = require('express');
var Girl = require('./src/models.js');
var app = express();

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
 * 添加账户
 * @param account
 * @returns {Promise<any>}
 */
function add(account) {
    return new Promise(async (resolve, reject) => {
        const docs = await findAccount({ account });
        if (docs) {
            resolve({
                code: 1,
                message: '该账户已存在'
            });
        } else {
            // Girl.create({
            //     id: '314dfafdafa123',
            //     account: 'jlkfdasfd',
            //     password: 'jlkfd;j;asfd',
            //     name: '小红',
            //     gender: 1,
            //     age: 18,
            //     school: '深圳大学',
            //     location: [32,1231],
            //     label: ['勤奋', '好学']
            // }, (err, docs) => {
            //     console.log(err);
            //     console.log(docs);
            // });
        }
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
            return { err: true, message: '请指定修改账户' };
        }
    });

}

/**
 * 删除整条数据
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

app.listen(8083, () => {
    console.log('localhost:8083');
});
