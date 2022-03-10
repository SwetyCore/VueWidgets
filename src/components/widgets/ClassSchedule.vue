<template>
  <div style="width: 100%">
    <div>
      <div class="class-schedule-title">
        <div style="height:30px"><v-icon color="green">mdi-book</v-icon>
          今天 / 星期{{ new Date().getDay() == 0 ? "日" : new Date().getDay() }}
        </div>
        <div>第{{ cweek }}周</div>
      </div>
      <v-virtual-scroll height="280" :items="classes" item-height="52">
        <template v-slot="{ item, index }">
          <v-list-item :key="index" link  class="drag-ignore class-item" :style="JSON.parse(item.style)">
            <div style="width:60px;font-size:small">
              {{times[item.sections][0]}}<br/>
              {{times[item.sections][1]}}
            </div>
            <v-list-item-content>
              <v-list-item-title 
                ><strong>{{ item.name }}</strong></v-list-item-title
              >
              <v-list-item-subtitle
                >第{{ item.sections }}节 | {{ item.position }} |
                {{ item.teacher }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  setup() {},
  name: "ClassSchedule",
  data() {
    return {
      cweek: 0,
      classes: [],
      times: {
        "1,2": ["08:00", "09:40"],
        "3,4": ["10:00", "11:40"],
        "5,6": ["14:00", "15:40"],
        "7,8": ["16:00", "17:40"],
        "9,10": ["19:00", "20:40"],
      },
      data: {},
      startSemester: null,
    };
  },
  mounted() {
    axios.get("data/table.json").then((res) => {
      this.classes = [];
      var data = res.data.data;
      this.data = data;
      this.startSemester = data.setting.startSemester;
      this.cweek = this.cacWeek(
        new Date().valueOf(),
        parseInt(this.startSemester)
      );
      data.courses.forEach((element) => {
        if (element.weeks.includes(this.cweek)) {
          if (new Date().getDay() == element.day)
            // element.start=times[element.sections][0]
            this.classes.push(element);
          console.log(element);
        }
      });
    });
  },
  methods: {
    cacWeek(a, b) {
      var c = (a - b) / 60 / 60 / 24 / 7 / 1000;
      return Math.ceil(c);
    },
  },
};
</script>

<style>
.class-container {
  display: flex;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.075);
  margin: 10px;
  padding: 10px;
  align-items: center;
}
.class-container:hover {
  box-shadow: 0 0 5px #0000001a;
}
.class-schedule-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: rgb(95, 95, 95);
  font-size: 14px;
  font-weight: bold;
}
.cls-color-bar {
  height: 40px;
  width: 5px;
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: aqua;
}
.class-item{
  border-radius: 10px;
}
</style>