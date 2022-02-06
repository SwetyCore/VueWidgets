<template>
    <div :class="[cardclass[0],'widget-card']">
        <div :class="[cardclass[1],'widget-item']" :style="{'background-image':cardbg,'background-color':bgcolor}">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
  name: 'WidgetCard',
  props:['size','cardbg','bgcolor'],
  computed:{
        cardclass:function(){
           return [this.size+'-size-widget',this.size+'-widget-item']
        }
    }
}
</script>


<style>
.widget-card{
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;;
    box-sizing: content-box;
}
.widget-item{
    border-radius: var(--icon-border-radius);
    padding: 10px;
    box-shadow: 0 0 5px #00000000;
    background-size: 100%;
    /* background-color: rgb(255 255 255 / 85%); */
    background-color: rgb(245 245 245);
    border: 1px solid #00000059;
}
/* .widget-card:active{
  transform: scale(0.97);
} */

.max-size-widget{
    width: calc(var(--icon-size) * 4 + var(--icon-gap-y) * 4);
    height: calc(var(--icon-size) * 4 + var(--icon-gap-x) * 4);
    grid-column: span 4;
    grid-row: span 4;
}
.max-widget-item{
  width: calc(var(--icon-size) * 4 + var(--icon-gap-y) * 4 - var(--widget-margin) * 2);
  height: calc(var(--icon-size) * 4 + var(--icon-gap-x) * 4 - var(--widget-margin) * 2);

  
}
.min-size-widget{
    width: calc(var(--icon-size) * 2 + var(--icon-gap-y) * 2);
    height: calc(var(--icon-size) * 2 + var(--icon-gap-x) * 2);
    grid-column: span 2;
    grid-row: span 2;
}
.min-widget-item{
  width: calc(var(--icon-size) * 2 + var(--icon-gap-y) * 2 - var(--widget-margin) * 2);
  height: calc(var(--icon-size) * 2 + var(--icon-gap-x) * 2 - var(--widget-margin) * 2);
}
.mid-size-widget{
    width: calc(var(--icon-size) * 4 + var(--icon-gap-y) * 4);
    height: calc(var(--icon-size) * 2 + var(--icon-gap-x) * 2);

    grid-column: span 4;
    grid-row: span 2;
}
.mid-widget-item{
  width: calc(var(--icon-size) * 4 + var(--icon-gap-y) * 4 - var(--widget-margin) * 2);
  height: calc(var(--icon-size) * 2 + var(--icon-gap-x) * 2 - var(--widget-margin) * 2);
}
.mid-r-size-widget{
    height: calc(var(--icon-size) * 4 + var(--icon-gap-y) * 4);
    width: calc(var(--icon-size) * 2 + var(--icon-gap-x) * 2);

    grid-column: span 2;
    grid-row: span 4;
}
.mid-r-widget-item{
  height: calc(var(--icon-size) * 4 + var(--icon-gap-y) * 4 - var(--widget-margin) * 2);
  width: calc(var(--icon-size) * 2 + var(--icon-gap-x) * 2 - var(--widget-margin) * 2);
}
</style>