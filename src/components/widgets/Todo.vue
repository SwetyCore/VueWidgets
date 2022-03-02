<template>
  <div style="width: 100%">
    <h3>
      待办
      <v-chip
        class="mr-2"
        :input-value="filter == 'all'"
        filter
        filter-icon="mdi-label"
        @click="filter = 'all'"
        small
      >
        所有待办
      </v-chip>
      <v-chip
        class="mr-2"
        @click="filter = 'active'"
        :input-value="filter == 'active'"
        filter
        filter-icon="mdi-label"
        color="orange"
        small
        dark
      >
        未完成
      </v-chip>
      <v-chip
        @click="filter = 'completed'"
        :input-value="filter == 'completed'"
        filter
        filter-icon="mdi-label"
        color="green"
        small
        dark
      >
        已完成
      </v-chip>

      <v-btn small icon @click="edittodo"><v-icon>mdi-plus</v-icon></v-btn>
      <v-btn small icon @click="handleClear"
        ><v-icon>mdi-delete-sweep-outline</v-icon></v-btn
      >
    </h3>
    <v-divider></v-divider>
    <v-list style="background-color: transparent;">
      <v-virtual-scroll height="280" :items="filterData" item-height="52">
        <template v-slot="{ item, index }">
          <v-list-item :key="index" link @click="edittodo(item.id)" dense class="drag-ignore">
            <v-list-item-icon>
              <v-btn icon @click.stop="donetodo(item.id)">
                <v-icon v-if="item.completed"
                  >mdi-checkbox-marked-outline</v-icon
                >
                <v-icon v-else>mdi-checkbox-blank-outline</v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-content
              :class="item.completed ? 'text-decoration-line-through' : ''"
            >
              <v-list-item-title>{{ item.text }}</v-list-item-title>
              <v-list-item-subtitle
                >{{ item.deadline }} {{ item.deadtime }}</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-list-item-action
              ><v-btn icon @click.stop="handleDeleteItem(item.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn></v-list-item-action
            >
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-list>
    <v-dialog
      transition="dialog-bottom-transition"
      max-width="900px"
      v-model="dialog"
    >
      <v-card>
        <v-toolbar color="primary" dark>待办编辑</v-toolbar>
        <v-card-text>
          <v-container>
            <div :id="editorId" style="margin-top: 5px"></div>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="deadline"
                      label="选择一个日期"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="deadline"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="11" sm="5">
                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="deadtime"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="deadtime"
                      label="Picker in menu"
                      prepend-icon="mdi-clock"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="deadtime"
                    full-width
                    @click:minute="$refs.menu.save(deadtime)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="addTodo">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// 引入富文本编辑器
import E from "wangeditor";

export default {
  components: {},
  name: "Todo",
  data() {
    return {
      menu: false,
      menu2: false,
      editorId: "editor01",
      editor: null,
      dialog: false,
      todoData: [],
      content: "",
      deadline: "",
      text: "",
      total: 0,
      filter: "all",
      deadtime: "",
      index: null,
    };
  },
  mounted: function () {
    var todos = JSON.parse(localStorage.getItem("todo"));
    console.log(localStorage.getItem("todo"), "storage");
    this.todoData = todos == null ? [] : todos;
  },
  methods: {
    //初始化编辑器
    initEditor() {
      this.$nextTick(function () {
        try {
          let editor = new E("#" + "editor01");
          this.editor = editor;
          editor.config.menus = [
            "head",
            "link",
            "list",
            "todo",
            "quote",
            "splitLine",
            "foreColor",
          ];
          editor.create(); //开始创建编辑器；
          if (this.content != undefined) {
            this.editor.txt.html(this.content);
          }
        } catch {
          if (this.content != undefined) {
            this.editor.txt.html(this.content);
          }
        }
      });
    },
    savetodo: function () {
      // this.$forceUpdate();
      localStorage.setItem("todo", JSON.stringify(this.todoData));
    },
    addTodo() {
      if (this.index == null) {
        this.todoData.unshift({
          id: new Date().valueOf(),
          content: this.editor.txt.html(),
          completed: false,
          deadline: this.deadline,
          text: this.editor.txt.text(),
          deadtime: this.deadtime,
        });
      } else {
        this.todoData[this.index].content = this.editor.txt.html();
        this.todoData[this.index].deadline = this.deadline;
        this.todoData[this.index].deadtime = this.deadtime;
        this.todoData[this.index].text = this.editor.txt.text();
      }
      this.content = "";
      this.deadtime = "";
      this.dialog = false;
      this.index = null;
    },
    edittodo(id) {
      if (typeof id == typeof 1) {
        var index = this.todoData.findIndex((item) => item.id === id);
        this.content = this.todoData[index].content;
        this.deadline = this.todoData[index].deadline;
        this.deadtime = this.todoData[index].deadtime;
        this.index = index;
      } else {
        this.index = null;
        this.content = "";
        this.deadline = "";
        this.deadtime = "";
      }
      this.dialog = true;
      this.$nextTick(function () {
        // DOM 更新了
        this.initEditor();
      });
    },
    donetodo(id) {
      this.todoData[
        this.todoData.findIndex((item) => item.id === id)
      ].completed =
        !this.todoData[this.todoData.findIndex((item) => item.id === id)]
          .completed;
    },
    handleDeleteItem(id) {
      this.todoData.splice(
        this.todoData.findIndex((item) => item.id === id),
        1
      );
    },
    handleToggleState(state) {
      this.filter = state;
    },
    handleClear() {
      this.todoData = this.todoData.filter((item) => item.completed == false);
    },
  },
  watch: {
    todoData: {
      deep: true,
      handler() {
        if (this.todoData == null) {
          localStorage.setItem("todo", JSON.stringify("[]"));
        } else {
          localStorage.setItem("todo", JSON.stringify(this.todoData));
        }
        this.total = this.todoData.filter(
          (item) => item.completed == false
        ).length;
      },
    },
  },
  computed: {
    filterData() {
      switch (this.filter) {
        case "all":
          return this.todoData;
        case "active":
          return this.todoData.filter((item) => item.completed == false);
        case "completed":
          return this.todoData.filter((item) => item.completed == true);
      }
      return "";
    },
  },
};
</script>

<style>
</style>