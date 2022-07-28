import Vue from 'vue'
import vueResource from 'vue-resource'
Vue.use(vueResource);
Vue.http.options.emulateJSON = true;

export default {
  install(Vue)  {
    var url='http://192.168.4.145:8001/';
    Vue.prototype.HttpPost=function(action,postjson,callback){
      postjson.LoginUserID = localStorage.UserID;
      postjson.LoginToken = localStorage.LoginToken;
      this.$http
        .post(url+action,postjson)
        .then(data => {
          callback&&callback(data)
        });
    }

    Vue.prototype.HttpGet=function(action,callback){
      this.$http.get(url+action).then((data)=>{
        callback&&callback(data);
      })
    }

    Vue.prototype.NewFilter=function (name,filter,value){
      return {name:name,filter:filter,value:value};
    }
    //成功返回值
    Vue.prototype.Success = 100;
    //是否登录

    Vue.prototype.IsLogin = localStorage.IsLogin;
    Vue.prototype.UserID = localStorage.UserID;
    Vue.prototype.LoginToken = localStorage.LoginToken;
    
    Vue.prototype.resetLogin = function(){
      this.UserID = localStorage.UserID;
      this.IsLogin = localStorage.IsLogin;
      this.LoginToken = localStorage.LoginToken;
    }

    Vue.prototype.valiIsNull = function(value) {
      if (value == null || value == "") {
        return true;
      } else {
        return false;
      }
    }
  }

}