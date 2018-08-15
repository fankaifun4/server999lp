module.exports = app =>{
	return class User extends app.Service {
        async add() {
           // const data = this.ctx.params.data;
           // const result = await this.app.mysql.insert('users',{'data':data});
           // if(result.serverStatus == 2){
           //      return "success";
           // }else{
           //     return "fail";
           // }
        }
    }
}