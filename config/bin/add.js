'use strict'
const co = require('co');
const prompt = require('co-prompt');
const fs = require("fs");

const table = require('../model/table');
const tip = require('../model/tip');
const tpls = require('../model/template');

const writeFile = (err)=>{
    //处理错误;
    if(err){
        console.log(err);
        tip.fail('please restart again');
        process.exit();
    }
    table(tpls);
    tip.succ('a new template add successed');
    process.exit();
}

const resolve = (result)=>{
    const { tplName,gitUrl,branch,description } = result;
    //避免重复添加;
    if(!tpls[tplName]){
        tpls[tplName] = {};
        tpls[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '');
        tpls[tplName]['branch'] = branch;
        tpls[tplName]['description'] = description;
    }else{
        tip.fail('template exist');
        process.exit();
    }

    fs.writeFile(__dirname + '/../model/template.json',JSON.stringify(tpls), 'utf-8', writeFile)
}

module.exports = ()=>{
    co(function *(){
        //按提示输入信息;
        const tplName = yield prompt('template name: ');
        let gitModel = null;
        switch (tplName){
            case "vue":
            gitModel = {
                gitUrl:"https://github.com/yuelinghunyu/mso-vue-cli.git",
                branch:"master",
                description:"a vue template created by jdj"
            };
            break;
            case "react":
            gitModel = {
                gitUrl:"https://github.com/yuelinghunyu/mso-react-cli.git",
                branch:"master",
                description:"a react template created by jdj"
            };
            break;
            case "angular":
            gitModel = {
                gitUrl:"",
                branch:"master",
                description:"a angular template created by jdj"
            };
            case "normal":
            gitModel = {
                gitUrl:"https://github.com/yuelinghunyu/mso-nor-cli.git",
                branch:"master",
                description:"a normal(javascript/html/css) template created by jdj"
            };
            break;
            default:
            tip.fail("please input vue、react、angular or jquery one of them"),
            process.exit();
        }


        return new Promise((resolve,reject)=>{
            const config = Object.assign({tplName},gitModel);
            resolve(config)
        })
    }).then(resolve);
};

