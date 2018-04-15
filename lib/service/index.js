let builtInPlugins = [];
let sortedPlugins = {};
let pluginsBelongKeys = {};
let parseInputToOutRange = null;

const context = require.context(
    '../plugins',
    true,
    /index\.(vue)$/
);
context.keys().forEach(item => {
    builtInPlugins.push(context(item).default);
});

sortedPlugins = builtInPlugins.reduce((prev, nxt) => {
    if (!nxt || !nxt.position) {
        return prev;
    }
    let componentName = `${nxt.position}-${nxt.name}`;
    if (!componentName) {
        return prev;
    }
    if (!pluginsBelongKeys[nxt.position]) {
        pluginsBelongKeys[nxt.position] = [];
    }
    pluginsBelongKeys[nxt.position].push(componentName);
    prev[componentName] = nxt;
    // Vue.component(componentName, nxt); // 全局注册
    return prev;
}, {});

// 根据 inputRange outputRange 转换值
parseInputToOutRange = (value, inputRange, outputRange) => {
    if (value === undefined || value === null) {
        return null;
    }

    value = Number(value);

    if (inputRange[0] === outputRange[0] && inputRange[1] === outputRange[1]) {
        return value;
    }

    if (value >= inputRange[0] && value <= inputRange[1]) {
    // 给的值必须在 input 范围内
    // 转换成 0~1 的小数
        const percentage = (value - inputRange[0]) / (inputRange[1] - inputRange[0]);
        // 转换成 output 的长度
        const outputLength = (outputRange[1] - outputRange[0]) * percentage;
        // 数值是加上最小值
        value = outputLength + outputRange[0];
    }
    return value;
};

export default (Vue) => {
    Object.keys(sortedPlugins).forEach(item => {
        Vue.component(item, sortedPlugins[item]);
    });
}
;

export const SVC = {
    pluginsBelongKeys,
    sortedPlugins,
    parseInputToOutRange
};
