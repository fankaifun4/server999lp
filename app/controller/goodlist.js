'use strict';
const egg=require('egg')
const Controller = egg.Controller;
const crypt =  require('../service/crypt_class') 
const formatData = require('../until/index')

class GoodListController extends  Controller{
    async index(){
        const ctx = this.ctx;
        let lists =  await ctx.service.getGoodList.getGoodList();
        if(lists.length){
            ctx.body= { info: lists }
        }else{
            ctx.body= { info: null }
        }
        
    }

    async community(){
    	const ctx = this.ctx;
    	let page = ctx.request.body.page
    	try{
    		let lists =  await ctx.service.getGoodList.getAllGoodList(page);
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
        const userId = ctx.userId
        const mysql=this.app.mysql
        let data = await mysql.query(`select t.*,p.guest from information t LEFT JOIN zantable p
         on t.id = p.articid and p.guest = ? where t.id = ?`,[userId,_id])

        data.forEach(item=>{
            item['isSupport'] = item.guest ===  userId ? true :false
        })   

        if( data.length ){
            data = data[0]
        }

        data = formatData.format_data_obj( data )

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
    
    async addZan(){
        let resSuccess =  this.config.resSuccess
        let resError = this.config.resError
        let resTimeout = this.config.resTimeout     
        const ctx=this.ctx
        const id = ctx.request.body.id
        const master = ctx.request.body.master
        const mysql = this.app.mysql
        let userId = ctx.userId
        
        let getZan = await mysql.get('zantable',{
            guest:userId,
            articid:id
        })

        if( getZan ) {
            ctx.body ={
                ...resSuccess
            }
            return
        }  
        
        try{
            let result = await mysql.query('update information set zan = (zan + ?) where id = ?',[1,id])

            let addSuccess = result.affectedRows

            if( addSuccess ){

                let addClum = await mysql.insert('zantable',{
                    guest:userId,
                    master:master,
                    articid:id
                })
              
                let sqlSucc = addClum.affectedRows

                if( sqlSucc ){
                    ctx.body = {
                        ...resSuccess
                    }
                }else{
                    ctx.body = {
                       ...resError     
                    }
                }

            }else{
                ctx.body = {
                   ...resError     
                }
            }
        }catch(e){
            console.log(e)
            throw e
        }
    }
}

module.exports = GoodListController