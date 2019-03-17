//import {head, last, remove, range, countElements, isEqual} from "arrayUtils.js";
var arrayUtils = require("./arrayUtils");
var stringUtils = require("./stringUtils");
var objUtils = require("./objUtils");

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

console.log();
stringUtils.capitalize([1,2,3],[1,2,3]);
stringUtils.capitalize("aMAN");
stringUtils.capitalize("");
console.log();
stringUtils.repeat("abc",2);
stringUtils.repeat("aMAN","a");
stringUtils.repeat("Hello",0);
console.log();
stringUtils.countChars('Hello, the pie is in the oven');

console.log();
objUtils.extend([1,2,3],[1,2,3]);
const first = { x: 2, y: 3};
const second = { a: 70, x: 4, z: 5 };
const third = { x: 0, y: 9, q: 10 };
const firstSecondThird = objUtils.extend(first, second, third);
// { x: 2, y: 3, a: 70, z: 5, q: 10 }

const secondThird = objUtils.extend(second, third);
// { a: 70, x: 4, z: 5, y: 9, q: 10 } 

const thirdFirstSecond = objUtils.extend(third, first, second);
// { x: 0, y: 9, q: 10, a: 70, z: 5 }

console.log();
objUtils.mapValues({ a: 1, b: 2, c: 3 }, n => n + 1);
objUtils.mapValues({ a: 1, b: 2, c: 3 }, "n => n + 1");