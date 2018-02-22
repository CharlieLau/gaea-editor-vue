<template>
    <Card :style="{...styles}">
        <p slot="title" v-if="title">{{title}}</p>
         <div  class="gaea-slot" style="min-height:50px;width:100%" data-slot-name='default' >
            <slot></slot>
         </div>
    </Card>
</template>

<script>
import {editSetting} from './property';
export default {
    editSetting,
    name: editSetting.key,
    data () {
        return {
            styles: {},
            title: 'title text'
        };
    }
};
</script>

<style>

</style>
