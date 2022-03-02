<template>
  <v-app>
    <!-- 卡片 -->
    <div v-if="activeWidgets.length != 0">
      <grid-layout
        :layout.sync="layout"
        :col-num="3"
        :row-height="180"
        :is-draggable="true"
        :is-resizable="false"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
        style="width: 100%"
      >
        <grid-item
          v-for="(item, index) in activeWidgets"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i"
          @moved="movedEvent"
          :dragIgnoreFrom="'.drag-ignore'"
        >
          <v-card
            height="100%"
            @click.right="show($event, index)"
            :color="item.color"
            :img="item.img"
            style="border-radius: 10px"
          >
            <v-container class="d-flex justify-center align-center"
              ><component :is="item.i"></component></v-container
          ></v-card>
        </grid-item>
      </grid-layout>

      <!-- 卡片右键菜单 -->
      <v-menu
        v-model="cardMenu"
        :position-x="x"
        :position-y="y"
        absolute
        offset-y
      >
        <v-list>
          <v-list-item @click="cardStyleDialog = true">
            <v-list-item-title
              ><v-icon>mdi-brush</v-icon>编辑样式</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- 样式编辑 -->
      <v-dialog v-model="cardStyleDialog" max-width="390">
        <v-card>
          <v-card-title class="headline"
            >{{ activeWidgets[selectedCard].i }} 部件 背景样式编辑</v-card-title
          >

          <v-card-text>
            <v-container>
              <v-row>
                背景颜色
                <v-col class="d-flex justify-center">
                  <v-color-picker v-model="cardColor"></v-color-picker>
                </v-col>
                <v-col cols="12" md="4">
                  <v-sheet dark class="pa-4">
                    <pre>{{ cardColor }}</pre>
                  </v-sheet>
                </v-col>
                <v-text-field
                  v-model="cardImg"
                  label="
              背景图片,支持网络地址"
                ></v-text-field>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="saveStyle"> 关闭 </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <!-- 设置页面及按钮 -->
    <div class="float-setting">
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn fab dark small color="primary" v-bind="attrs" v-on="on"
              ><v-icon> mdi-cog </v-icon></v-btn
            >
          </template>
          <v-card outlined>
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>设置</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark text @click="reload"> 应用并刷新 </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <settings />
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import axios from "axios";
import Settings from "./components/Settings.vue";
export default {
  name: "App",

  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    Settings,
  },

  data: () => ({
    dialog: false,
    layout: [],
    cardMenu: false,
    x: 0,
    y: 0,
    selectedCard: 0,
    cardStyleDialog: false,
    cardColor: "",
    cardImg: "",
    //
  }),
  mounted() {
    // debugger
    var t = window.devicePixelRatio; //
    document.body.style.zoom = 1 / t; //
    // var zoom = 1 / t;
    var height = document.getElementById("app").clientHeight;
    document.getElementById("app").style.height =
      (height * t).toString() + "px";
    var layout = JSON.parse(localStorage.getItem("layout"));
    axios.get("data/layout.json").then((res) => {
      this.layout = layout == null ? res.data : layout;
      // this.layout = res.data;
    });
  },
  created() {
    var layout = JSON.parse(localStorage.getItem("layout"));
    console.log(layout);
  },
  methods: {
    movedEvent: function (i, newX, newY) {
      console.log(this.activeWidgets);
      localStorage.setItem("layout", JSON.stringify(this.activeWidgets));
      console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    reload() {
      window.location.reload();
    },
    show(e, item) {
      e.preventDefault();
      this.selectedCard = item;
      this.cardMenu = false;
      this.x = e.clientX;
      this.y = e.clientY + document.getElementById("app").scrollTop;
      this.$nextTick(() => {
        this.cardMenu = true;

        this.cardColor = this.activeWidgets[item].color;
        this.cardImg = this.activeWidgets[item].img;
      });
    },
    saveStyle() {
      this.layout.forEach((item, index) => {
        if (item.i == this.activeWidgets[this.selectedCard].i) {
          // alert(index)
          this.layout[index].color = this.cardColor;
          this.layout[index].img = this.cardImg;
        }
      });

      localStorage.setItem("layout", JSON.stringify(this.activeWidgets));
      this.cardStyleDialog = false;
      this.cardColor = "";
      this.cardImg = "";

      // this.activeWidgets[this.selectedCard].color=this.cardColor;
      // this.activeWidgets[this.selectedCard].img=this.cardImg;
    },
  },
  computed: {
    activeWidgets: function () {
      return this.layout.filter(function (layout) {
        return layout.enable;
      });
    },
  },
};
</script>

<style>
.float-setting {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
html {
  border-radius: 10px;
}
#app {
  background-color: rgba(255, 255, 255, 0.178);
  overflow-x: hidden;
  margin: 5px;
  border-radius: 10px;
  overflow-y: auto;
  height: 99vh;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 5%), 0 2px 4px 1px rgb(0 0 0 / 9%);
}

*::-webkit-scrollbar {
  width: 5px;
  background-color: rgba(138, 138, 138, 0.096);
}
*::-webkit-scrollbar-thumb {
  background-color: rgba(32, 32, 32, 0.075);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.164);
}
/* *::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.842);
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
} */

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
</style>