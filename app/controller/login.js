'use strict';
const Controller=require('egg').Controller;

class LoginController extends Controller {
  async index() { 
  	const ctx=this.ctx
  	const code=ctx.req.headers['wx-code']
  	const iv=ctx.req.headers['wx-iv']
  	const encryptedData=ctx.req.headers['wx-encryptedData']

    const appid = this.config.appId
    const secret= this.config.appSecret

    let  wxServer='https://api.weixin.qq.com/sns/jscode2session'

    let wxRes = await ctx.curl(wxServer,{
      method: 'GET',
      data:{
        appid,
        secret,
        js_code:code
      },
      dataType: 'json'
    })

    console.log( wxRes.data )
    // let result  = await this.service.login.getData(code,encryptedData,iv)
  	
    let resSuccess =  this.config.resSuccess
  	let resError = this.config.resError
    let resTimeout = this.config.resTimeout 



    // const result = wxRes.data
    // const openId = result.openid
    // const session_key = result.session_key

  	try{
  		this.ctx.body= {
  			info:{
          token:'asdasldkjaslkdaslkdjalkdjaslkdj'
  			},
  			...resSuccess
  		}
  	}catch (err){
      this.ctx.status = 401
  		this.ctx.body = {
  			...resError
  		}
  	}
  }

}

module.exports = LoginController;