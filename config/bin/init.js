'use strict'

const exec = require("child_process").exec;
const co = require("co");
const ora = require("ora");
const prompt = require("co-prompt");

const tip = require("../model/tip");
const tpls = require("../model/template");

const spinner = ora("It is being generated. Please wait later...");

const execRm = (err,projectName)=>{
    spinner.stop();
    if(err){
        console.log(err);
        tip.fail('please restart run again!');
        process.exit();
    }
    tip.succ('initialization completed');
    tip.info(`cd ${projectName} && npm install`);
    process.exit();
}

const downLoad = (err,projectName)=>{
    if(err){
        console.log(err);
        tip.fail("please restart run again!");
        process.exit();
    }
    //删除git文件;
    exec('cd ' + projectName + '&& rm -rf .git',(err,out)=>{
        execRm(err,projectName);
    })
}

const resolve = (result) => {
    const {tplName,url,branch,projectName} = result;
    //加载git命令;
    const cmdStr = `git clone ${url} ${projectName} && cd ${projectName} && git checkout ${branch}`;
    console.log(cmdStr);
    spinner.start();

    exec(cmdStr,(err) =>{
        downLoad(err,projectName);
    })
}

module.exports = () =>{
    co(function *(){
        //用户输入
        const tplName = yield prompt("template name:");
        const projectName = yield prompt("project name:");

        if(!tpls[tplName]){
          tip.fail(tplName + 'template is null');
          process.exit();
        }

        return new Promise((resolve,reject) =>{
            resolve({
                tplName,
                projectName,
                ...tpls[tplName],
            });
        });
    }).then(resolve)
}


