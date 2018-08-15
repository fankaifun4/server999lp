'use strict';
const egg=require('egg')
const Controller = egg.Controller;

class HomeController extends Controller {
  async index() { 
  	const ctx=this.ctx
  	this.ctx.body = 'asdkljsdlkajsd'
  }
}

module.exports = HomeController;
