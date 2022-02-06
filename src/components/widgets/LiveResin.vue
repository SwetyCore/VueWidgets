<template>
  <div>
    <div>
      <!-- <div class="cardtitle">实时便笺</div> -->
      <div style="display: flex; justify-content: space-between">
        <div class="cardtitle">实时便笺</div>
        <div style="font-size: 20px; cursor: pointer; display: flex">
          <div class="iconbtn" @click="show = true" title="">
            <i class="mdi mdi-pencil-outline"></i>
          </div>
          <div class="iconbtn" @click="refresh" title="">
            <i class="mdi mdi-refresh"></i>
          </div>
        </div>
      </div>
      <div
        style="display: flex"
        class="resin-item"
        v-for="resin in resinData"
        :key="resin"
        @click="start"
      >
        <img :src="resin.icon" width="32px" height="32px" />
        <div style="margin-left: 5px; text-align: center; width: 100%">
          <div class="resin-title">{{ resin.title }}</div>
          <div class="resin-tip">{{ resin.tip }}</div>
        </div>
      </div>

      <div class="resin-uid" @click="cp(uid)">UID:{{ uid }}</div>
    </div>

    <mydialog :show="show">
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: stretch;
          margin: 30px;
          text-align:left
        "
      >
        <p>UID:</p>
        <input
          type="text"
          style="width: 200px"
          placeholder="请输入uid："
          v-model="uid"
        />
        <p>COOKIE:</p>
        <textarea placeholder="请输入cookie：" v-model="cookie"></textarea>
      </div>
      <div style="display: flex; justify-content: flex-end">
        <div class="mybtn" @click="show = false">取消</div>
        <div class="mybtn" style="background-color: green" @click="setcfg">
          确定
        </div>
      </div>
    </mydialog>
  </div>
</template>
<script>
import mydialog from "../mydialog.vue";
import axios from "axios";
export default {
  components: { mydialog },
  name: "LiveResin",
  data() {
    return {
      show: false,
      resinData: [
        {
          icon: "imgs/resin.png",
          title: "树脂:null",
          tip: "null 小时后恢复",
        },
        {
          icon: "imgs/daily_q.png",
          title: "委托:null",
          tip: "",
        },
      ],
      uid: "未配置",
      cookie: "",
      path: "",
    };
  },
  methods: {
    refresh() {
      var data = {
        uid: this.uid,
        cookie: this.cookie,
      };
      axios({
        url: "http://127.0.0.1:5000/api/getresin",
        method: "post",
        data: data,
        timeout: 3000,
      }).then((res) => {
        console.log(res.data.data);
        this.resinData[0].tip = res.data.msg;
        this.resinData[0].title = res.data.data.data.current_resin + "/160";
        this.resinData[1].title = res.data.data.data.finished_task_num + "/4";
        this.resinData[1].tip = res.data.data.data.is_extra_task_reward_received
          ? "已领取"
          : "未领取";
      });
    },
    setcfg() {
      this.show = false;
      var data = { cookie: this.cookie, uid: this.uid, path: this.path };
      localStorage.setItem("resin", JSON.stringify(data));
    },
    cp() {
      // navigator.clipboard.writeText(uid)
    },
    start() {
      window.chrome.webview.postMessage(
        JSON.stringify({
          method: "runcmd",
          cmd: "start scripts\\yuanshen.lnk",
        })
      );
    },
  },
  mounted() {
    var cfg = JSON.parse(localStorage.getItem("resin"));
    if (cfg == null) {
      this.uid = "未配置";
    } else {
      this.cookie = cfg.cookie;
      this.uid = cfg.uid;
      this.path = cfg.path;
    }
  },
};
</script>
<style>
.cardtitle {
  text-align: left;
  font-weight: bold;
}
.cardtitle::before {
  content: "▍";
  color: green;
  font-weight: bold;
}
.resin-title {
  font-weight: bold;
}
.resin-tip {
  font-size: small;
}
.resin-item {
  margin: 5px;
  background-color: rgba(0, 0, 0, 0);
  height: 40px;
  align-items: center;
  border-radius: 10px;
  width: 94%;

  border: 1px solid #006eff3b;

  /* box-shadow: 0 0 5px #0000001a; */
}
.resin-uid {
  color: gray;
  margin-top: 25px;
  text-align: right;
  font-size: 5px;
  cursor: default;
  user-select: text;
}
</style>