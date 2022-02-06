<template>
  <div class="calendar-container" style="display: flex">
    <div style="width: 50%; text-align: left">
      <div style="color: #c92828">
        周{{ day }} {{ gregorianFestival }}
        <div style="font-size: 60px; margin-top: 20px; color: black">
          {{ date }}
        </div>
      </div>
      <div>
        {{ Ndate }}<br />
        {{ lunarYearCn + "年" + lunarMonthCn + lunarDayCn }}
      </div>
    </div>
    <div class="calender_container">
      <div v-for="week in weeks" :key="week">{{ week }}</div>
      <div v-for="blank in blankdays" :key="blank">{{ " " }}</div>
      <div v-for="dayitem in daylist" :key="dayitem" :class="dayitem[1]">
        {{ dayitem[0] }}
      </div>
    </div>
  </div>
</template>
<script>
import lunar from "./calendar";
const days = ["日", "一", "二", "三", "四", "五", "六"]; // 星期数组
var interval; // 定义全局定时器，用于清除定时器
export default {
  setup() {},
  name: "Calendar",
  data() {
    return {
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
      year: "",
      month: "",
      date: "",
      day: "",
      gregorianFestival: "",
      lunarMonthCn: "",
      lunarDayCn: "",
      lunarYearCn: "",
      zodiacYear: "",
      daylist: {},
      blankdays: {},
      allday: "",
    };
  },

  methods: {
    updatedate: function () {
      var lunardata = lunar.data();
      let icnow = new Date();
      this.year = icnow.getFullYear();
      this.month = icnow.getMonth() + 1;
      this.date = icnow.getDate();
      this.day = days[icnow.getDay()];
      this.zodiacYear = lunardata.zodiacYear;
      this.lunarYearCn = lunardata.lunarYearCn;
      this.lunarDayCn = lunardata.lunarDayCn;
      this.lunarMonthCn = lunardata.lunarMonthCn;
      this.gregorianFestival = lunardata.gregorianFestival;
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
        console.log(i, "day");
        this.blankdays[i] = "i";
      }

      for (var j = 1; j <= allday; j++) {
        if (j == day) {
          this.daylist[j] = [j, "dayitem-now"];
        } else {
          this.daylist[j] = [j, "dayitem"];
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
    this.updatedate();
    interval = setInterval(() => {
      this.updatedate();
    }, 1000 * 60 * 60);
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
  background-color: rgb(98, 22, 36);
  border-radius: 5px;
  color: white;
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
</style>