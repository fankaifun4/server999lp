const Service = require('egg').Service;

class GonglueService extends Service {
  async index(page,pageSize) {
    const mysql = this.ctx.app.mysql;
    const result = await mysql.select('gonglue', {
      orders: [[ 'createtime', 'desc' ]],
		  	limit: pageSize,
      offset: (page - 1) * pageSize,
    });
	    return result;
  }
  async detail(id) {
    const mysql = this.ctx.app.mysql;
    const addWatch = await mysql.query('update gonglue  SET watch=watch+1 where id=?',[id])
    const result = await mysql.get('gonglue', {
      id,
    });
    return result;
  }
}

module.exports = GonglueService;
