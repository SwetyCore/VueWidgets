<template>
  <div id="app">
    <div class="widget-container">
      <widget-card
        :size="min"
        :cardbg="dd.bg"
        v-for="dd in deadlines"
        :key="dd"
        :bgcolor="dd.bgcolor"
      >
        <countdown
          :target="dd.target"
          :name="dd.name"
          :cl_title="dd.colors[0]"
          :cl_num="dd.colors[1]"
          :cl_target="dd.colors[2]"
        ></countdown>
      </widget-card>

      <widget-card :size="mid">
        <music-player></music-player>
      </widget-card>

      <widget-card :size="mid"><calendar></calendar></widget-card>
      <widget-card
        :size="min"
        :cardbg="'url(imgs/clockbg.png)'"
        :bgcolor="'rgb(0, 122, 204)'"
        ><clock></clock
      ></widget-card>

      <widget-card :size="max" :bgcolor="'#f5f8fd'"
        ><class-schedule></class-schedule
      ></widget-card>
      <widget-card :size="min" :bgcolor="'#f5f8fd'">
        <live-resin></live-resin>
      </widget-card>

      <widget-card :size="min" :bgcolor="'#f5f5f5'"
        ><power-control></power-control
      ></widget-card>
      <widget-card :size="max"><todo></todo></widget-card>

      <widget-card :size="'mid'"><weather></weather></widget-card>
    </div>

    <div class="version" style="" @click="Refresh">
      Develop version build 2701
    </div>
  </div>
</template>
<script>
// import AppIconItem from "./components/AppIconItem.vue";
import WidgetCard from "./components/WidgetCard.vue";
// 自定义组件

export default {
  publicPath: "./assets",
  name: "App",
  components: {
    // AppIconItem,
    WidgetCard,
    // calendar,
    // weather,Clock,countdown,
  },
  data: function () {
    return {
      min: "min",
      max: "max",
      mid: "mid",
      app_list: [],
      deadlines: [
        {
          name: "开学",
          target: "2022-2-18",
          colors: [],
        },
        {
          name: "春节",
          target: "2022-2-1",
          colors: ["gold", "gold", "gold"],
          bgcolor: "#CC081A",
        },
      ],
    };
  },
  methods: {
    Refresh: function () {
      window.location.reload();
    },
    Exit: function () {
      var data = {
        method: "exit",
      };
      window.chrome.webview.postMessage(JSON.stringify(data));
    },
  },
  mounted: function () {},
};
</script>

<style>
body::-webkit-scrollbar {
  width: 15px;
  height: 8px;
}
body::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.158);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.274);
}
body::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}

* {
  -moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin: 0px;
}
:root {
  --widget-margin: 15px;
  --icon-size: 56px;
  --icon-gap-x: 35px;
  --icon-gap-y: 35px;
  --icon-border-radius: 15px;
}

html {
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.096);
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1a2c3f;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  margin-left: 30px;
}
.version {
  position: fixed;
  color: white;
  right: 10px;
  bottom: 10px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.267);
}

.widget-container {
  width: 100%;
  /* height: 1080px; */
  grid-template-columns: repeat(
    auto-fill,
    calc(var(--icon-size) + var(--icon-gap-y))
  );
  grid-template-rows: repeat(
    auto-fill,
    calc(var(--icon-size) + var(--icon-gap-x))
  );
  grid-auto-flow: dense;
  box-sizing: border-box;
  justify-content: space-between;
  /* overflow-y: auto; */
  /* display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start; */
  display: grid;

  justify-content: right;
}
.formium-app-activated {
  /* animation: fadenum 0.4s; */
}
/* .formium-app-deactivate{
  display: none;
} */

@keyframes fadenum {
  0% {
    opacity: 0;
  }
}
</style>
<style lang="css">
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css");
</style>