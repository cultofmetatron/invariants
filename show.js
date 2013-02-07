module.exports = function() {

    var clickable = "clicked";

    var clickme = function(msg) {
        clickable = msg;

    }
    var showclickable = function() {
        return clickable;
    }

    return {
        clickme: clickme,
        showme: showclickable,
    }



}
