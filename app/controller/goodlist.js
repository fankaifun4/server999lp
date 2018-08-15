'use strict';
const egg=require('egg')
const Controller = egg.Controller;

class GoodListController extends  Controller{
    async index(){
        const ctx = this.ctx;
        let lists =  await ctx.service.getGoodList.getGoodList();
        ctx.body= { info: lists }
    }
    async community(){
    	const ctx = this.ctx;
    	let pages = ctx.request.body.pages
    	try{
    		let lists =  await ctx.service.getGoodList.getAllGoodList(pages);
    		ctx.body= { info: lists }
    	}catch(e){
    		ctx.status = 403
    		ctx.body = e	
    	}
    	
    	
    	
    }

}

module.exports = GoodListController