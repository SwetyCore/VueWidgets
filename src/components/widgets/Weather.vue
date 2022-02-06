<template>
  <div id="he-plugin-standard"></div>
</template>

<script>
export default {
  setup() {},
  name: "Weather",
  created() {
    window.WIDGET = {
      CONFIG: {
        layout: "3",
        width: "340",
        height: "170",
        background: "5",
        dataColor: "000000",
        borderRadius: "10",
        key: "2285f410141945a6a649f6eb48562b19",
      },
    };
    var d = document;
    var c = d.createElement("link");
    c.rel = "stylesheet";
    c.href =
      "https://widget.heweather.net/standard/static/css/he-standard.css?v=1.4.0";
    var s = d.createElement("script");
    s.src =
      "https://widget.heweather.net/standard/static/js/he-standard.js?v=1.4.0";
    var sn = d.getElementsByTagName("script")[0];
    sn.parentNode.insertBefore(c, sn);
    sn.parentNode.insertBefore(s, sn);
  },
};
</script>
<style>
.he-plugin-standard {
  transform: scale(0.8);
}
</style>