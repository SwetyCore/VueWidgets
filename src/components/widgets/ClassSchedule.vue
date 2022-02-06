<template>
  <div>
    <div class="class-schedule-title">
      <div style="">今天 / 星期{{ 4 }} （测试数据）</div>
      <div>第{{ 5 }}周</div>
    </div>
    <div class="class-container" v-for="cls in classes" :key="cls">
      <div style="color: gray; font-size: small">
        {{ cls.start }}<br />
        {{ cls.end }}
      </div>
      <div
        :style="{ 'background-color': cls.color }"
        class="cls-color-bar"
      ></div>
      <div style="color: gray; font-size: small">
        <div style="color: black; font-size: 17px; font-weight: bold">
          {{ cls.course }}
        </div>
        {{ cls.lesson }} | {{ cls.clsroom }} | {{ cls.teacher }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
  name: "ClassSchedule",
  data() {
    return {
      classes: [
        {
          start: "08:00",
          end: "10:00",
          course: "高等数学",
          lesson: "第1-2节",
          clsroom: "XX楼 1101",
          teacher: "王老师",
          color: "skyblue",
        },
        {
          start: "10:40",
          end: "12:00",
          course: "工程化学",
          lesson: "第3-4节",
          clsroom: "XX楼 3201",
          teacher: "张老师",
          color: "#ffafa9",
        },
      ],
    };
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
.class-container:hover{
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