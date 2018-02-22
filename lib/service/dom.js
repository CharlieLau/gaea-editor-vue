export function hasClass (obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

export function removeClass (obj, cls) {
    if (hasClass(obj, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}

export function addClass (obj, cls) {
    if (!hasClass(obj, cls)) {
        obj.className === '' ? obj.className = `${cls}` : obj.className += ` ${cls}`;
    }
}

export function getStyle (obj, oStyle) { // 获取元素的样式
    if (obj.currentStyle) {
        return obj.currentStyle[oStyle];
    } else {
        return getComputedStyle(obj, null)[oStyle];
    }
};
