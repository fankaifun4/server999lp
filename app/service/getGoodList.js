const Service = require('egg').Service
const moment = require('moment')
class GetGoodListService extends Service{
    async getGoodList(){
        const ctx = this.ctx;
        const mysql  = ctx.app.mysql
        let listData = await mysql.select('article',{
            order:[['watch','desc']],
            offset:0,
            limit:5
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
        const pageSize=5   
        const ctx = this.ctx;
        const mysql  = ctx.app.mysql
        const userId = ctx.userId
        const osffset = (page-1)*pageSize
        let listData = await mysql.query(`select t.*,p.guest from information t
         LEFT JOIN zantable p on t.id = p.articid and p.guest = ? ORDER BY createtime desc LIMIT ? OFFSET ?`,[userId,pageSize,osffset])

        listData.forEach(item=>{
            item['isSupport'] = item.guest ===  userId ? true :false
        })
        this.formatIMG_TIME(listData)
        return listData
    }

    formatIMG_TIME(list){
        list.map(item=>{
            for(let key  in item){
                if( key === 'imgs' ){
                    item[key] = item[key]?item[key].split(';'):[]
                }
                if( key === 'createtime' ){
                    item[key]=  moment(item[key],'YYYY-MM-DD HH:mm:ss').format('MM/DD HH:mm');
                }
                if( key === 'updatetime' ){
                    item[key]=  moment(item[key],'YYYY-MM-DD HH:mm:ss').format('MM/DD HH:mm');
                }
            }
        })
    }

    openKey(){

    }
}

module.exports = GetGoodListService