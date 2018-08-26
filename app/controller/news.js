'use strict';
const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    const ctx = this.ctx;
    const page = ctx.request.body.page || 1;
    const newsList = await ctx.service.news.list(page);
    this.ctx.body = { info: newsList };
  }
  async detail() {
  	const ctx = this.ctx;
  	const mysql = ctx.app.mysql;
  	const id = ctx.request.body.id;
  	try {
  		const result = await mysql.get('news', {
  			id,
  		});
  		ctx.body = {
  			info: result,
  		};
  	} catch (e) {
  		ctx.body = e;
  	}
  }
}
module.exports = NewsController;
