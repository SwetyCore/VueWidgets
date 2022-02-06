<template>
  <div id="countdown" v-show="left >= 0">
    <slot></slot>
    <div class="ct_title" :style="{ color: cl_title, 'font-weight': 'bold' }">
      距离 {{ name }} 还有
    </div>
    <div class="ct_num" :style="{ color: cl_num }">
      {{ left }}
      <div style="font-size: large; margin-top: 45px">天</div>
    </div>
    <div class="ct_target" :style="{ color: cl_target }">{{ target }}</div>
  </div>
</template>
<script>
var interval;
export default {
  name: "Countdown",
  props: ["name", "target", "cl_title", "cl_num", "cl_target"],
  methods: {
    getleft: function () {
      var date = Date.parse(new Date(this.target));
      var now = Date.now();
      var left = Math.ceil((date - now) / 1000 / 60 / 60 / 24);
      return left;
    },
  },
  computed: {
    left: function () {
      return this.getleft();
    },
  },
  created() {
    interval = setInterval(() => {
      this.left + this.getleft();
    }, 1000 * 60);
  },
  beforeDestroy() {
    clearInterval(interval);
  },
};
</script>
<style>
#countdown {
  display: flex;
  flex-direction: column;
}
.ct_title {
  height: 50px;
}
.ct_num {
  font-weight: bold;
  font-size: 70px;
  display: flex;
}
.ct_target {
  text-align: left;
}
</style>