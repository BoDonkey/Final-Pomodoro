function pickedCircle() {
    var pst = 0,
        dlt = 2;

    ctx.fillStyle = "#28f";

    function drawCircle(ctx, x, y, radius, percent) {

        var o = radius * 2,
            h = o - (o * percent / 100);

        ctx.globalCompositeOperation = "source-over"; // make sure we have default mode
        ctx.beginPath(); // fill an arc
        ctx.arc(x, y, radius, 0, 6.28);
        ctx.fill();

        ctx.globalCompositeOperation = "destination-out"; // mode to use for next op.
        ctx.fillRect(x - radius, y - radius, o, h); // "clear" part of arc
        ctx.globalCompositeOperation = "source-over"; // be polite, set default mode back
    }

    (function loop() {
        ctx.clearRect(0, 0, 500, 500);
        drawCircle(ctx, 70, 70, 60, pst);
        pst += dlt;
        if (pst <= 0 || pst >= 100) dlt = -dlt;
        requestAnimationFrame(loop);
    })();
}

function pickedPie() {
    var pst = 0,
        dlt = 2;

    ctx.fillStyle = "#28f";

    function drawPie(ctx, x, y, radius, percent) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, radius, 0, 2 * Math.PI * percent / 100);
        ctx.fill();
    }

    (function loop() {
        ctx.clearRect(0, 0, 500, 500);
        drawPie(ctx, 70, 70, 60, pst);
        pst += dlt;
        if (pst <= 0 || pst >= 100) dlt = -dlt;
        requestAnimationFrame(loop);
    })();
}