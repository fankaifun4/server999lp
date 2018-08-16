'use strict';
const egg=require('egg')
const Controller = egg.Controller;

class HomeController extends Controller {
  async index() { 
  	const ctx=this.ctx
  	// this.ctx.body = 'asdkljsdlkajsd'
  	await this.ctx.render('/index.html',{
  		title:"爱上看的辣椒水看到了"
  	})
  }
}

module.exports = HomeController;
