
var assert = function(expression, expected_value, msg) {
    var output = expression();
    if (output === expected_value) {
        console.log(expression + 'passed');
    } else {
        console.log('failed: ' + msg);
        console.log('expected '+ expected_value + ' got ' + output )
    }

};

var array_eq = function(list1, list2) {
    if (list1.length != list2.length) {
        return false;
    } else {
        var i = 0;
        while (i < list1.length) {
            if (list1[i] != list2[i]) {
                return false;
            }
            i++;
        }
        return true;

    }

}


var SortableCollection = require ('./sort.js');
var compare = function(a, b) {
    if (a > b) {
        return 1
    } else if (a === b) {
        return 0;
    } else {
        return -1;
    }
}


var sort = new SortableCollection([5, 4, 2, 3, 1], compare);

assert(function() {
    return array_eq([1,2, 3,4], [1,2,3,4]);
}, true);

assert(function() {
    return array_eq(sort.merge([1, 2,4,6, 45, 60, 200, 300], [2, 3, 4, 7, 9, 20, 100]),
            [1,2,2,3,4,4,6, 7,9,20,45, 60,100, 200, 300])
}, true);


assert(function() {
    return array_eq(sort.merge([2], [1]),
            [1, 2]);
}, true);


assert(function() {
    return array_eq(sort.mergeSort([5,4,3,2,1,0, 4, 5, 6, 12]), [0,1,2,3,4,4,5,5,6, 12]);
}, true);

var InvarianceFinder = require('./invariants.js');
var invfinder = new InvarianceFinder(compare);

assert(function() {
    testValue = [2, 1];
    console.log('testValue: ' + testValue);
    var node = invfinder.countSplits([2], [1]);
    console.log(node.sorted + ' and  ' + node.inversions);

    return 1;
}, 1)


assert(function() {
    testValue = [2, 1, 4];
    var node = invfinder.countSplits([5, 7, 9], [4,8 ]);
    console.log(node.sorted + ' and  ' + node.inversions);

    return 1;
}, 1)


var inversions = invfinder.invCount([2,1]);
console.log(inversions);
inversions =     invfinder.invCount([12, 11, 10, 9,8,7,6,5,4,3,2,1]);
console.log(inversions);



/*
assert(function() {
    var testValue = [2, 1, 3, 4, 5];
    var expectedValue = [1, 2, 3, 4, 5];
    var expected_invariants = 1
    countedCollection = invfinder.invCount(testValue);
    console.log(testValue + ' entered, expecting ' expectedValue + ' with ' + expected_invariants + ' invariants.');

}, true)
*/







