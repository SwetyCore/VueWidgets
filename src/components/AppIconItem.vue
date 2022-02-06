<template>
  <div class="appitem" @click="startapp">
    <img class="appicon" :src="publicPath + icon_src" />
    <p class="appname">{{ app_name.substr(0) }}</p>
  </div>
</template>

<script>
export default {
  name: "AppIconItem",
  props: ["icon_src", "app_name", "app_path"],
  methods: {
    startapp() {
      var data = {
        method: "startapp",
        path: this.app_path,
      };
      window.chrome.webview.postMessage(JSON.stringify(data));
    },
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
};
</script>

<style>
.appitem {
  width: calc(var(--icon-size) + var(--icon-gap-y));
  height: calc(var(--icon-size) + var(--icon-gap-x));
  cursor: pointer;
  border: 1px solid #00000000;
}
.appitem:hover {
  background-color: #ffffff47;
  border-radius: 5px;

  border: 1px solid #00000059;
}
.appicon {
  box-shadow: 0 0 5px #0000001a;
  border-radius: var(--icon-border-radius);
  width: var(--icon-size);
  margin: 5px;
}
.appicon:active {
  transform: scale(0.97);
  cursor: wait;
}
.appname {
  color: white;
  margin: 0px;
  font-size: small;
  overflow: hidden;
  white-space:nowrap;
  /* text-shadow: 1px 1px; */
  margin:5px;
}
</style>


