<template>
  <div id="app">
    <app-header />
    <div class="clear"></div>
    <div>
      <router-view />
    </div>
  </div>
</template>
<script>
import Header from "./components/Header";
export default {
  components: {
    "app-header": Header
  }
};
</script>>
