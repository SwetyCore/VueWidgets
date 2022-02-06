<template>
  <div>
    <div style="display: flex; justify-content: space-between">
      <div class="cardtitle">待办</div>
      <div style="font-size: 20px; cursor: pointer; display: flex">
        <div class="iconbtn" @click="edittodo" title="添加">
          <i class="mdi mdi-plus"></i>
        </div>
        <div class="iconbtn" @click="handleClear" title="清除已完成项目">
          <i class="mdi mdi-delete-sweep-outline"></i>
        </div>
      </div>
    </div>
    <div style="overflow: auto; height: 300px">
      <div
        style="display: flex"
        class="todo-item"
        v-for="(item, index) in filterData"
        :key="index"
        @click="edittodo(item.id)"
      >
        <div class="todo-check-buttom" style="" @click.stop="donetodo(item.id)">
          <i v-if="item.completed" class="mdi mdi-checkbox-marked-outline"></i>
          <i v-else class="mdi mdi-checkbox-blank-outline"></i>
        </div>
        <div
          style="margin-left: 5px; text-align: center; width: 100%"
          v-if="!item.completed"
        >
          <div class="todo-title">{{ item.text }}</div>
          <div class="todo-tip">{{ item.deadline }} {{ item.deadtime }}</div>
        </div>
        <div
          style="
            margin-left: 5px;
            text-align: center;
            width: 100%;
            text-decoration: line-through;
          "
          v-else
        >
          <div class="todo-title">{{ item.text }}</div>
          <div class="todo-tip">{{ item.deadline }} {{ item.deadtime }}</div>
        </div>
        <div
          class="todo-check-buttom"
          style=""
          @click.stop="handleDeleteItem(item.id)"
        >
          <i class="mdi mdi-delete"></i>
        </div>
      </div>
    </div>

    <mydialog :show="show">
      <div
        style="
          flex-flow: column wrap;
          justify-content: space-between;
          display: flex;
          margin: 20px;
          align-content: space-around;
          flex-wrap: wrap;
          flex-direction: row;
        "
      >
        <div :id="editorId"></div>
        <input placeholder="日期" type="date" v-model="deadline" />
        <input type="time" v-model="deadtime" />
      </div>
      <div style="display: flex; justify-content: flex-end">
        <div class="mybtn" @click="show = false">取消</div>
        <div class="mybtn" style="background-color: green" @click="addTodo">
          确定
        </div>
      </div>
    </mydialog>
  </div>
</template>

<script>
import mydialog from "../mydialog.vue";
// 引入富文本编辑器
import E from "wangeditor";

export default {
  components: { mydialog },
  name: "Todo",
  data() {
    return {
      editorId: "editor01",
      editor: null,
      show: false,
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
        let editor = new E("#" + "editor01");
        this.editor = editor;
        editor.create(); //开始创建编辑器；
        if (this.content != undefined) {
          this.editor.txt.html(this.content);
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
      this.show = false;
      this.index = null;
    },
    edittodo(id) {
      if (typeof id == typeof 1) {
        var index = this.todoData.findIndex((item) => item.id === id);
        this.content = this.todoData[index].content;
        this.deadline = this.todoData[index].deadline;
        this.deadtime = this.todoData[index].deadtime;
        this.index = index;
      }
      this.show = true;
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
.todo-check-buttom {
  font-size: 24px;
  margin-left: 5px;
  cursor: pointer;
}
.todo-check-buttom:active {
  transform: scale(0.92);
}
.todo-title {
  height: 22px;
  font-weight: bold;
  overflow: auto;
  text-align: left;
}
.todo-tip {
  font-size: small;
  text-align: left;
}
.todo-item {
  margin: 4px;
  background-color: white;
  height: 56px;
  align-items: center;
  border-radius: 10px;
  width: 96%;
}
.todo-item:hover {
  box-shadow: 0 0 5px #0000001a;
}

.iconbtn {
  margin-left: 5px;
}
.iconbtn:hover {
  color: gray;
}
</style>