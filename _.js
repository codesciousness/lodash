const _ = {};

_.clamp = (num, lower, upper) => {
    num < lower ? num = lower : num > upper ? num = upper : num;
    return num;
}

/* An alternate clamp method solution:
_.clamp = (num, lower, upper) => {
    lowerClampedValue = Math.max(num, lower)
    clampedValue = Math.min(lowerClampedValue, upper)
    return clampedValue;
}
*/

/* Clamp Function Tests:
console.log(_.clamp(1, 2, 3));
console.log(_.clamp(9, 4, 6));
console.log(_.clamp(5, 1, 7));
*/

_.inRange = (num, start, end) => {
    if (end === undefined) {
        end = start;
        start = 0;
    }
    if (start > end) {
        const e = end;
        end = start;
        start = e;
    }
    return num >= start && num < end;
}

/* InRange Function Tests:
console.log(_.inRange(1, 2, 3));
console.log(_.inRange(9, 4, 6));
console.log(_.inRange(5, 1, 7));
console.log(_.inRange(-4, -2, -6));
console.log(_.inRange(1, 3));
console.log(_.inRange(2, 10));
console.log(_.inRange(21, 7));
*/

_.words = string => {
    return string.split(' ');
}

/* Words Function Tests:
console.log(_.words('Hello, my name is R2D2.'));
console.log(_.words('My favorite beverage is Root Beer'));
*/

_.pad = (str, len) => {
    if (len <= str.length) {
        return str;
    }
    const totalPadding = len - str.length;
    const startPad = Math.floor(totalPadding/2);
    const endPad = totalPadding - startPad;
    const tempString = str.padStart(str.length + startPad, ' ');
    const finalString = tempString.padEnd(tempString.length + endPad, ' ');
    return finalString;
}

/* An alternate pad method solution:
_.pad = (str, len) => {
    if (len <= str.length) {
        return str;
    }
    const startPaddingLength = Math.floor((len - str.length)/2);
    const endPaddingLength = len - str.length - startPaddingLength;
    const paddedString = ' '.repeat(startPaddingLength) + str + ' '.repeat(endPaddingLength);
    return paddedString;
}
*/

/* Pad Function Tests:
console.log(_.pad('rainbow', 10));
console.log(_.pad(':)', 6));
*/

_.has = (obj, key) => {
    return Object.keys(obj).includes(key);
}

/* An alternate has method solution:
_.has = (obj, key) => {
    return obj[key] !== undefined;
}
*/

/* Has Function Tests:
console.log(_.has({'a': 123, b: 456, 'c': 789}, 'a'));
console.log(_.has({bark: 'ruff ruff', growl: 'rrrr', 'happy': 'tail wags'}, 'play'));
*/

_.invert = obj => {
    let invertEntries = [];
    for (let [key, value] of Object.entries(obj)) {
        invertEntries.push([value, key]);
    };
    return Object.fromEntries(invertEntries);
}

/* An alternate invert method solution:
_.invert = obj => {
    let invertedObj = {};
    for (let key in obj) {
        invertedObj[obj[key]] = key;
    }
    return invertedObj;
}
*/

/* Invert Function Tests:
console.log(_.invert({'a': 123, b: 456, 'c': 123, d: 789}));
console.log(_.invert({bark: 'ruff ruff', growl: 'rrrr', 'happy': 'tail wags'}));
*/

_.findKey = (obj, predicate) => {
    for (let key in obj) {
        if (typeof predicate === 'function' && predicate(obj[key])) {
            return key;
        }
        else if (typeof predicate !== 'function' && predicate === obj[key]) {
            return key;
        }
    }
    return undefined;
}

/* FindKey Function Tests:
console.log(_.findKey({'a': 123, b: 456, 'c': 123, d: 789}, input => input > 700));
console.log(_.findKey({bark: 'ruff ruff', growl: 'rrrr', 'happy': 'tail wags'}, 'rrrr'));
console.log(_.findKey({'one thousand': 1000, 'two thousand': 2000, 'three thousand': 3000}, input => input === 500));
*/

_.drop = (arr, num) => {
    if (num === undefined) {
        return arr.slice(1);
    }
    return arr.slice(num);
}

/* Drop Function Tests:
console.log(_.drop(['bear', 'sloth', 'duck', 'dolphin', 'raccoon']));
console.log(_.drop(['bear', 'sloth', 'duck', 'dolphin', 'raccoon'], 2));
console.log(_.drop(['bear', 'sloth', 'duck', 'dolphin', 'raccoon'], 6));
console.log(_.drop(['bear', 'sloth', 'duck', 'dolphin', 'raccoon'], 0));
*/

_.dropWhile = (arr, predicate) => {
    for (let i = 0; i < arr.length; i++) {
        if (!predicate(arr[i], i, arr)) {
            return arr.slice(i);
        }
    }
}

/* An alternate dropWhile method solution:
_.dropWhile = function(arr, predicate) {
    const dropNum = arr.findIndex((element, index) => !predicate(element, index, arr));
    const dropArr = this.drop(arr, dropNum);
    return dropArr;
}
*/

/* DropWhile Function Tests:
console.log(_.dropWhile([123, 456, 789, 101112], (value, index, array) => value < 700));
console.log(_.dropWhile(['bear', 'sloth', 'duck', 'dolphin', 'raccoon'], (value, index, array) => value !== 'dolphin'));
console.log(_.dropWhile([10, 20, 30, 45, 50], (value, index, array) => value % 10 === 0));
*/

_.chunk = (arr, size) => {
    let chunkArr = [];
    let tempArr = [];
    if (size === undefined) size = 1;
    arr.forEach(element => {
        const atEnd = arr.indexOf(element) === arr.length - 1;
        if (tempArr.length < size) {
            tempArr.push(element);
        }
        else if (tempArr.length === size) {
            chunkArr.push(tempArr);
            tempArr = [element];
        }
        if (atEnd) {
            chunkArr.push(tempArr);
        }
    });
    return chunkArr;
}

/* Alternate chunk method solutions:
_.chunk = (arr, size) => {
    if (size === undefined) size = 1;
    let finalArr = [];
    for (i = 0; i < arr.length; i++) {
        let arrChunk = [arr[i]];
        while (arrChunk.length < size && i < arr.length - 1) {
            i++;
            arrChunk.push(arr[i]);
        }
        finalArr.push(arrChunk);
    }
    return finalArr;
}

_.chunk = (arr, size) => {
    if (size === undefined) size = 1;
    let arrChunks = [];
    for (i = 0; i < arr.length; i += size) {
        let arrChunk = arr.slice(i, i + size);
        arrChunks.push(arrChunk);
    }
    return arrChunks;
}
*/

/* Chunk Function Tests:
console.log(_.chunk([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]));
console.log(_.chunk([123, 456, 789, 101112, 131415, 161718], 2));
console.log(_.chunk(['bear', 'sloth', 'duck', 'dolphin', 'raccoon', 'turtle', 'bat'], 3));
console.log(_.chunk([10, 20, 30, 40, 50, 60, 70, 80, 90, 100], 4));
*/

// Do not write or modify code below this line.
module.exports = _;