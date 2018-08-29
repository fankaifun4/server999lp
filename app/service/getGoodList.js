const Service = require('egg').Service;
const moment = require('moment');
class GetGoodListService extends Service {
  async getGoodList() {
    const ctx = this.ctx;
    const mysql = ctx.app.mysql;
    const listData = await mysql.select('article', {
      order: [[ 'watch', 'desc' ]],
      offset: 0,
      limit: 5,
    });
    const datas = listData.map(item => {
      const obj = {};
      for (const key in item) {
        if (key === '_time') {
          const time = moment(item[key], 'YYYY-MM-DD HH:mm:ss').format('YY-MM-DD HH:mm');
          obj[key] = time;
        } else {
          obj[key] = item[key];
        }
      }
      return obj;
    });

    return datas;
  }

  async getAllGoodList(page = 1) {
    const pageSize = 5;
    const ctx = this.ctx;
    const mysql = ctx.app.mysql;
    const userId = ctx.userId;
    const osffset = (page - 1) * pageSize;
    const listData = await mysql.query(`select * from information ORDER BY createtime desc LIMIT ? OFFSET ?`, [  pageSize, osffset ]);

    // listData.forEach(item => {
    //   item.isSupport = item.guest === userId;
    // });
    this.formatIMG_TIME(listData);
    return listData;
  }

  formatIMG_TIME(list) {
    list.map(item => {
      for (const key in item) {
        if (key === 'imgs') {
          item[key] = item[key] ? item[key].split(';') : [];
        }
        if (key === 'createtime') {
          item[key] = moment(item[key], 'YYYY-MM-DD HH:mm:ss').format('MM/DD HH:mm');
        }
        if (key === 'updatetime') {
          item[key] = moment(item[key], 'YYYY-MM-DD HH:mm:ss').format('MM/DD HH:mm');
        }
      }
    });
  }

  openKey() {

  }
}

module.exports = GetGoodListService;
