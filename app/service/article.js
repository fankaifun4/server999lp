const Service = require('egg').Service

class ArticleService extends Service{
	async list(){
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

}

module.exports = ArticleService