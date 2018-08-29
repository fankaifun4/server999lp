'use strict';
const egg = require('egg');
const Controller = egg.Controller;
const formatData = require('../until/index');

class GonglueController extends Controller {
  async index() {
  	const ctx = this.ctx;
    const page = ctx.request.body.page;
    const pageSize = ctx.request.body.pageSize||20
    try {
      let gonglue = await ctx.service.gonglue.index(page,pageSize);
      gonglue = formatData.format_data_list(gonglue);
      ctx.body = {
        info: gonglue,
      };
    } catch (e) {
      ctx.status = 405;
      ctx.body = e;
    }
  }
  async detail() {
  	const ctx = this.ctx;
  	const id = ctx.request.body.id;
    try {
      let gonglue = await ctx.service.gonglue.detail(id);
      gonglue = formatData.format_data_obj(gonglue);
      ctx.body = {
        info: gonglue,
      };
    } catch (e) {
    	console.log(e);
      ctx.status = 405;
      ctx.body = e;
    }
  }
}

module.exports = GonglueController;
