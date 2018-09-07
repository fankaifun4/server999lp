const egg = require('egg');
const Controller = egg.Controller;
const crypto = require('crypto');
const cryp =  require('../service/crypt_class') 
class MannageCtrl extends Controller {

  async admin(){
  	const ctx = this.ctx;
  	const mysql = ctx.app.mysql;
  	const req = ctx.request.body;
  	try{
  		ctx.validate({
  			username:{type:"string"},
  			pswd:{type:"string"}
  		})
  		let username = req.username
  		let passworld = req.pswd
  		let md5 = crypto.createHash('md5');
  		passworld = crypto.createHash('md5').update(passworld, 'utf8').digest("hex");
  		let getAdmin = await mysql.get('admin',{
  			username,
  			passworld
  		})
  		if(getAdmin){
  			ctx.session = {getAdmin};
  		 	ctx.rotateCsrfSecret();
  			ctx.body={
  				code:1,
  				info:"登陆成功"
  			}
  		}else{
  			ctx.body={
  				code:0,
  				info:"登录失败"
  			}
  		}

  	}catch(erre){
  		ctx.body=erre
  	}

  }

  async images() {
  	const ctx = this.ctx;
  	const mysql = ctx.app.mysql;
  	const req = ctx.request.body
  	try{
		ctx.validate({
	        url: { type: 'string' },
	        hash: { type: 'string' },
	        deleteurl: { type: 'string' },
	        storename: { type: 'string' }
	    });

	  	let insert = await mysql.insert('uploadimgs',{
	  		...req
	  	})

	  	ctx.body = {
	  		info:{
	  			code:'success'
	  		}
	  	}
  	}catch(err){
	  	ctx.status=500
	  	ctx.body=err
  	}
  }

  async addGonglue(){
  	const ctx = this.ctx;
  	const mysql = ctx.app.mysql;
  	const req = ctx.request.body;
  	try{
  		ctx.validate({
	        title: { type: 'string' },
	        nickname: { type: 'string' },
	        content: { type: 'string' },
	        imgs: { type: 'array' },
    	});
    	req.imgs= req.imgs.join(';')
  		let insert  =await mysql.insert('gonglue',{
  			...req
  		})
  		let insertSucc =insert.affectedRows	
  		if(insertSucc){
  			ctx.body={
  				code:1,
  				info:"操作成功"
  			}
  		}else{
  			ctx.body={
  				code:0,
  				info:"操作失败"
  			}
  		}
  	}catch(err){
		ctx.status=500
	  	ctx.body=err
  	}
  }

  async addQiyu(){
  	const ctx = this.ctx;
  	const mysql = ctx.app.mysql;
  	const req = ctx.request.body;
  	try{
  		ctx.validate({
	        title: { type: 'string' },
	        _type: { type: 'string' },
	        content: { type: 'string' }
    	});
    	let insert = await mysql.insert('qiyu',{
    		...req
    	})
    	let insertSucc =insert.affectedRows	
  		if(insertSucc){
  			ctx.body={
  				code:1,
  				info:"操作成功"
  			}
  		}else{
  			ctx.body={
  				code:0,
  				info:"操作失败"
  			}
  		}
  	}catch(e){
  		ctx.status=500
	  	ctx.body=err	
  	}
  }

  async addInformation(){
    const ctx = this.ctx;
  	const mysql = ctx.app.mysql;
  	const req = ctx.request.body;
  	try{
  		ctx.validate({
	        title: { type: 'string' },
	        nickname: { type: 'string' },
	        content: { type: 'string' },
	        imgs: { type: 'array' },
    	});
    	req.imgs= req.imgs.join(';')
  		let insert  =await mysql.insert('information',{
  			...req
  		})
  		let insertSucc =insert.affectedRows	
  		if(insertSucc){
  			ctx.body={
  				code:1,
  				info:"操作成功"
  			}
  		}else{
  			ctx.body={
  				code:0,
  				info:"操作失败"
  			}
  		}
  	}catch(err){
		ctx.status=500
	  	ctx.body=err
  	}
  }



  async addNews(){
  	const ctx = this.ctx;
  	const mysql = ctx.app.mysql;
  	const req = ctx.request.body;
  	try{
  		ctx.validate({
	        title: { type: 'string' },
	        createdtime:{type: 'string'},
	        content: { type: 'string' }
    	});
  		let insert  =await mysql.insert('news',{
  			...req,
  			name:req.title
  		})
  		let insertSucc =insert.affectedRows	
  		if(insertSucc){
  			ctx.body={
  				code:1,
  				info:"操作成功"
  			}
  		}else{
  			ctx.body={
  				code:0,
  				info:"操作失败"
  			}
  		}
  	}catch(err){
		ctx.status=500
	  	ctx.body=err
  	}
  }


  async addYjqyComm(){
    const ctx = this.ctx;
    const mysql = ctx.app.mysql;
    const req = ctx.request.body;
    try{
      ctx.validate({
          title: { type: 'string' },
          method: { type: 'string' },
          content: { type: 'string' },
          imgs: { type: 'array' },
      });
      req.imgs= req.imgs.join(';')
      let insert  =await mysql.insert('yjqy_community',{
        ...req
      })
      let insertSucc =insert.affectedRows 
      
      if(insertSucc){
        ctx.body={
          code:1,
          info:"操作成功"
        }
      }else{
        ctx.body={
          code:0,
          info:"操作失败"
        }
      }
    }catch(err){
      ctx.status=500
      console.log(err)
      ctx.body=err
    }
  }
}

module.exports = MannageCtrl