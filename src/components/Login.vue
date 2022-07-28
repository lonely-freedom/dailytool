<template>
  <div class="login" @keydown.enter="loginUser">
    <div>
      <ul>
        <li>账 号：</li>
        <li>
          <input type="text" ref="UserID" maxlength="16" />
        </li>
      </ul>
      <ul>
        <li>密 码：</li>
        <li>
          <input type="password" ref="userPwd" maxlength="16" />
        </li>
      </ul>
      <ul>
        <li>
          <input type="button" value="登录" v-on:click="loginUser" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  title:"login",
  methods:{
    loginUser:function(){
      var _this = this;
      var UserID = _this.$refs.UserID.value;
      var userPwd = _this.$refs.userPwd.value;
      if(_this.valiIsNull(UserID)){
        alert('请输入账号');return;
      }
      if(_this.valiIsNull(userPwd)){
        alert('请输入密码');return;
      }
      var postData={};
      postData["UserID"] = UserID;
      postData["UserPwd"] = userPwd;
      _this.HttpPost("/api/tool/user/center/login",postData,function(redata){
        if(redata.body.flag==_this.Success){
          localStorage.UserID = redata.body.data.UserID;
          localStorage.LoginToken = redata.body.data.LoginToken;
          localStorage.IsLogin = true;
          location.href="/";
        }else{
          alert(redata.body.msg);
        }
      });
    }
  }
}
</script>

<style scoped>
.register {
  margin: 50px;
}
input {
  line-height: 25px;
  padding: 5px;
}
ul {
  margin: 0 auto;
  padding: 10px;
}
li {
  display: inline-block;
  height: 35px;
  line-height: 35px;
  margin: 0 3px;
}
input[type="button"] {
  background: #009143;
  border: 1px solid #009143;
  color: #fff;
  border-radius: 5px;
  padding: 5px 30px;
  margin:0 70px;
}
</style>