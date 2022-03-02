<template>
  <div style="width: 100%" @dblclick="dialog = true">
    <v-carousel
      cycle
      height="160px"
      hide-delimiter-background
      show-arrows-on-hover
      :hide-delimiters="false"
    >
      <v-carousel-item v-for="(slide, i) in computedData" :key="i">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div class="ct_title drag-ignore" v-bind="attrs" v-on="on">
              距离 {{ slide.name }}
              {{ !isBig(slide.data[0], 0) ? "已过" : "剩余" }}
            </div>
          </template>
          <span>双击编辑</span>
        </v-tooltip>

        <div class="ct_num">
          {{ !isBig(slide.data[0], 0) ? -slide.data[0] : slide.data[0] }}
          <div style="font-size: large; margin-top: 54px">
            {{ slide.data[1] }}
          </div>
        </div>
        <div class="ct_target">{{ slide.target }}</div>
      </v-carousel-item>
    </v-carousel>
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title class="text-h5"> 编辑 </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="deadlines"
            mobile-breakpoint="10"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>已有倒计时:</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog v-model="editdialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                      >添加</v-btn
                    >
                  </template>
                  <v-card>
                    <!-- 编辑 -->
                    <v-card-text>
                      <v-card-title
                        >{{ editedItem.name }} 事件编辑</v-card-title
                      >
                      <v-container>
                        <v-text-field
                          v-model="editedItem.name"
                          label="事件名称"
                          outlined
                        ></v-text-field>
                        <v-text-field
                          v-model="editedItem.target"
                          label="日期"
                          outlined
                        ></v-text-field>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close"
                        >Cancel</v-btn
                      >
                      <v-btn color="blue darken-1" text @click="save"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
var interval;
export default {
  name: "countdown",
  data() {
    return {
      headers: [
        {
          text: "事件名称",
          value: "name",
          align: "start",
          sortable: false,
        },
        { text: "截止日期", value: "target" },
        { text: "操作", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        name: "",
        target: "",
      },
      defaultItem: {
        name: "",
        target: "",
      },
      dialog: false,
      editdialog: false,
      deadlines: [
        {
          name: "开学",
          target: "2022-02-17",
        },
        {
          name: "八重神子UP",
          target: "2022-02-16",
        },
      ],
      computedData: [],
      interval: null,
    };
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.deadlines.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editdialog = true;
    },
    close() {
      this.editdialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.deadlines[this.editedIndex], this.editedItem);
      } else {
        this.deadlines.push(this.editedItem);
      }
      localStorage.setItem("countdown", JSON.stringify(this.deadlines));
      this.close();
    },
    deleteItem(item) {
      const index = this.deadlines.indexOf(item);
      confirm("确认删除?") && this.deadlines.splice(index, 1);
    },
    getleft() {
      var now = Date.now();
      this.computedData = [];
      this.deadlines.forEach((ele) => {
        var temp = {
          name: ele.name,
          target: ele.target,
          data: this.cacTime(Date.parse(new Date(ele.target)) - now),
        };
        this.computedData.push(temp);
      });
      return this.computedData;
    },
    cacTime(num) {
      var left;
      var unit;
      if (Math.abs(num) < 60 * 1000) {
        left = Math.ceil(num / 1000);
        unit = "秒";
      } else if (Math.abs(num) < 60 * 60 * 1000) {
        left = Math.ceil(num / 1000 / 60);
        unit = "分钟";
      } else if (Math.abs(num) < 24 * 60 * 60 * 1000) {
        left = Math.ceil(num / 1000 / 60 / 60);
        unit = "小时";
      } else {
        left = Math.ceil(num / 1000 / 60 / 60 / 24);
        unit = "天";
      }
      return [left, unit];
    },
    isBig(a, b) {
      return a > b;
    },
  },
  computed: {},
  created() {
    this.getleft();
    this.interval = setInterval(() => {
      this.getleft();
    }, 1000 * 5);
  },
  mounted() {
    var cfg = JSON.parse(localStorage.getItem("countdown"));
    if (cfg == null) {
      this.deadlines = [];
    } else {
      this.deadlines = cfg;
    }
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
  height: 30px;
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