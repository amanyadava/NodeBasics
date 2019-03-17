//import {head, last, remove, range, countElements, isEqual} from "arrayUtils.js";
var arrayUtils = require("./arrayUtils")

arrayUtils.head();
arrayUtils.head (['a','b','c']);
arrayUtils.head(123);
console.log();
arrayUtils.last();
arrayUtils.last (['a','b','c']);
arrayUtils.last(123);
console.log();
arrayUtils.remove([1,2,3],-1);
arrayUtils.remove([1,2,3],2);
arrayUtils.remove([1,2,3],'a');
console.log();
arrayUtils.range(-6);
arrayUtils.range(3,'hello');
console.log();
arrayUtils.countElements(-6);
arrayUtils.countElements(['a','b','c',1,1,'1',2,true]);
console.log();
arrayUtils.isEqual([1,2,3],[1,2,3]);
arrayUtils.isEqual([1,2,3],[1,2,'3']);