'use strict';
const egg=require('egg')
const Controller = egg.Controller;

const formatData = require('../until/index')



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

    async getDetail(){
        const ctx = this.ctx;
        const reqboyd = ctx.request.body
        const _id = reqboyd._id
        const _type = reqboyd._type
        const mysql=this.app.mysql
        let data = await mysql.get('information',{
            id:_id,
            _type:_type
        })

        data = formatData.format_data_obj( data )

        console.log(data)

        if(data){
            ctx.body = {
                info:data
            } 
        }else{
            ctx.body = {
                info:null,
            } 
        }
        
    }
}

module.exports = GoodListController