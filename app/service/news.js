const Service = require('egg').Service;

class NewsService extends Service {
  async list(page = 1) {
    const mysql = this.ctx.app.mysql;
    const result = await mysql.select('news', {
      columns: [ 'id', 'title', 'createdtime' ],
      orders: [[ 'id', 'DESC' ]],
      limit: 20,
      offset: (page - 1) * 20,
    });
    return result;
  }
}

module.exports = NewsService;
