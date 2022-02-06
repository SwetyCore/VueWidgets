<template>
  <div class="music-player">
    <div class="music-avator" @click="start" title="启动网易云音乐">
      <img :src="songData.avatorSrc" height="153px" />
    </div>
    <div
      style="
        display: flex;
        width: 50%;
        justify-content: center;
        flex-direction: column;
        justify-content: space-between;
      "
    >
      <div class="music-name">{{ songData.songName.split("-")[0] }}</div>
      <div class="music-singer">{{ songData.songName.split("-")[1] }}</div>
      <div class="play-control" style="display: flex; justify-content: center">
        <div class="play-buttom" @click="previous">
          <i class="bi bi-skip-start-fill"></i>
        </div>
        <div class="play-buttom" @click="play">
          <i v-show="songData.isplay" class="bi bi-pause-circle-fill"></i>
          <i v-show="!songData.isplay" class="bi bi-pause-circle-fill"></i>
        </div>
        <div class="play-buttom" @click="next">
          <i class="bi bi-skip-end-fill"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const bridge = chrome.webview.hostObjects.bridge;

export default {
  name: "MusicPlayer",

  data() {
    return {
      songData: {
        avatorSrc:
          "https://p2.music.126.net/rCoqZPEbSb2zaPw_An9QZQ==/109951163194902165.jpg?param=140y140",
        songSrc: "",
        songName: "网易云音乐",
        isplay: "true",
      },
      songList: [],
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
    next() {
      this.runcmd("start scripts\\next.vbs");
      this.getName();
    },
    previous() {
      this.runcmd("start scripts\\previous.vbs");
      this.getName();
    },
    play() {
      this.runcmd("start scripts\\play.vbs");
      this.getName();
    },
    start() {
      this.runcmd("start scripts\\music.lnk");
      this.getName();
    },
    getName() {
      var vm = this;
      setTimeout(async () => {
        vm.songData.songName = await bridge.GetName();
      }, 300);
    },
  },
  mounted() {
    this.getName();
  },
};
</script>

<style>
.play-buttom {
  margin: 5px;
  font-size: 40px;
  cursor: pointer;
}
.play-buttom:active {
  transform: scale(0.92);
}
.music-player {
  display: flex;
}
.music-avator {
  width: 48%;
  height: 153px;
  overflow: hidden;
}
.music-avator {
  border-radius: var(--icon-border-radius);
  border: 1px solid #00000059;

  /* box-shadow: 0 0 5px #00000021; */
}
.music-name {
  font-size: 22px;
  font-weight: bold;
  margin-top: 20px;
  overflow: hidden;
  height: 40px;
}
.music-singer {
  font-size: small;
  overflow: hidden;
}
</style>

