<template>
  <div class="widget-card">
    <div class="calendar-container" style="display: flex">
      <div style="width: 50%; text-align: left">
        <div style="color: #c92828">
          周{{ day }} {{ gregorianFestival }}
          <div style="font-size: 60px; margin-top: 5px; color: black">
            {{ date }}
          </div>
        </div>
        <div>
          {{ Ndate }}<br />
          {{ lunar }}
        </div>
      </div>
      <div class="calender_container">
        <div v-for="week in weeks" :key="week">{{ week }}</div>
        <div v-for="blank in blankdays" :key="blank">{{ " " }}</div>
        <div
          v-for="dayitem in daylist"
          :key="dayitem"
          :class="[dayitem[1], dayitem[2] == null ? '' : 'havetodo']"
          :title="dayitem[2]"
        >
          {{ dayitem[0] }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const days = ["日", "一", "二", "三", "四", "五", "六"]; // 星期数组
const { Solar } = require("./lunar.js");

var interval; // 定义全局定时器，用于清除定时器
export default {
  setup() {},
  name: "Calendar",
  data() {
    return {
      todoData: [],
      lunar: "",
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
      year: "",
      month: "",
      date: "",
      day: "",
      daylist: {},
      blankdays: {},
      allday: "",
    };
  },

  methods: {
    updatedate: function () {
      var todos = JSON.parse(localStorage.getItem("todo"));
      this.todos = todos;
      let icnow = new Date();
      this.year = icnow.getFullYear();
      this.month = icnow.getMonth() + 1;
      this.date = icnow.getDate();
      this.day = days[icnow.getDay()];
      let solar = Solar.fromYmd(this.year, this.month, this.date);
      this.lunar = solar.getLunar().toFullString().split(" ")[0];
      this.showday();
    },
    count: function () {
      var month = this.month;
      var allday;
      var year = this.year;
      if (month != 2) {
        if (month == 4 || month == 6 || month == 9 || month == 11)
          //判断是否是相同天数的几个月，二月除外
          allday = 30;
        else allday = 31;
      } else {
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
          //判断是否是闰年，进行相应的改变
          allday = 29;
        else allday = 28;
      }
      return allday;
    },
    //显示相应月份的天数
    showday: function () {
      var allday = this.count();
      var month = this.month;
      var year = this.year;
      var day = this.date;
      var fistdate = new Date(year, month - 1, 1);
      var xinqi = fistdate.getDay();
      for (var i = 0; i < xinqi; i++) {
        // console.log(i, "day");
        this.blankdays[i] = "i";
      }
      for (var j = 1; j <= allday; j++) {
        var havetodo = null;
        var _this = this;
        this.todoData.forEach(function (value, index) {
          index == index;
          // console.log("value=", value, "index=", index);
          var target = value.deadline.split("-");
          if (
            Number(target[0]) == _this.year &&
            Number(target[1]) == _this.month &&
            Number(target[2]) == j
          ) {
            havetodo = value.text;
          }
        });

        if (j == day) {
          this.daylist[j] = [j, "dayitem-now", havetodo];
        } else {
          this.daylist[j] = [j, "dayitem", havetodo];
        }
      }
    },
  },
  computed: {
    Nweek: function () {
      return "星期" + this.day;
    },
    // 当前时间
    Ndate: function () {
      return this.year + "年" + this.month + "月";
    },
  },
  created() {
    var todos = JSON.parse(localStorage.getItem("todo"));
    console.log(localStorage.getItem("todo"), "storage");
    this.todoData = todos == null ? [] : todos;
    this.updatedate();
    interval = setInterval(() => {
      this.updatedate();
    }, 2000);
  },
  beforeDestroy() {
    clearInterval(interval);
  },
};
</script>
<style>
.calender_container {
  display: grid;
  width: 50%;
  grid-template-columns: repeat(7, 24px);
  grid-template-rows: repeat(7, 22px);
}
.dayitem-now {
  margin: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid rgb(128, 0, 0) !important;
  border-radius: 5px;
  cursor: pointer;
}
.dayitem {
  margin: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dayitem:hover {
  background-color: rgba(0, 0, 0, 0.082);
  border-radius: 5px;
}
.havetodo {
  border: 2px dotted rgb(75, 61, 0);
  border-radius: 5px;
}
</style>