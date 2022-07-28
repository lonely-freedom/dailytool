<template>
  <div class="register">
    <div>
      <ul>
        <li>编 号：</li>
        <li>
          <input type="text" ref="userID" maxlength="5" />
        </li>
      </ul>
      <ul>
        <li>账 号：</li>
        <li>
          <input type="text" ref="userName" maxlength="16" />
        </li>
      </ul>
      <ul>
        <li>密 码：</li>
        <li>
          <input type="text" ref="userPwd" maxlength="16" />
        </li>
      </ul>
      <ul>
        <li>秘 钥：</li>
        <li>
          <input type="text" ref="userSecretKey" />
        </li>
      </ul>
      <ul>
        <li>
          <input type="button" value="注册" v-on:click="registerUser" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  title: "register",
  methods:{
    registerUser:function(){
      var _this = this;
      var userID = _this.$refs.userID.value;
      var userName = _this.$refs.userName.value;
      var userPwd = _this.$refs.userPwd.value;
      var userSecretKey = _this.$refs.userSecretKey.value;
      if(_this.valiIsNull(userID)){
        alert('请输入用户编号');return;
      }
      if(isNaN(userID)){
        alert('主键格式错误');return;
      }
      if(_this.valiIsNull(userName)){
        alert('请输入账号');return;
      }
      if(_this.valiIsNull(userPwd)){
        alert('请输入密码');return;
      }
      if(_this.valiIsNull(userSecretKey)){
        alert('请输入秘钥');return;
      }
      if(isNaN(userSecretKey)){
        alert('秘钥格式错误');return;
      }
      var postData={};
      postData["UserId"] = userID;
      postData["UserName"] = userName;
      postData["UserPwd"] = userPwd;
      postData["AddUserId"] = userSecretKey;
      _this.HttpPost("/api/tool/user/center/add",postData,function(redata){
        if(redata.body.flag==_this.Success){
          localStorage.UserID = redata.body.data.UserID;
          localStorage.IsLogin = true;
          location.href="/"
        }else{
          alert(redata.body.msg);
        }
      });
    }
  }
};
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