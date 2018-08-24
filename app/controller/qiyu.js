'use strict';
const egg=require('egg')
const Controller = egg.Controller;

class QiyuController extends Controller {
  async index() { 
  	const ctx=this.ctx
  	const qiyuRes =await ctx.service.qiyu.index()
  	ctx.body=qiyuRes
  }
  async detail(){
  	const ctx=this.ctx
  	const id = ctx.request.body.id
  	const _type = ctx.request.body._type

  	const qiyuRes =await ctx.service.qiyu.detail(id,_type)
  	ctx.body={
  		info:qiyuRes
  	}
  }
}

module.exports = QiyuController;
