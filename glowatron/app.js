var canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d"),
  toAngle = Math.PI/180,
    r = 0,
    g = 80,
    b = 120;

canvas.width = 450;
canvas.height = 450;

ctx.translate(225,225);
ctx.lineWidth = 50;
ctx.globalCompositeOperation = "lighter";
ctx.shadowBlur = 1; /* tweak this number */

var last = new Date().getTime();

function draw() {
  var now = new Date().getTime(),
    delta = (now - last)/30; // rotation speed

  window.requestAnimationFrame(draw);
  
  ctx.clearRect(-225,-225,450,450);
  ctx.save();
  
  ctx.rotate(r*toAngle);
  ctx.shadowColor = "#F00";
  ctx.strokeRect(-110,-110,200,200);

  ctx.rotate((g-r)*toAngle);
  ctx.shadowColor = "#0F0";
  ctx.strokeRect(-110,-110,200,200);

  ctx.rotate((b-r)*toAngle);
  ctx.shadowColor = "#00F";
  ctx.strokeRect(-110,-110,200,200);

  ctx.rotate((r-b)*toAngle);
  ctx.shadowColor = "pink";
  ctx.strokeRect(-100,-100,200,200);

  ctx.rotate((b-g)*toAngle);
  ctx.shadowColor = "aqua";
  ctx.strokeRect(-100,-100,200,200);

  ctx.rotate((b-g)*toAngle);
  ctx.shadowColor = "silver";
  ctx.strokeRect(-110,-110,200,200);

  ctx.restore();

  r += delta;
  g += delta * 2;
  b += delta * 0;
  last = now;
}

draw();

