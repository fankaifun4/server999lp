// app/controller/news.js
const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    let user =  await ctx.app.mysql.get('users',{id:1})
    const newsList = await ctx.service.newsa.list(page);
    this.ctx.body = { info: newsList }
  }
}

module.exports = NewsController;