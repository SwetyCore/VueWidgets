<template>
  <div style="width: 100%; height: 100%" v-if="true">
    <div class="text-center">
      <v-menu :close-on-content-click="false" offset-x>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-on="on" v-bind="attrs" class="drag-ignore">
            <strong style="color: #363839">实时便笺</strong></v-btn
          >
        </template>

        <v-card max-width="300px" max-height="400px" v-if="!loading">
          <v-list dense>
            <v-list-item>
              <v-list-item-avatar>
                <v-img src="imgs/paimon.png" alt="旅行者" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  >{{ resinData[selected].Role.nickname }}
                </v-list-item-title>
                <v-list-item-subtitle
                  >{{ resinData[selected].Role.region_name }}
                  {{ resinData[selected].Role.level }}级
                  <small
                    >UID: {{ resinData[selected].Role.game_uid }}</small
                  ></v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>
          <v-list dense>
            <v-subheader>探索派遣</v-subheader>
            <v-list-item
              v-for="item in resinData[selected].Note.expeditions"
              :key="item.avatar_side_icon"
            >
              <v-list-item-avatar>
                <img :src="item.avatar_side_icon" alt="" />
              </v-list-item-avatar>
              <v-list-item-content>
                状态:{{ item.RemainedTimeFormatted }}
                <!-- <small>{{ item.remained_time }}</small> -->
              </v-list-item-content>
            </v-list-item>

            <v-subheader>尘歌壶</v-subheader>
            <v-list-item :two-line="true">
              <v-list-item-content>
                <v-progress-linear v-model="coinRate" height="35">
                  <strong
                    >宝钱：{{ resinData[selected].Note.current_home_coin }}/{{
                      resinData[selected].Note.max_home_coin
                    }}</strong
                  >

                  剩余{{
                    resinData[selected].Note.HomeCoinRecoveryTargetTimeFormatted
                  }}
                </v-progress-linear>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
      <v-btn small icon color="f1ebe5" @click="refresh"
        ><v-icon>mdi-refresh</v-icon></v-btn
      >
      <v-dialog transition="dialog-bottom-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="f1ebe5" v-bind="attrs" v-on="on" small icon
            ><v-icon>mdi-pen</v-icon></v-btn
          >
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar color="primary" dark>原神 实时便笺 设置</v-toolbar>
            <v-card-text>
              <v-container> </v-container>
              <v-col>
                <v-textarea
                  label="米游社Cookie*"
                  required
                  outlined
                  v-model="cookie"
                  :clearable="true"
                ></v-textarea>
              </v-col>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="
                  dialog.value = false;
                  setcfg();
                "
                >应用</v-btn
              >
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
    <!-- <div class="text-subtitle-2 text-right">UID:{{ uid }}</div> -->

    <v-list
      width="100%"
      dense
      v-if="!loading"
      style="background-color: transparent"
    >
      <v-list-item link @click="start" class="drag-ignore">
        <v-list-item-avatar>
          <img src="imgs/resin.png" alt="旅行者" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            >{{ resinData[selected].Note.current_resin }}/{{
              resinData[selected].Note.max_resin
            }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <small>{{
              resinData[selected].Note.ResinRecoveryTargetTimeFormatted
            }}</small></v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
      <v-list-item link class="drag-ignore">
        <v-list-item-avatar>
          <img src="imgs/dailyTask.png" alt="旅行者" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            >{{ resinData[selected].Note.finished_task_num }}/{{
              resinData[selected].Note.total_task_num
            }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <small>{{
              resinData[selected].Note.ExtraTaskRewardDescription
            }}</small></v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div v-else>
      <v-card-text> 未设置cookie或者cookie设置不正确！ </v-card-text>
      <v-card-actions
        ><v-btn text color="brown">如何获取cookie？</v-btn></v-card-actions
      >
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "LiveResin",
  data() {
    return {
      show: false,
      resinData: [],
      cookie: "",
      selected: 0,
      timer: null,
    };
  },
  methods: {
    setcookie() {
      var data = {
        cookie: this.cookie,
      };
      axios({
        url: "api/setResinCookie",
        method: "post",
        data: data,
      })
        .then()
        .catch();
    },
    setcfg() {
      this.show = false;
      var data = { cookie: this.cookie };
      localStorage.setItem("resin", JSON.stringify(data));
      this.setcookie();
    },
    cp() {
      // navigator.clipboard.writeText(uid)
    },
    refresh() {
      var _this = this;
      axios
        .get("api/getResin")
        .then((res) => {
          console.log(res.data);
          _this.resinData = res.data;
        })
        .catch();
    },
    runcmd(cmd) {
      axios.post("api/runcmd", { cmd: cmd }).then(() => {});
    },
    start() {
      this.runcmd("start scripts\\yuanshen.lnk");
    },
  },
  mounted() {
    var cfg = JSON.parse(localStorage.getItem("resin"));
    if (cfg == null) {
      this.uid = "未登录";
    } else {
      this.cookie = cfg.cookie;
    }
    this.setcookie();
    var _this = this;
    this.refresh();
    this.timer = setInterval(() => {
      _this.refresh();
    }, 1000 * 10);
  },
  computed: {
    coinRate() {
      if (this.loading) {
        return 0;
      }
      return (
        this.resinData[this.selected].Note.current_home_coin /
        this.resinData[this.selected].Note.max_home_coin
      );
    },
    loading() {
      return this.resinData.length == 0;
    },
  },
  unmounted() {
    clearInterval(this.timer);
  },
};
</script>
<style>
*{
  font-family: "hywh";
}
@font-face {
  font-family: "hywh";
  src: url("/fonts/YS.TTF") format("truetype");
}
</style>
