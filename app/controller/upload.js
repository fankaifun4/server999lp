'use strict';
const path =  require('path')
const fs =  require('fs')
const egg=require('egg')
const pump = require('mz-modules/pump');
const Controller = egg.Controller;

let imageFileName = ''

class UploadController extends  Controller{
    async article(){
        const ctx = this.ctx;
        try {
            ctx.validate({
                title: { type: 'string' },
                _type: { type: 'string' },
                content: { type: 'string' }
            });
            let res = await ctx.service.upload.res({},true)

            const sqlData = {
                ...ctx.request.body
            }

            const isUpdate = await ctx.app.mysql.get('qiyu',{
                title:sqlData.title
            })
            
            if(isUpdate){
                const uploadQiyu =  await ctx.app.mysql.update('qiyu',{
                    id:isUpdate.id,
                    _type:sqlData._type ,
                    content: sqlData.content
                })
                const uploadQiyuSuccess = uploadQiyu.affectedRows === 1;

                if( uploadQiyuSuccess ){
                     ctx.body= res
                 }else{
                    ctx.body= {
                        status: 400,
                        msg:'未知错误'
                    }
                 }
            }else{
               
                const sqlResult = await ctx.app.mysql.insert('qiyu',sqlData)
                const insertSuccess = sqlResult.affectedRows === 1;
               
                if( insertSuccess){
                    ctx.body= res
                }else{
                    ctx.body= {
                        status: 400,
                        msg:'未知错误'
                    }
                }
            }
            return
        } catch (err) {
            let res = await ctx.service.upload.res(err,false)
            ctx.body = res;
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