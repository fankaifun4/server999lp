'use strict';
const egg = require('egg');
const Controller = egg.Controller;

class ArticleCtrl extends Controller {
  async list() {
    const ctx = this.ctx;
    const lists = await ctx.service.article.list();
    if (lists.length) {
      ctx.body = { info: lists };
    } else {
      ctx.body = { info: null };
    }

  }

  async detail() {
    	const ctx = this.ctx;
    	const mysql = ctx.app.mysql;
    	const id = ctx.request.body.id;
    	const _type = ctx.request.body._type;
    	const result = await mysql.get('article', {
    		id,
    	});
    	if (result) {
    		ctx.body = {
    			info: result,
    		};
    	} else {
    		ctx.body = {
    			info: null,
    		};
    	}
  }
}

module.exports = ArticleCtrl;

