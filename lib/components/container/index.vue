<template>
  <div :style="{minWidth: '100px',minHeight: '100px',...styles}"  class="gaea-slot" data-slot-name='default' >
    <slot></slot>
  </div>
</template>

<script>
import { editSetting } from './property';
export default {
    editSetting,
    name: editSetting.key,
    data () {
        return {
            styles: {
                display: 'flex'
            }
        };
    },
    mounted () {
    }
};
</script>

<style>

</style>
