const path =  require('path')
const Service = require('egg').Service

const Base64 = require('js-base64').Base64

class UploadService extends Service{
    async res(object,isOk){
        if( isOk ){
            return {
                status:200,
                msg:  'success',
            };
        }else{
            return {
                status:422,
                msg:  'error',
                warning:object
            };
        }
    }
    async setImageName(stream){
        let time = (new Date().getTime()).toString(16);
        let fileName = time + stream.filename.split('.')[0].toLowerCase();
        let imageName = Base64.encode( encodeURIComponent( fileName ) );
        const articURI='/public/static/article/';
        const filename =( imageName + path.extname(stream.filename)).toLowerCase();
        const target = path.join(this.config.baseDir, articURI, filename);
        return {
            target,
            filename
        }
    }
}

module.exports = UploadService