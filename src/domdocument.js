const domElement = (name, rect = { x: 0, y: 0, width: 300, height: 300 }) => {
    const e = {
           name,
           attributes: {},
           style: {},
           children: [],
           listeners: [],
           parentNode: null,
           parentElement: null,
           ownerDocument: {
           createElementNS(ns, tag) {
           return domElement(`${ns}:${tag}`);
           },
           createElement(tag) {
           return domElement(tag);
           }
           },
           cloneNode(b) {
           const ret = domElement(this.name);
           if (b) {
           ret.children = b.children.slice();
           }
           return ret;
           },
           replaceChild(add, remove) {
           this.children.splice(this.children.indexOf(remove), 1, add);
           },
           setAttribute(attr, value) {
           this.attributes[attr] = value;
           },
           getAttribute(attr) {
           return this.attributes[attr];
           },
           appendChild(el) {
           this.children.push(el);
           el.parentNode = this;
           el.parentElement = this;
           },
           get firstChild() {
           return this.children[0];
           },
           removeChild(el) {
           this.children.splice(this.children.indexOf(el), 1);
           el.parentNode = null;
           el.parentElement = this;
           },
           addEventListener(key, val) {
           const obj = {};
           obj[key] = val;
           this.listeners.push(obj);
           },
           removeEventListener(key, val) {
           for (let i = this.listeners.length - 1; i >= 0; i--) {
           if (this.listeners[i][key] === val) {
           this.listeners.splice(i, 1);
           }
           }
           },
           trigger(listenerKey, arg) {
           this.listeners
           .filter(l => typeof l[listenerKey] !== 'undefined')
           .forEach(l => l[listenerKey].call(this, arg));
           },
           getBoundingClientRect() {
           return {
           left: rect.x,
           top: rect.y,
           width: rect.width,
           height: rect.height
           };
           },
           contains(target) {
           return this.children.indexOf(target) !== -1;
           }
           };
   
   
           return e;
   };

export default {
    createElementNS: function (ns, tag) {
        return domElement(`${ns}:${tag}`);
    },
    createElement: function (tag) {
        return domElement(tag);
    },
    elementFromPoint: function(x, y) {
        return domElement('xy');
    }
};
 