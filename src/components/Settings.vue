<template>
  <div>
    <v-list three-line subheader>
      <v-tabs show-arrows>
        <v-tabs-slider color="primary"></v-tabs-slider>

        <v-tab>基本</v-tab>
        <v-tab>备份/恢复</v-tab>
        <v-tab>个性化</v-tab>
        <v-tab>开发者选项</v-tab>
        <v-tab>关于</v-tab>

        <v-tab-item>
          <v-divider></v-divider>
          <v-container>
            <v-card flat>
              <v-alert prominent type="warning" dismissible outlined>
                <strong>
                  请只使用信任的部件，不安全的部件可能会造成您的Cookie等信息泄露！！</strong
                >
              </v-alert>
              <v-card-title
                >小部件管理
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-card-subtitle>所有更改在刷新后生效</v-card-subtitle>
              <v-data-table
                :headers="headers"
                :items="layout"
                :search="search"
                item-key="i"
                v-model="selected"
                :single-select="false"
                show-select
                mobile-breakpoint="10"
              >
              </v-data-table>
              <v-card-actions>
                <v-spacer></v-spacer
                ><v-btn color="primary" @click="resetLayout">重置布局</v-btn>
              </v-card-actions>
            </v-card>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-divider></v-divider>
          <v-container>
            <v-alert prominent type="warning" dismissible outlined>
              <strong>
                请妥善保存导出的数据文件，避免Cookie等信息泄露！！</strong
              >
            </v-alert>
            <v-alert border="left" color="indigo" dark>
              实验性功能,请谨慎使用!
            </v-alert>
            <v-card-actions>
              <v-btn blue dark @click="exportTodo">导出待办</v-btn>
              <v-spacer></v-spacer>
              <v-btn blue dark @click="loadTodo">导入待办</v-btn>
            </v-card-actions>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-divider></v-divider>
          <v-container>
            <v-alert border="left" color="indigo" dark>
              实验性功能,可能会出现显示bug,请谨慎使用!
            </v-alert>
            <v-col>
              <p>自定义字体:覆盖font.ttf</p>
              <v-btn color="blue" dark @click="openFontFolder"
                >打开字体文件夹</v-btn
              ></v-col
            >
            <v-col>
              <p>启用模糊背景</p>
              <v-switch v-model="WindowBlur"></v-switch>
            </v-col>
          </v-container>
        </v-tab-item>

        <!-- 开发者 -->
        <v-tab-item>
          <v-divider></v-divider>
          <v-container
            ><v-alert type="red" icon="mdi-bug">
              <v-row>
                <v-col> 如果你不知该选项的作用，请不要动它。 </v-col>
                <v-switch v-model="debug" dark></v-switch>
              </v-row>
            </v-alert>
            <v-text-field
              label="使用网址 "
              prepend-icon="mdi-network"
              outlined
              v-model="debugUrl"
              hint="如:http://localhost:8080"
            ></v-text-field>
            <!-- <v-card-actions>
              <v-spacer />
              <v-btn color="primary" @click="loadrespack"
                ><v-icon>mdi-package</v-icon>加载资源包</v-btn>
              ></v-card-actions -->
          </v-container></v-tab-item
        >

        <!-- 关于 -->
        <v-tab-item>
          <v-divider></v-divider>
          <v-card>
            <v-card-title>MyWidget</v-card-title>
            <v-card-subtitle
              >版本号 {{ about.WidgetsVer }}(view) {{ about.apiVer }}(api) by
              SwetyCore</v-card-subtitle
            >
            <v-card-actions>
              <a :href="about.projUrl" target="_blank"
                ><v-btn color="primary"
                  ><v-icon>mdi-github</v-icon>访问项目地址</v-btn
                ></a
              >
            </v-card-actions>
            <v-card-text>
              <v-container>
                <div style="white-space: pre-wrap">
                  {{ about.description }}
                </div></v-container
              >
              <v-divider></v-divider>
              <v-container
                ><strong>
                  <h3><v-icon>mdi-xml</v-icon>代码引用/参考:</h3></strong
                >
                <h4 v-for="reference in codeReferences" :key="reference.href">
                  <a :href="reference.href" target="_blank"
                    >>{{ reference.title }}</a
                  >
                </h4></v-container
              >
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
      <v-divider></v-divider>
    </v-list>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "settings",
  data() {
    return {
      about: {
        WidgetsVer: "",
        projUrl: "https://github.com/SwetyCore/MyWidget",
        description: "",
      },
      WindowBlur: undefined,
      debug: false,
      debugUrl: "http://localhost:8080",
      search: "",
      headers: [
        { text: "部件名称", value: "i" },
        { text: "宽度", value: "w" },
        { text: "高度", value: "h" },
        { text: "x", value: "x" },
        { text: "y", value: "y" },
      ],
      layout: [],
      selected: [],
      codeReferences: [
        {
          title: "ZYFDroid/EPUBiumDesktop",
          href: "https://github.com/ZYFDroid/EPUBiumDesktop",
        },
        {
          title: "DGP-Studio/DGP.Genshin.MiHoYoAPI",
          href: "https://github.com/DGP-Studio/DGP.Genshin.MiHoYoAPI",
        },
        {
          title: "DGP-Studio/DGP.Genshin.GamebarWidget",
          href: "https://github.com/DGP-Studio/DGP.Genshin.GamebarWidget",
        },
        {
          title: "6tail/lunar-javascript",
          href: "https://gitee.com/6tail/lunar-javascript",
        },
      ],
    };
  },
  mounted() {
    apiHost.EnableBlur().then((res) => {
      this.WindowBlur = JSON.parse(res).data;
    });
    var layout = JSON.parse(localStorage.getItem("layout"));
    axios.get("data/layout.json").then((res) => {
      this.layout = res.data;
      this.selected = layout == null ? res.data : layout;
      // this.layout = res.data;
    });
    axios.get("ver.json").then((res) => {
      apiHost.apiver.then((response) => {
        res.data.apiVer = response;
        this.about = res.data;
      });
    });

    axios
      .get("api/debug")
      .then((res) => {
        this.debug = res.data.debug;
      })
      .catch();
  },
  watch: {
    selected() {
      console.log(this.selected);
      if (this.selected != []) {
        localStorage.setItem("layout", JSON.stringify(this.selected));
      }
    },
    debug: function () {
      var data = {
        debug: this.debug,
        url: this.debugUrl,
      };
      axios.post("api/debug", data).then().catch();
    },
    WindowBlur() {
      if (this.WindowBlur != undefined) {
        apiHost.EnableBlur(this.WindowBlur, true);
      }
    },
  },
  methods: {
    saveJSON(data, filename) {
      if (!data) {
        alert("保存的数据为空");
        return;
      }
      if (!filename) filename = "json.json";
      if (typeof data === "object") {
        data = JSON.stringify(data, undefined, 4);
      }
      var blob = new Blob([data], { type: "text/json" }),
        e = document.createEvent("MouseEvents"),
        a = document.createElement("a");
      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
      e.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
    },
    exportTodo() {
      this.saveJSON(localStorage.getItem("todo"), "todo.json");
    },
    loadTodo() {
      var t = prompt("请粘贴导出的todo", "");
      if (t != "") {
        localStorage.setItem("todo", t);
      }
    },
    resetLayout() {
      localStorage.setItem("layout", null);
    },
    loadrespack() {
      axios.get("api/loadrespack").then().catch();
    },
    openFontFolder() {
      apiHost.runcmd("explorer.exe WebRoot\\fonts").then().catch();
    },
  },
};
</script>

<style>
</style>