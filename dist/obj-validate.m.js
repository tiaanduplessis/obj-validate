var r=require("samesame");function e(r,e){return void 0===r&&(r={}),r&&hasOwnProperty.call(r,e)}export default function(t,p){void 0===t&&(t={}),void 0===p&&(p={});var o=[];if(!r(t,p,"Object"))throw new Error("Invalid object or schema provided");return Object.keys(p).forEach(function(a){var n=p[a];n.required&&!e(t,a)&&o.push(ReferenceError("Missing required property "+a)),n.type&&e(t,a)&&(Array.isArray(n.type)?r.apply(void 0,[t[a]].concat(n.type))||o.push(TypeError("Invalid type. Property "+a+" should be "+n.type)):r(t[a],n.type)||o.push(TypeError("Invalid type. Property "+a+" should be "+n.type))),n.pattern&&n.pattern instanceof RegExp&&e(t,a)&&(t[a].toString().match(n.pattern)||o.push(TypeError("Invalid value. Property "+a+" does not match pattern "+n.pattern)))}),o};
//# sourceMappingURL=obj-validate.m.js.map
