<template>
  <div id="home">
    <template v-if="LoginState">
      <Daily />
    </template>
    <template v-else>
      <Login />
    </template>
  </div>
</template>
<script>
import Daily from "./Daily/Nav/Daily";
import Login from "./Login";
export default {
  components: {
    Daily: Daily,
    Login: Login
  },
  data: function() {
    var LoginState = localStorage.IsLogin;
    return {
      LoginState
    };
  }
};
</script>>