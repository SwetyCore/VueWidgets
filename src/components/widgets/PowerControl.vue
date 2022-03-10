<template>
  <div class="widget-card">
    <div style="display: flex; flex-wrap: wrap" class="drag-ignore">
      <div :class="power ? 'tile_btn_active' : 'tile_btn'" @click="poweroff">
        <i class="mdi mdi-power"></i>
      </div>
      <div :class="lock ? 'tile_btn_active' : 'tile_btn'" @click="lockscreen">
        <i class="mdi mdi-lock"></i>
      </div>
      <div :class="bluetooth ? 'tile_btn_active' : 'tile_btn'">
        <i class="mdi mdi-bluetooth"></i>
      </div>
      <div :class="'tile_btn'" @click="snapdrop">
        <i class="mdi mdi-share-all"></i>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  setup() {},
  name: "PowerControl",
  data() {
    return {
      power: true,
      lock: false,
      bluetooth: false,
    };
  },
  methods: {
    runcmd(cmd) {
      apiHost.runcmd(cmd);
    },
    lockscreen() {
      this.runcmd("rundll32.exe user32.dll LockWorkStation");
    },
    poweroff() {
      let a = window.confirm("5s 后关机?");
      if (a) {
        this.runcmd("shutdown -s -t 5");
      } else {
        return;
      }
    },
    snapdrop() {
      window.open("https://snapdrop.net/")
    },
  },
};
</script>

<style>
.tile_btn {
  width: 64px;
  height: 64px;
  background-color: #dedede;
  border-radius: 30px;
  margin: 7px;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.tile_btn:active {
  background-color: #0098fe;
  color: white;
}
.tile_btn_active {
  width: 60px;
  height: 60px;
  background-color: #dedede;
  border-radius: 30px;
  margin: 7px;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #0098fe;
  color: white;
}
</style>