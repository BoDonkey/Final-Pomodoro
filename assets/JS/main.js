var style = 'circle';
var sessionChange = true;
var work = true;
var currPerc = 0;
var originalTime = 1500;
var paused = true;
var secs = 3;
var count, timestring, worktime, breaktime, timer, currTime, canvo, ctx, centerx, centery, runMark;


$(document).ready(function () {
    canvo = document.querySelector("canvas");
    ctx = canvo.getContext("2d");
    centerx = canvo.width / 2;
    centery = canvo.height / 2;
    ctx.strokeStyle = '#aaa';
    ctx.lineWidth = 12;
    roundRect(ctx, 10, 10, canvo.width - 15, canvo.height - 15, 50);
    setOriginalTime();
    timeStamp();

    $(".dropdown").on("click", "li a", function (event) {
        style = $(this).attr("value");
        ctx.clearRect(0, 0, canvo.width, canvo.height);
        roundRect(ctx, 10, 10, canvo.width - 15, canvo.height - 15, 50);
    });
    
    $(canvo).click(function () {
        if (sessionChange == true) {
            setOriginalTime();
            sessionChange = false;
        }
        if (paused == true) {
            $('.dropdown-toggle').prop('disabled', true);
            paused = false;
            init();
        } else {
            clearInterval(runMark);
            $('.dropdown-toggle').prop('disabled', false);
            paused = true;
        }
    });

    $(".increment").click(function () {
        count = parseInt($("~ .count", this).text());
        if (paused == true) {
            sessionChange = true;
            if ($(this).hasClass("up")) {
                count = count + 1;
                $("~ .count", this).text(count);
            } else {
                var count = count - 1;
                $("~ .count", this).text(count);
            }
            setOriginalTime();
            timeStamp();

            $(this).parent().addClass("bump");

            setTimeout(function () {
                $(this).parent().removeClass("bump");
            }, 400);
        }
    });
});

function setOriginalTime() {
    worktime = document.getElementById("sessiontime").innerHTML;
    breaktime = document.getElementById("breaktime").innerHTML;
    if (work == true) {
        originalTime = worktime * 60;
    } else {
        originalTime = breaktime * 60;
    }
    currTime = originalTime;
}

function init() {
    console.log("initiated");
    runMark = setInterval(Countdown, 1000);
}

function Countdown() {
    if (work == true) {
        currPerc = 100 - ((currTime / originalTime) * 100);
    } else {
        currPerc = 0 + ((currTime / originalTime) * 100);
    }
    if (style == 'circle') {
        pickedCircle();
    } else if (style == 'pie') {
        pickedPie();
    } else {
        pickedArcs();
    }
    currTime = currTime - 1;
    if (currTime < 1) {
        work = !work;
        setOriginalTime();
    }
}

function pickedCircle() {
    ctx.fillStyle = "#11ff33";
    var rectPerc = 400 - (400 * currPerc / 100);
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.arc(centerx, centery, 200, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillRect(centerx - 200, centery - 200, 400, rectPerc);
    ctx.globalCompositeOperation = "source-over";
    timeStamp();
}

function pickedPie() {
    ctx.fillStyle = "#11ff33";
    var example = 2 * Math.PI * currPerc / 100;
    ctx.beginPath();
    ctx.moveTo(centerx, centery);
    ctx.arc(centerx, centery, 200, 0, example);
    ctx.closePath();
    ctx.fill();
    timeStamp();
}
//finish later
/*function pickedArcs() {
    ctx.fillStyle = "#000000";
    ctx.strokeStyle = "#11ff33";
    timeStamp();
    ctx.font = "20px Helvetica";
    ctx.clearRect(30,30,canvo.width - 50, canvo.height - 50)
    ctx.beginPath();
    //hrs
    ctx.arc(centerx, centery, 200, degToRad(280), degToRad((currhrs * 30) - 94));
    ctx.stroke();
    ctx.fillText("hrs", centerx, centery-190);
    //Minutes
    ctx.beginPath();
    ctx.arc(centerx, centery, 170, degToRad(282), degToRad((currmin * 6) - 94));
    ctx.stroke();
    ctx.fillText("min", centerx, centery - 160);
    //Seconds
    ctx.beginPath();
    ctx.arc(centerx, centery, 140, degToRad(285), degToRad((currsec * 6) - 94));
    ctx.stroke();
    ctx.fillText("sec", centerx, centery - 130);
   
}*/

function timeStamp() {
    currhrs = Math.floor(currTime / 3600);
    currmin = Math.floor((currTime % 3600) / 60);
    currsec = Math.floor((currTime % 3600) % 60);
    timestring = ((currhrs > 0) ? (currhrs + ":") : ("00:")) + ((currmin < 10) ? ("0") : ("")) + currmin + ":" + ((currsec < 10) ? ("0") : ("")) + currsec;
    $(".timer").text(timestring);
}

function degToRad(degree) {
    var factor = Math.PI / 180;
    return degree * factor;
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == "undefined") {
        stroke = true;
    }
    if (typeof radius === "undefined") {
        radius = 5;
    }
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (stroke) {
        ctx.stroke();
    }
    if (fill) {
        ctx.fill();
    }
}
