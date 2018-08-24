const Service = require('egg').Service

class QiyuService extends Service{
	async index(){
		const mysql  = this.ctx.app.mysql

		let result  = await mysql.select('qiyu')

		let qiyu={
			xj:[],
			zj:[],
			dj:[]
		}

		if( result.length>1){
			result.forEach(item=>{
				if(item._type === 1){
					qiyu.xj.push(item)
				}
				if(item._type === 2){
					qiyu.zj.push(item)
				}
				if(item._type === 3){
					qiyu.dj.push(item)
				}
			})
		}

	    return qiyu;
	}
	async detail(id,_type){
		const mysql  = this.ctx.app.mysql
		let result  = await mysql.get('qiyu',{
			id,
			_type
		})

		console.log(result)

		return result
	}
}

module.exports = QiyuService