
import * as _ from 'lodash';
export const PropertyMixin = {

    watch: {
        currentEditInstanceKey (n, o) {
            // init
            this.initCurrtField();
        }
    },
    props: {
        instanceInfo: Object,
        editor: Object
    },
    data () {
        return {
            field: null,
            value: ''
        };
    },
    computed: {
        currentEditInstanceKey () {
            let currentEditInstanceKey = this.$store.state.viewport.currentEditInstanceKey;
            return currentEditInstanceKey;
        }

    },
    methods: {
        setInstanceProps (value) {
            this.$store.commit('viewport/setInstanceProps', {
                vm: this.instanceInfo.vm,
                key: this.field,
                value
            });
        },
        initCurrtField () {
            let props = this.instanceInfo.vm.$data;
            let val = _.get(props, this.field);
            if (val) {
                this.value = val;
            }
        }
    },
    mounted () {
        if (this.editor.field) {
            this.field = this.editor.field;
        }
    }
}
;
