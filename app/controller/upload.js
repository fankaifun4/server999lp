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
                name: { type: 'string' },
                _type: { type: 'string' },
                _time: { type: 'datetime' },
                _type_name: { type: 'string' },
                content: { type: 'string' }
            });
            let res = await ctx.service.upload.res({},true)
            const sqlData = {
                ...ctx.request.body,
                img:imageFileName
            }
            const sqlResult = await ctx.app.mysql.insert('article',sqlData)
            const insertSuccess = sqlResult.affectedRows === 1;
            if( insertSuccess){
                ctx.body= res
            }else{
                ctx.body= {
                    msg:'未知错误'
                }
            }
            return
        } catch (err) {
            ctx.logger.warn(err.errors);
            let res = await ctx.service.upload.res(err.errors,false)
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
            msg:'上传成功',
            url:imageFileName
        };
    }
}

module.exports = UploadController