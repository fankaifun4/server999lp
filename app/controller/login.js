'use strict';
const cryp =  require('../service/crypt_class') 

const Controller=require('egg').Controller;

class LoginController extends Controller {
  async index() { 
  	const ctx=this.ctx
  	const code=ctx.req.headers['wx-code']
  	const iv=ctx.req.headers['wx-iv']
  	const encryptedData=ctx.req.headers['wx-encry']
    const appid = this.config.appId
    const secret= this.config.appSecret

    let result  = await this.service.login.getData(code,encryptedData,iv)
  	
    let resSuccess =  this.config.resSuccess
  	let resError = this.config.resError
    let resTimeout = this.config.resTimeout 

    if ( result =='error' ){
      ctx.status = 403
      ctx.body = {
        ...resError
      }
      return
    }
    
    const openId = result.wxRes.openid
    const session_key = result.wxRes.session_key

    let token = openId+ '.' + session_key + '.' +((1000*60*60*72).toString())+'.'+result.id

    token = cryp.cipher( token , this.config.keys )

  	this.ctx.body= {
  		info:{
        token
  		},
  		...resSuccess
  	}
  
  }  
} 

module.exports = LoginController;