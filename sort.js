module.exports = function(collection, compare) {
    var comparefunc = compare;
    var collection = collection;
    var sortedCollection;

    //splits an array into n/2 and n/2(+1 if odd)
    var arraySplit = function(list) {
        if (list.length <= 1) {
            return list
        }
        var n = list.length;
        var pivot = parseInt(n/2);
        var leftNode = [];
        var rightNode = [];

        for (i = 0; i<n ; i++ ) {
            if (i < pivot) {
                leftNode.push(list[i])
            } else {
                rightNode.push(list[i])
            }
        }
        return {
            left: leftNode,
            right: rightNode

        }
    }


    // the merge merges two SORTED arrays
    var merge = function(list1, list2) {
        /*assume that the lists are sorted and we
         * merge the two values. then we return the merged set*/
        var newList = [];
        // lets get rid of an empty list straight away
        if ((list1.length === 0) || (list2.length === 0)) {
            if (list1.length != 0) {
                return list1;
            }
            if (list2.length != 0) {
                return list2;
            }
                return [];
        }

        // now we know neither are empty, lets merge them!
        var tracker_1 = 0;
        var tracker_2 = 0;

        while((tracker_1 < list1.length) && (tracker_2  < list2.length)) {
            //until one of the arrays is out of numbers
            if ((comparefunc(list1[tracker_1], list2[tracker_2]) < 0)) {
               //push smaller number onto the newlist
                newList.push(list1[tracker_1]);
                tracker_1 = tracker_1 + 1;
            } else if ((comparefunc(list1[tracker_1], list2[tracker_2]) == 0)  ) { //if both are equal
                newList.push(list1[tracker_1]);
                newList.push(list2[tracker_2]);
                tracker_2 = tracker_2 + 1;
                tracker_1 = tracker_1 + 1;

            }  else if ((comparefunc(list1[tracker_1], list2[tracker_2]) > 0)  ) { //if both are equal
                newList.push(list2[tracker_2]);
                tracker_2 = tracker_2+1;
            }
            console.log("tracker_1: " + list1[tracker_1]);
            console.log("tracker_2: " + list2[tracker_2]);
        }
        //now we load the remaining numbers from the remaining list
        while (tracker_1 < list1.length) {
            newList.push(list1[tracker_1]);
            tracker_1 = tracker_1 + 1;
        };
        while (tracker_2 < list2.length) {
            newList.push(list2[tracker_2]);
            tracker_2 = tracker_2 + 1;
        }
        console.log(newList);
        return newList;
    }


    var mergeSort = function(collec) {
        //TODO: the final merge section
        //check if the collection is 1 element
        if (collec.length <= 1) {
            return collec
        } else {
        //split the tree in half and call merge on both sides
            var split = arraySplit(collec);
            var sorted = merge(mergeSort(split.left),mergeSort(split.right))
            return sorted;
        }
    }

    var value = function() {
        if (sortedCollection != null) {
            sortedCollection = mergeSort(comparefunc, collection);
        }
        return sortedCollection;
    }

    //actual function begins here
    sortedCollection = mergeSort(comparefunc, collection);

    return {
        value: value,
        merge:merge,
        arraySplit:arraySplit,
        mergeSort:mergeSort

    }


}
