<template>
  <div class="header">
    <div class="nav">
      <ul>
        <template v-if="LoginState">
          <li>
            <router-link to="/Daily">Daily</router-link>
          </li>
          <li>
            <router-link to="/Project">Project</router-link>
          </li>
          <li>
            <router-link to="/Month">Statistics</router-link>
          </li>
        </template>
        <template v-else>
          <li>
            <router-link to="/Login">Login</router-link>
          </li>
          <li>
            <router-link to="/Register">Register</router-link>
          </li>
        </template>
      </ul>
    </div>
    <!-- <div class="user" v-if="LoginState">
      <ul>
        <li>
          <span v-on:click="loginOut">退出</span>
        </li>
      </ul>
    </div> -->
  </div>
</template>
<script>
export default {
  data: function() {
    var LoginState = localStorage.IsLogin;
    return {
      LoginState
    };
  },
  methods: {
    loginOut: function() {
      localStorage.clear();
      location.href='/'
    }
  }
};
</script>