<template>
   <Container>
        <Input v-model="value" size="small" />
   </Container>
</template>

<script>
import * as components from './style';
import {PropertyMixin} from '../../service/main-tool-editor-type-mixin';
export default {
    components: {
        ...components
    },
    mixins: [PropertyMixin],
    position: 'mainToolEditorTypeString',
    name: 'main-tool-editor-type-string',
    mounted () {
        this.initCurrtField();
    },
    watch: {
        value (n, o) {
            if (n === o) {
                return;
            }
            this.setInstanceProps(n);
        }
    }
};
</script>

<style>

</style>
