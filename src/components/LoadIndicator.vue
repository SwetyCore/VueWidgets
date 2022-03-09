<template>
  <v-container v-if="loading">
    <v-row
      class="fill-height d-flex align-center"
      align-content="center"
      justify="center"
    >
      <v-col cols="6">
        <v-progress-linear indeterminate rounded height="6"></v-progress-linear>
      </v-col>
      <!-- <small class="subtitle-1 text-center"> <br>部件数据加载中 </small> -->
    </v-row>
  </v-container>
</template>

<script>
export default {
    name:"LoadIndicator",
    props:["loading"]
};
</script>

<style>
</style>