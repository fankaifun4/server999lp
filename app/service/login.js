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
	  	const openid = wxRes.data.openid

	  	let cryptData = new crypt( appid,session_key )
	  	let userInfo  = cryptData.decryptData( encryptedData,iv )
	  	console.log( userInfo )
	  	return wxRes.data
	}

}

module.exports = LoginService