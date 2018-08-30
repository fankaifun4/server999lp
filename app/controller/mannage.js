const egg = require('egg');
const Controller = egg.Controller;

class MannageCtrl extends Controller {
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

	  	let insertReq = {
	  		...req
	  	}

	  	let insert = await mysql.insert('uploadimgs',{
	  		...insertReq
	  	})

	  	ctx.body = {
	  		info:{
	  			code:'success'
	  		}
	  	};
	  }catch(err){
	  	ctx.status=500
	  	ctx.body=err
	  }
  	
  }
}

module.exports = MannageCtrl;