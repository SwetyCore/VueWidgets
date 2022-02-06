<template>
  <div style="display: flex; flex-wrap: wrap">
    <div :class="power ? 'tile_btn_active' : 'tile_btn'" @click="poweroff">
      <i class="mdi mdi-power"></i>
    </div>
    <div :class="lock ? 'tile_btn_active' : 'tile_btn'" @click="lockscreen">
      <i class="mdi mdi-lock"></i>
    </div>
    <div :class="bluetooth ? 'tile_btn_active' : 'tile_btn'">
      <i class="mdi mdi-bluetooth"></i>
    </div>
    <div :class="wifi ? 'tile_btn_active' : 'tile_btn'" @click="wificontrol">
      <i class="mdi mdi-wifi"></i>
    </div>
  </div>
</template>
<script>
export default {
  setup() {},
  name: "PowerControl",
  data() {
    return {
      power: true,
      lock: false,
      wifi: true,
      bluetooth: false,
    };
  },
  methods: {
    runcmd(cmd) {
      window.chrome.webview.postMessage(
        JSON.stringify({
          method: "runcmd",
          cmd: cmd,
        })
      );
    },
    lockscreen() {
      this.runcmd("rundll32.exe user32.dll LockWorkStation");
    },
    poweroff() {
      let a = window.confirm("确定关机？");
      if (a) {
        this.runcmd("shutdown -s -t 5");
        alert("5s 后关机");
      } else {
        return
      }
    },
    wificontrol() {
      var a;
      if (this.wifi) {
        a = this.runcmd(
          'netsh interface set interface name="WLAN" admin=disable'
        );
      } else {
        a = this.runcmd(
          'netsh interface set interface name="WLAN" admin=enable'
        );
      }
      alert(a)
    },
  },
};
</script>

<style>
.tile_btn {
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