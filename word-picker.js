var words = [
    'coffee',
    'tea',
    'cheese',
    'cotton',
    'wool',
    'pharmacy',
    'train',
    'glasses',
    'paper',
    'origami',
    'glass'
];


//Values we use for timeouts
var toVals = [10, 15, 20, 25, 30, 40, 50, 60, 80, 100, 120, 150, 180, 220, 260];

var cont = document.getElementById('cont');
cont.onclick = function (event) {
    if (!event) event = window.event;

    //Kill any current timeouts and start afresh if it is already in motion.
    if (timer) {
        clearTimeout(timer);
        currentToVal = -1;
    }
    //Start the motion
    words = shuffleArray(words);
    
    flip();

}

var timer = null;
var currentToVal = -1;
var currentNum = 0;

function flip() {
    currentToVal++;
    //If there are no more toVals we have reached the last interval.
    if (!toVals[currentToVal]) {
        var words2 = [];
        for (var n = 0; n < words.length; n++) {
            if (words[n] != currentNum) words2.push(words[n]);
        }
        words = words2;
        currentToVal = -1;
        timer = null;
    }
    //Otherwise call the timeout again with the next timeout value from toVals.
    else {
        timer = setTimeout(function () {
            flip();
        }, toVals[currentToVal]);
        currentNum = words[currentToVal % words.length];
        document.getElementById('words').innerHTML = (currentNum) ? currentNum : '&#x263a;';
    }
}


/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 * http://stackoverflow.com/a/12646864
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
