const Service = require('egg').Service
const crypt = require('../lib/WXBizDataCrypt')
const moment = require('moment')

class LoginService extends Service{
	async getData(js_code,encryptedData,iv){
		const ctx = this.ctx
		const appid  = this.config.appId
		const secret = this.config.appSecret
		const wxServer='https://api.weixin.qq.com/sns/jscode2session'
	  	let wxRes = await ctx.curl(wxServer,{
	  		method: 'GET',
	  		data:{
	  			appid,
	  			secret,
	  			js_code,
	  			grant_type:'authorization_code'
	  		},
	  		dataType: 'json'
	  	})


	  	const session_key = wxRes.data.session_key
	  	const open_id = wxRes.data.openid

	  	try{

		  	let cryptData = new crypt( appid,session_key )

		  	let userInfo  = cryptData.decryptData( encryptedData,iv )

		  	const mysql  =  this.app.mysql

		  	const user_info = JSON.stringify( userInfo )

		  	const create_time = userInfo.watermark.timeshamp

		  	const last_visit_time = new Date().getTime()
		  	
		  	let getId = await mysql.get('user',{
		  		open_id
		  	})

		  	let insertQuery
		  	
	  		if( getId.open_id ){
				insertQuery  = await mysql.update('user',{
			  		uuid:"",
			  		skey:'数据更新',
			  		last_visit_time:last_visit_time,
			  		session_key:session_key,
			  		user_info:user_info
			  	},{
			  		where:{
		  				open_id
			  		}
			  	})
		  	}else{
		  		insertQuery  = await mysql.insert('user',{
			  		open_id:open_id,
			  		uuid:"",
			  		skey:'fanfan',
			  		create_time:create_time,
			  		last_visit_time:last_visit_time,
			  		session_key:session_key,
			  		user_info:user_info
			  	})
		  	}
			return wxRes.data
		  }catch(e){
		  	return 'error'	
		  }
	  	
	  	
	}

}

module.exports = LoginService