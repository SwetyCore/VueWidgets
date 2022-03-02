<template>
    <div>
      <div class="class-schedule-title">
        <div style="">今天 / 星期{{ new Date().getDay()==0?"日":new Date().getDay() }} </div>
        <div>第{{ cweek }}周</div>
      </div>
      <div
        class="class-container drag-ignore"
        v-for="cls in classes"
        :key="cls"
      >
        <div style="color: gray; font-size: small">
          {{ cls.start }}<br />
          {{ cls.end }}
        </div>
        <div
          :style="{ 'background-color': cls.color }"
          class="cls-color-bar"
        ></div>
        <div style="color: gray; font-size: small; text-align: left">
          <div
            style="
              color: black;
              font-size: 17px;
              font-weight: bold;
              overflow: hidden;
              height: 1em;
            "
          >
            {{ cls.course }}
          </div>
          {{ cls.lesson }} | {{ cls.clsroom }} | {{ cls.teacher }}
        </div>
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
      classes: [
      ],
      times: {
        "1,2": ["08:00", "09:40"],
        "3,4": ["10:00", "11:40"],
        "5,6": ["14:00", "15:40"],
        "7,8": ["16:00", "17:40"],
        "9,10": ["19:00", "20:40"],
      },
    };
  },
  mounted() {
    axios.get("my/gtcourse").then((res) => {
      var data = res.data.data;
      var table = [];
      data.forEach((element) => {
        table.push({
          start: this.times[element.sections][0],
          end: this.times[element.sections][1],
          course: element.name,
          lesson: "第" + element.sections + "节",
          clsroom: element.position,
          teacher: element.teacher,
          color: JSON.parse(element.style).color,
        });
      });
      this.classes = table;
      this.cweek = res.data.week;
    }).catch();
  },
};
</script>

<style>
.class-container {
  display: flex;
  border-radius: var(--icon-border-radius);
  background-color: white;
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
  height: 30px;
  width: 5px;
  border-radius: var(--icon-border-radius);
  margin-left: 10px;
  margin-right: 10px;
}
</style>