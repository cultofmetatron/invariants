/* This file will load in the file specified and then count the invariants */

var fs = require('fs');
var __ = require('underscore');
//load the file into memory
var filename = './IntegerArray.txt';
var file_contents = [];

var isnumber = function(num) {
    if ((typeof(num) == 'number') && !(isNaN(num))) {
        return true;
    } else {
        false;

    }

}

var InvFinder = require('./invariants.js');
var invFinder = new InvFinder(function(a, b){
    if(a < b) {
        return -1;
    } else if(a == b) {
        return 0;
    } else if(a > b) {
        return 1;

    }
});



 //read in the file
fs.readFile(filename, function(err, data) {
   //scrub the file into an array of numbers
    file_contents = data.toString().split('\n');
    var numbers = __.map( file_contents, function (num) {
        return parseInt(num);
    });
    //filter out NaN
    numbers = __.filter(numbers, isnumber);
    //now we start scrubbing numbers
    var sortedData = invFinder.invCount(numbers);
    console.log(sortedData.sorted);
    console.log(sortedData.inversions);
});
