



<script>
import * as _ from 'lodash';
import {Container} from './style';
import BoxEdit from './box-editor';
import {getStyle} from '../../service/dom';
export default {
    props: {
        instanceInfo: Object,
        editor: Object
    },
    data () {
        return {
            crrtStyle: {
                paddingLeft: 0,
                paddingTop: 0,
                paddingRight: 0,
                paddingBottom: 0,
                marginLeft: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0
            }
        };
    },
    position: 'mainToolEditorTypeBoxEditor',
    name: 'main-tool-editor-type-box-editor',
    computed: {
        applicationState () {
            return this.$store.state.application;
        },
        viewportState () {
            return this.$store.state.viewport;
        },
        currentEditInstanceKey () {
            let currentEditInstanceKey = this.$store.state.viewport.currentEditInstanceKey;
            return currentEditInstanceKey;
        }
    },
    mounted () {
        // console.log(this.instanceInfo);
    },
    methods: {
        handleStart () {
            // console.log(111);
        },
        handleFinalChange (field, value) {
            this._setDatCrrtStyle(field, value);
        },
        handleChange (field, value) {
            this._setDatCrrtStyle(field, value);
        },
        _setDatCrrtStyle (field, value) {
            this.crrtStyle[field] = value;
            let cpStyle = Object.keys(this.crrtStyle).reduce((prev, nxt) => {
                prev[nxt] = this.crrtStyle[nxt] + 'px';
                return prev;
            }, {});
            this.$store.commit('viewport/setInstanceProps', {
                vm: this.instanceInfo.vm,
                key: 'styles',
                value: {
                    ...cpStyle
                }
            });
        },
        _initPerStyle (field) {
            if (this.instanceInfo.vm.$data.styles && typeof this.instanceInfo.vm.$data.styles[field] !== 'undefined') {
                this.crrtStyle[field] = parseInt(this.instanceInfo.vm.$data.styles[field]);
            } else {
                this.crrtStyle[field] = parseInt(getStyle(this.instanceInfo.vm.$el, _.kebabCase(field)));
            }
        },
        refresStyles () {
            this._initPerStyle('paddingLeft');
            this._initPerStyle('paddingTop');
            this._initPerStyle('paddingRight');
            this._initPerStyle('paddingBottom');
            this._initPerStyle('marginLeft');
            this._initPerStyle('marginTop');
            this._initPerStyle('marginRight');
            this._initPerStyle('marginBottom');
        }
    },
    watch: {
        currentEditInstanceKey (n, o) {
            // init
            this.refresStyles();
        }
    },
    render () {
        return (
            <Container>
                <BoxEdit
                    onStart={this.handleStart}
                    marginLeft={this.crrtStyle.marginLeft}
                    marginTop={this.crrtStyle.marginTop}
                    marginRight={this.crrtStyle.marginRight}
                    marginBottom={this.crrtStyle.marginBottom}
                    paddingLeft={this.crrtStyle.paddingLeft}
                    paddingTop={this.crrtStyle.paddingTop}
                    paddingRight={this.crrtStyle.paddingRight}
                    paddingBottom={this.crrtStyle.paddingBottom}
                    onChange={this.handleChange}
                    onFinalChange={this.handleFinalChange}
                ></BoxEdit>
            </Container>);
    },
    created () {
        // init
        this.refresStyles();
    }
};
</script>

<style>

</style>
