<template>
  <Button :type="type" :style="{...styles}">{{text}}</Button>
</template>

<script>
import {editSetting} from './property';
export default {
    // props: {
    //     text: {
    //         type: String,
    //         default: 'Button Text'
    //     },
    //     type: String,
    //     styles: Object
    // },
    data () {
        return {
            text: 'Button Text',
            styles: {},
            type: 'default'
        };
    },
    editSetting,
    name: editSetting.key
};
</script>

<style>

</style>
