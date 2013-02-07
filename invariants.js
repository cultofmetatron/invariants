module.exports = function(comparator) {
// this fle will look up invariants
    var compareFunc = comparator; //the comparison function
    var ArraySplit = require('./sort.js');
    var arraySplit1 = new ArraySplit([0], comparator);
    var arraySplit = arraySplit1.arraySplit;
    //the function to merge count and invariance given
    //two arrays

    //given a mergeCount
    /*
     * takes an array, splits it into two, then
     */
    var countSplits = function(left, right) {
        /* the left and right are sorted arrays

        */
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        console.log('left' + left);
        //if either is empty, simply return the other array
        if ((left.length == 0) || (right.length == 0)) {
            if (left.length == 0) {
                return {
                    sorted: right,
                    inversions: 0
                };
            } else {
                return {
                    sorted: left,
                    inversions: 0
                }
            }
        }

        var sortedList = [];
        var inversions_count = 0;
        tracker_left = 0;
        tracker_right = 0;

        /*inversions happen when an item from the right side is chosen
         * times the number of items still on the left node!!
         *
         */
        while((tracker_left < left.length) && (tracker_right < right.length)) {
            if (compareFunc(left[tracker_left], right[tracker_right] ) < 0) {
                /*if the right side item is larger, push left item on stack and increment
                  the tracker, also add left.length - the tracker to get the number of
                  inversions on that numbers.
                */
                sortedList.push(left[tracker_left]);
                //get inversions
                ++tracker_left; //incremet the tracker
            } else {
                /* left side is bigger */
                sortedList.push(right[tracker_right]);
                //add to inversions
                inversions_count = inversions_count + (left.length - tracker_left);
                ++tracker_right;
            }
        }


        while (tracker_left < left[tracker_left]) {
            sortedList.push(left[tracker_left]);
            //inversions_count = inversions_count ;
            ++tracker_left;
        }

        while (tracker_right < right[tracker_right]) {
            sortedList.push(right[tracker_right]);
            ++tracker_right;

        }

        console.log('inversions count: ' +inversions_count);
        //returns the merged array + the count of split inversions + the
        return {
            sorted:sortedList,
            inversions: inversions_count
        }
    }

    var invCount = function(collection) {
        //Base case
        //if collection.length == 0, return itself + 0 inversions
        if (collection.length == 1 || collection.length == 0) {
            return {
                inversions:0,
                sorted:collection
            };
        }



            /* we want to find the amount of invariants so
         * we get a all the split invariants
         */
        var tree = arraySplit(collection);
        var collectionAndInversions_left = invCount(tree.left);
        console.log(collectionAndInversions_left);
        var collectionAndInversions_right = invCount(tree.right);
        console.log( collectionAndInversions_right);
        //get the count of split invariants
        invCount_collection = countSplits(collectionAndInversions_left.sorted,
                                          collectionAndInversions_right.sorted);

        //collect the inversions returned from the split inversions
        //collected from the countSplits and the recursive calls
        var inversions = invCount_collection.inversions +
                            collectionAndInversions_left.inversions  +
                            collectionAndInversions_right.inversions;


        //return an object with the number of splits of the
        return {
            inversions: inversions,
            sorted:invCount_collection.sorted
        }


    }

    return {
        arraySplit:arraySplit,
        countSplits:countSplits,
        invCount:invCount,


    }

}
