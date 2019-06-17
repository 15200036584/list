<template>
  <div id="app">
    <keep-alive include="home" >
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import axios from "axios";
import request from "./utils/request";
export default {
  name: "App",
  created() {
    request.get("/api/user/info");
  }
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
