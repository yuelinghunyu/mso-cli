#!/usr/bin/env node

'use strict';
const program = require("commander");
const packageInfo = require("../../package.json");

// 定义当前版本;
program
    .version(packageInfo.version);

// 初始化项目；
program
    .command('init') //ms init
    .description("init a project by ms")
    .alias('i') // simplify write
    .action(()=>{
        require("../bin/init")();
    });

//添加模板;
program
    .command('add') //ms add
    .description('new a template')
    .alias('a')
    .action(()=>{
        require("../bin/add")();
    });
//模板列表；
program
    .command('list') // fe list
    .description('查看模板列表')
    .alias('l') // 简写
    .action(() => {
      require('../bin/list')();
    });
//模板删除
program
    .command('delete') // fe delete
    .description('删除模板')
    .alias('d') // 简写
    .action(() => {
      require('../bin/delete')();
    });
program.parse(process.argv);

if(!program.args.length){
    program.help();
}
