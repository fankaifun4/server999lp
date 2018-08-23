'use strict';
const egg=require('egg')
const Controller = egg.Controller;

class QiyuController extends Controller {
  async index() { 
  	const ctx=this.ctx
  	const qiyuRes =await ctx.service.qiyu.index()
  	console.log(qiyuRes)
  	ctx.body=qiyuRes
  }
}

module.exports = QiyuController;
