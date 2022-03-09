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
            <!-- <v-alert prominent type="warning" dismissible outlined>
              <strong>
                请妥善保存导出的数据文件，避免Cookie等信息泄露！！</strong
              >
            </v-alert> -->
            <v-alert border="left" color="indigo" dark> 敬请期待 </v-alert>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-divider></v-divider>
          <v-container>
            <v-alert border="left" color="indigo" dark>
              敬请期待
            </v-alert></v-container
          >
        </v-tab-item>

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
            </v-container
          ></v-tab-item
        >

        <v-tab-item>
          <v-divider></v-divider>
          <v-card>
            <v-card-title>MyWidget</v-card-title>
            <v-card-subtitle
              >版本号{{ about.WidgetsVer }} by SwetyCore</v-card-subtitle
            >
            <v-card-actions>
              <a :href="about.projUrl" target="_blank"
                ><v-btn color="primary"
                  ><v-icon>mdi-github</v-icon>访问项目地址</v-btn
                ></a
              >
            </v-card-actions>
            <v-card-text>
              <strong>
                <h3><v-icon>mdi-xml</v-icon>代码引用/参考:</h3></strong
              >
              <h4 v-for="reference in codeReferences" :key="reference.href">
                <a :href="reference.href" target="_blank"
                  >>{{ reference.title }}</a
                >
              </h4>
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
        WidgetsVer: "2.0.0.3",
        projUrl: "https://github.com/SwetyCore/MyWidget",
      },
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
    var layout = JSON.parse(localStorage.getItem("layout"));
    axios.get("data/layout.json").then((res) => {
      this.layout = res.data;
      this.selected = layout == null ? res.data : layout;
      // this.layout = res.data;
    });
    axios.get("ver.json").then((res) => {
      this.about = res.data;
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
  },
  methods: {
    resetLayout() {
      localStorage.setItem("layout", null);

      // this.selected = [];
    },
    loadrespack() {
      axios.get("api/loadrespack").then().catch();
    },
  },
};
</script>

<style>
</style>