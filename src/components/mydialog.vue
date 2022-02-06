<template>
  <div v-if="show" class="mask">
    <div class="dialog"><slot></slot></div>
  </div>
</template>
<script>
export default {
  setup() {},
  name: "mydialog",
  props: ["show"],
};
</script>
<style>
.mybtn {
  background-color: tomato;
  margin: 10px;
  height: 40px;
  font-size: 28px;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  padding: 10px;
}
.mybtn:active {
  color: rgb(224, 224, 224);
  cursor: pointer;
  transform: scale(0.98);
}
textarea {
  border: 0;
  border-radius: 5px;
  background-color: rgba(241, 241, 241, 0.98);
  height: 100px;
  padding: 10px;
  margin: 10px;
  max-width: 420px;
  /* resize: none; */
  font-family: system-ui;
  font-size: medium;
}
input {
  outline-style: none;
  background-color: rgba(241, 241, 241, 0.98);
  border: 1px solid #ccc;
  border-radius: 10px;
  height: 40px;
  margin: 10px;
  width: 200px;
  font-family: system-ui;
  font-size: medium;
}
.dialog {
  position: fixed;
  top: 300px;
  background-color: white;
  width: 90%;
  border-radius: 10px;
  margin: 30px;
  min-height: 300px;

  box-shadow: 0 0 5px #00000056;
  font-family: system-ui;
  font-size: medium;
}
.mask {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  z-index: 9;
}
</style>