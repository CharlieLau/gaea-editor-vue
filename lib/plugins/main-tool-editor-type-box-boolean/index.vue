<template>
    <Container>
        <i-switch  v-model="val"></i-switch>
    </Container>
</template>

<script>
import * as components from './style';
export default {
    components: {
        ...components
    },
    position: 'mainToolEditorTypeBoolean',
    name: 'main-tool-editor-type-boolean',
    data () {
        return {
            val: false
        };
    },
    computed: {
        applicationState () {
            return this.$store.state.application;
        },
        viewportState () {
            return this.$store.state.viewport;
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
