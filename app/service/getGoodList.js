const Service = require('egg').Service
const moment = require('moment')
class GetGoodListService extends Service{
    async getGoodList( ){
        const ctx = this.ctx;
        const mysql  = ctx.app.mysql
        let listData = await mysql.select('article',{
            where:{ weight:50 },
            columns:['userName','name','title','_type','weight','_id','img','synopsis','owner','up','look','_time'],
            order:[['weight','desc']],
            offset:0,
            limit:3
        })
        let datas= listData.map(item=>{
            let obj = {}
            for(let key in item){
                if( key === '_time' ){
                    let time = moment(item[key],'YYYY-MM-DD HH:mm:ss').format('YY-MM-DD HH:mm');
                    obj[key] = time
                }else{
                    obj[key] = item[key]
                }
            }
            return  obj
        })

        return datas
    }

    async getAllGoodList(page=1){
           
        const pageSize=10   
        const ctx = this.ctx;
        const mysql  = ctx.app.mysql
        const userId = ctx.userId
        
        let listData = await mysql.query('SELECT * FROM information order by updatetime desc')

        let getZan = await mysql.select('zantable',{
              where: { guest: userId }
        })

        console.log(getZan)
        this.formatIMG_TIME(listData)
        return listData
    }

    formatIMG_TIME(list){
        list.map(item=>{
            for(let key  in item){
                if( key === 'imgs' ){
                    item[key] = item[key]?item[key].split(','):[]
                }
                if( key === 'createtime' ){
                    let time = new Date( parseInt( item[key] )*1000)
                    item[key]=  moment(time,'YYYY-MM-DD HH:mm:ss').format('YY年MM月DD HH:mm');
                }
                if( key === 'updatetime' ){
                    let time =new Date( parseInt( item[key] )*1000)
                    item[key]=  moment(time,'YYYY-MM-DD HH:mm:ss').format('YY年MM月DD HH:mm');
                }
            }
        })
    }

    openKey(){

    }
}

module.exports = GetGoodListService