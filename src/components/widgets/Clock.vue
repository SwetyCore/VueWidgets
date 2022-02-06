<template>
  <div id="clock">
    <div id="time">
      {{ time.substr(0, 5) }}
      <div style="font-size: 20px; margin-top: 20px; color: #c92828">
        {{ time.substr(5, 8) }}
      </div>
    </div>
    <div id="date">
      {{ Nweek }}
      <div>{{ Ndate }}</div>
    </div>
  </div>
</template>


<script>
const days = ["日", "一", "二", "三", "四", "五", "六"]; // 星期数组
var interval; // 定义全局定时器，用于清除定时器
export default {
  setup() {},
  name: "Clock",
  data() {
    return {
      year: "",
      month: "",
      date: "",
      day: "",
      time: "",
    };
  },
  methods: {
    updatedate: function () {
      let icnow = new Date();
      this.year = icnow.getFullYear();
      this.month = icnow.getMonth() + 1;
      this.date = icnow.getDate();
      this.day = days[icnow.getDay()];
      this.time = icnow.toTimeString().substring(0, 8);
    },
  },
  created() {
    this.updatedate()
    interval = setInterval(() => {
      this.updatedate()
    }, 1000);
  },
  computed: {
    Nweek: function () {
      return "星期" + this.day;
    },
    // 当前时间
    Ndate: function () {
      return this.year + "年" + this.month + "月" + this.date + "日 ";
    },
  },
  beforeDestroy() {
    clearInterval(interval);
  },
};
</script>
<style>
#time {
  margin-left: 10px;
  font-size: 42px;
  font-weight: bold;
  display: flex;
  padding-top: 40px;
}
#clock {
  width: 100%;
  height: 100%;
  color: white;
}
</style>