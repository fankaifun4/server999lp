'use strict';
const path =  require('path')
const fs =  require('fs')
const egg=require('egg')
const pump = require('mz-modules/pump');
const Controller = egg.Controller;

let imageFileName = ''

class UploadController extends  Controller{
    async index(){
        const ctx = this.ctx;
        const mysql = ctx.app.mysql
        try {
            ctx.validate({
                title: { type: 'string' },
                nickname: { type: 'string' },
                imgs: { type: 'string' },
                content: { type: 'string' }
            });
            const req={
            	...ctx.request.body
            }

            const querySelect = await mysql.get('gonglue',{
            	imgs: req.imgs,
                content: req.content
            })

            if( querySelect ){
            	const uploadGonglue = await mysql.update('gonglue',{
					...ctx.request.body
            	})
            	
            	const uploadSuccess = uploadGonglue.affectedRows === 1;
				if( uploadSuccess ){
            	 	ctx.body = {
            	 		code:"success",
						info:"修改成功"
					}   
            	 }else{
            	 	ctx.body = {
            	 		code:"error",
						info:"修改失败"
					} 
            	 }

            }else{
            	const insertGonglue = await mysql.insert('gonglue',{
            		...ctx.request.body
            	})
            	 const insertSuccess = insertGonglue.affectedRows === 1;
            	 if( insertSuccess ){
            	 	ctx.body = {
            	 		code:"success",
						info:"上传成功"
					}   
            	 }else{
            	 	ctx.body = {
            	 		code:"error",
						info:"上传失败"
					} 
            	 }
            }

			        
        } catch (err) {
            ctx.body = err;
            return;
        }

    }
    async image(){
        const articURI='/public/static/article/';
        const stream = await this.ctx.getFileStream();
        const stramName = await this.ctx.service.upload.setImageName(stream)
        const writeStream = fs.createWriteStream(stramName.target);
        await pump(stream, writeStream);
        imageFileName = articURI+stramName.filename
        this.ctx.body = {
            status:200,
            msg:'上传成功',
            url:imageFileName
        };
    }
}

module.exports = UploadController