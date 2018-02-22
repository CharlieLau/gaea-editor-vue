import Vue from 'vue';
import {HelperClass} from './mount-mixin';
/**
 *
 * @param {*} $el  要挂载的元素
 * @param {*} component 组件类型
 * @param {*} isAppend  是否追加
 * @param {*} instanceKey 实例Id
 * @param {*} store  store对象
 */
export const mount = ($el, component, isAppend, instanceKey, store) => {
    return new Promise((resolve, reject) => {
        let $mountDom = null;
        if (isAppend) { // 如果id 存在 挂载元素下面
            let span = document.createElement('span');
            $el.appendChild(span);
            $mountDom = span;
        } else { // 如果元素不存在  替换元素
            $mountDom = $el;
        }
        let vm = new Vue({
            extends: component,
            mixins: [HelperClass],
            store
        });
        // 挂载前 data赋值
        vm.__crrtInstanceKey__ = instanceKey;
        vm.$mount($mountDom);
        // 挂载之后操作
        resolve(vm);
    });
};
/**
 *
 * @param {*} $el  要挂载的元素
 * @param {*} component 组件类型
 * @param {*} isAppend  是否追加
 * @param {*} instanceKey 实例Id
 * @param {*} store  store对象
 */
export const mountSlot = (parentVm, component, slotName, instanceKey, store) => {
    return new Promise((resolve, reject) => {
        let WrapperComponent = {
            extends: component,
            mixins: [HelperClass, {
                props: {
                    __crrtInstanceKey__: {
                        type: String,
                        default: instanceKey
                    }
                }
            }],
            store
        };
        let elem = parentVm.$createElement(WrapperComponent);
        // if (Array.isArray(elem)) {
        //     if (Array.isArray(parentVm.$slots[slotName])) {
        //         parentVm.$slots[slotName] = [...parentVm.$slots[slotName], ...elem];
        //     } else {
        //         parentVm.$slots[slotName] = [...elem];
        //     }
        // } else {
        if (Array.isArray(parentVm.$slots[slotName])) {
            parentVm.$slots[slotName].push(elem);
        } else {
            parentVm.$slots[slotName] = [elem];
        }
        // }
        // 先更新父级 子级vnode 才能获取到 对应的 componentInstance
        parentVm.$forceUpdate();
        parentVm.$nextTick(() => {
            // 挂载之后操作
            resolve(elem);
        });
    });
};
