const moment = require('moment')

function format_data_list(list){

    list.map(item=>{
        for(let key  in item){
            if( key === 'imgs' ){
                item[key] = item[key]?item[key].split(';'):[]
            }
            if( key === 'createtime' ){
                item[key]=  moment(item[key],'YYYY-MM-DD HH:mm:ss').format('YY-MM-DD HH:mm');
            }
            if( key === 'updatetime' ){
                item[key]=  moment(item[key],'YYYY-MM-DD HH:mm:ss').format('YY-MM-DD HH:mm');
            }
        }
    })
    return list
}


function format_data_obj(obj){

    for(let key  in obj){
        if( key === 'imgs' ){
            obj[key] = obj[key]?obj[key].split(';'):[]
        }
        if( key === 'createtime' ){
            obj[key]=  moment(obj[key],'YYYY-MM-DD HH:mm:ss').format('YY-MM-DD HH:mm');
        }
        if( key === 'updatetime' ){
            obj[key]=  moment(obj[key],'YYYY-MM-DD HH:mm:ss').format('YY-MM-DD HH:mm');
        }
    }

    return obj
}

module.exports={
	format_data_list,
	format_data_obj
}