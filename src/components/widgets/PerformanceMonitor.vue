<template>
  <div @dblclick="taskmgr">
    <v-card-text v-if="!loading">
      <v-row>
        <v-col>
          <v-progress-circular
            :rotate="-90"
            :size="130"
            :width="15"
            :value="hostdata.cpu"
            :color="color(hostdata.cpu)"
          >
            <v-col class="text-center">
              <strong>CPU</strong>
              <div>{{ hostdata.cpu > 100 ? 100 : hostdata.cpu }}%</div></v-col
            >
          </v-progress-circular>
        </v-col>
        <v-divider class="mx-4" vertical></v-divider>
        <v-col>
          <v-progress-circular
            :rotate="-90"
            :size="130"
            :width="15"
            :value="hostdata.mem.commitedPrec"
            :color="color(hostdata.mem.commitedPrec)"
          >
            <v-col class="text-center">
              <strong>Mem</strong>
              <div>{{ hostdata.mem.commitedPrec }}%</div></v-col
            >
          </v-progress-circular>
        </v-col>
      </v-row>
    </v-card-text>
    <load-indicator :loading="loading"></load-indicator>
  </div>
</template>

<script>
import axios from "axios";
import LoadIndicator from "../LoadIndicator.vue";
export default {
  name: "PerformanceMonitor",
  components: { LoadIndicator },
  data() {
    return {
      hostdata: {},
    };
  },
  mounted() {
    setInterval(() => {
      this.getData();
    }, 2000);
  },
  methods: {
    runcmd(cmd) {
      axios.post("api/runcmd", { cmd: cmd }).then(() => {});
    },
    getData() {
      axios
        .get("api/performance")
        .then((res) => {
          var data = res.data;
          this.hostdata = data;
        })
        .catch();
    },
    taskmgr(){
      this.runcmd("taskmgr")
    },
    color(perc) {
      if (perc < 50) {
        return "green";
      } else if (perc < 80) {
        return "orange";
      } else {
        return "red";
      }
    },
  },
  computed: {
    loading() {
      return Object.keys(this.hostdata).length === 0;
    },
  },
};
</script>

<style>
</style>