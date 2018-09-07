'use strict';
const egg = require('egg');
const Controller = egg.Controller;
const moment = require('moment');
const Pics = require('../radisJson/pics.json')

class yjqyController extends Controller {
  async getpics() {
  	const ctx= this.ctx;
  	const page = ctx.request.body.page||1;
  	const pageSize = ctx.request.body.pageSize||6;
  	const offset = pageSize*(page-1)>Pics.length?Pics.length:pageSize*(page-1);
  	const end = offset>Pics.length?Pics.length:offset+pageSize;
  	let info = Pics.slice(offset,end);
  	ctx.body={
  		info
  	}
  }

  async coffeeHouse(){
  	const ctx= this.ctx;
  	const mysql = ctx.app.mysql;
  	const pageSize = ctx.request.body.pageSize;
  	const page = ctx.request.body.page;
    const osffset = (page - 1) * pageSize;

    let listData =  await mysql.select('yjqy_community',{
    	columns: ['id','method','title', 'imgs','createdtime','watch'],
    	orders:[['createdtime','desc']],
    	limit: pageSize, 
		offset: osffset, 
    })
    this.formatIMG_TIME(listData);
  	ctx.body={
  		info:listData
  	}
  }

  async coffeeThing(){
  	const ctx= this.ctx;
  	const mysql = ctx.app.mysql
  	const id = ctx.request.body.id;
  	try {
      const addWatch = await mysql.query('update yjqy_community  SET watch=watch+1 where id=?',[id])
  		const result = await mysql.get('yjqy_community', {
  			id,
  		});
  		ctx.body = {
  			info: result,
  		};
  	} catch (e) {
  		ctx.body = e;
  	}
  }
  formatIMG_TIME(list) {
    list.map(item => {
      for (const key in item) {
        if (key === 'imgs') {
          item[key] = item[key] ? item[key].split(';') : [];
        }
        if (key === 'createdtime') {
          item[key] = moment(item[key], 'YYYY-MM-DD HH:mm:ss').format('MM/DD HH:mm');
        }
      }
    });
  }
}

module.exports = yjqyController;
