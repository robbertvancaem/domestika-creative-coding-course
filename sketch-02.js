const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";

    const cx = width * 0.5;
    const cy = height * 0.5;

    const w = width * 0.01;
    const h = height * 0.01;

    const n = 320;
    const radius = width * 0.5;
    const slice = math.degToRad(360 / n);

    for (let i = 0; i < n; i++) {
      const angle = slice * i;

      const x = cx + radius * Math.sin(angle);
      const y = cy + radius * Math.cos(angle);

      // Drawing the 'ticks'
      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(1, 1);

      context.beginPath();
      context.rect(-w, -h, w, h);
      context.fill();
      context.restore();

      // Drawing the arcs
      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      const minR = radius * 0.1;
      context.lineWidth = random.range(width * 0.01, minR / n);

      const rgbR = random.range(0, 255);
      const rgbG = random.range(0, 255);
      const rgbB = random.range(0, 255);

      context.strokeStyle = `rgba(${rgbR}, ${rgbG}, ${rgbB})`;

      context.beginPath();
      const r = ((radius - minR) / n) * i + minR;
      context.arc(0, 0, r, 0, math.degToRad(random.range(180, 359)));
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
