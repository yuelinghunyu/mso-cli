'use strict'
const co = require('co');
const prompt = require('co-prompt');
const fs = require('fs');

const table = require('../model/table');
const tip = require('../model/tip');
const tpls = require('../model/template');

const writeFile = (err)=>{
    if(err){
        console.log(err);
        tip.fail('please restart again');
        process.exit();
    }

    tip.succ("template deleted successfully");

    if(JSON.stringify(tpls) !== '{}'){
        table(tpls);
    }else{
        tip.info('template is null now');
    }

    process.exit();
}

const resolve = (tplName)=>{
    //删除对应的模板;
    if(tpls[tplName]){
        delete tpls[tplName];
    }else{
        tip.fail('template is null');
        process.exit();
    }
    //写入template.json
    fs.writeFile(__dirname + '/../model/template.json',JSON.stringify(tpls), 'utf-8', writeFile);
}

module.exports = () =>{
    co(function *(){
        const tplName = yield prompt('template name: ');
        return new Promise((resolve,reject)=>{
            resolve(tplName)
        })
    }).then(resolve)
}