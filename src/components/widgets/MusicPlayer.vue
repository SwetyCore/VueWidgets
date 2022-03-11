<template>
  <div style="margin-top: 8px">
    <v-row>
      <v-card style="border-radius: 10px" outlined @dbclick="start"
        ><v-img
          :src="songData.avatorSrc"
          width="164px"
          :aspect-ratio="1"
        ></v-img
      ></v-card>

      <v-col>
        <div style="height: 100px; max-width: 170px">
          <br />
          <h2
            class="text-no-wrap text-center text-truncate"
            style="display: block"
          >
            {{ songData.songName.split("-")[0] }}
          </h2>
          <div
            class="text-subtitle-2 text-center text-truncate"
            style="display: block"
          >
            {{ songData.songName.split("-")[1] }}
          </div>
        </div>
        <v-row>
          &nbsp;
          <v-btn text @click="previous" rounded
            ><v-icon>mdi-skip-previous</v-icon></v-btn
          >
          <v-btn text @click="play" rounded><v-icon>mdi-play</v-icon></v-btn>
          <v-btn text @click="next" rounded
            ><v-icon>mdi-skip-next</v-icon></v-btn
          >
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";

export default {
  name: "MusicPlayer",

  data() {
    return {
      songData: {
        avatorSrc: "",
        songSrc: "",
        songName: "网易云音乐-歌名",
        isplay: "true",
      },
      songList: [],
    };
  },
  methods: {
    runcmd(cmd) {
      apiHost.runcmd(cmd);
    },
    next() {
      this.runcmd("start Resources\\next.vbs");
      this.getName();
    },
    previous() {
      this.runcmd("start Resources\\previous.vbs");
      this.getName();
    },
    play() {
      this.runcmd("start Resources\\play.vbs");
      this.getName();
    },
    start() {
      this.runcmd("start Resources\\music.lnk");
      this.getName();
    },
    getName() {
      apiHost.getSongName().then((res) => {
        this.songData.songName = res == "" ? "网易云音乐-歌名" : res;
      });
    },
  },
  mounted() {
    var _this = this;
    setInterval(() => {
      _this.getName();
    }, 3000);
  },
  watch: {
    songData: {
      handler(newValue, oldValue) {
        console.log(newValue, oldValue);
        var _this = this;
        apiHost.getAvator(this.songData.songName).then((res) => {
          _this.songData.avatorSrc = res;
        });
      },
      deep: true,
    },
  },
};
</script>

<style>
.play-buttom {
  margin: 5px;
  font-size: 40px;
  cursor: pointer;
}
.play-buttom:hover {
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.274);
}
.play-buttom:active {
  transform: scale(0.92);
}
.music-player {
  display: flex;
}
.music-avator {
  width: 48%;
  height: 150px;
  overflow: hidden;
  background-color: rgba(128, 128, 128, 0.288);
}
.music-avator {
  border-radius: var(--icon-border-radius);
  border: 1px solid #0000001c;
}
.music-name {
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  overflow: hidden;
  max-height: 40px;
}
.music-singer {
  font-size: small;
  overflow: hidden;
  height: 2rem;
}
</style>

