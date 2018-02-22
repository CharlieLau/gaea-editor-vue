<template>
    <Container>
        <Select v-model="val" style="width:150px" size="small" >
            <Option v-for="item in optionsData" :value="item.value||''" :key="item.value">{{ item.text }}</Option>
        </Select>
    </Container>
</template>

<script>
import * as components from './style';
export default {
    components: {
        ...components
    },
    position: 'mainToolEditorTypeSelect',
    name: 'main-tool-editor-type-select',
    data () {
        return {
            val: ''
        };
    },
    props: {
        instanceInfo: Object,
        editor: Object
    },
    computed: {
        applicationState () {
            return this.$store.state.application;
        },
        viewportState () {
            return this.$store.state.viewport;
        },
        optionsData () {
            let _data = this.editor.data || [];
            return _data;
        }
    },

    methods: {
        handleChange () {

        }
    }
};
</script>

<style>

</style>
