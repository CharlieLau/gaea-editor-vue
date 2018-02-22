<template>
    <Container ref="container" @mouseleave.native="handleMouseLeave" >
        <EditHelper :instanceKey="viewportStore.rootInstanceKey" ></EditHelper>
    </Container>
</template>

<script>
import * as components from './style';
import EditHelper from './edit-helper';
import eventbus from '../../service/eventbus';
export default {
    components: {
        ...components,
        EditHelper
    },
    computed: {
        viewportStore () {
            return this.$store.state.viewport;
        }
    },
    methods: {
        handleMouseLeave (event) {
            event.stopPropagation();
            eventbus.$emit(this.$store.state.viewport.mouseLeaveViewport);
            this.$store.commit('viewport/setCurrentHoverInstanceKey', null);
        }
    },
    mounted () {
        this.$store.commit('viewport/setViewportDOM', this.$refs.container.$el);
    }
};
</script>

<style>

</style>
