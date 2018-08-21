const Table = require('cli-table');

const tip = require('./tip');

const table = new Table({
    head:['name','description'],
    style:{
        head:['cyan']
    }
});

module.exports = (config)=>{
    const keys = Object.keys(config);

    if(keys.length){
        keys.forEach((key)=>{
            table.push(
                [`${key}`,config[key].description]
            );
        });
        const list = table.toString();
        if(list){
            tip.info('template list is:');
            console.log(`${list}\n`);
        }else{
            tip.fail('template is null');
        }
    }else{
        tip.fail('template is null');
    }
};