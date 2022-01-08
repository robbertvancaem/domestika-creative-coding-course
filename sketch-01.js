const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    // background
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.01;

    const drawRandomGrid = () => {
      // Loops
      const w = width * 0.1;
      const h = w;
      const gap = width * 0.03;
      const columns = 5;
      const rows = columns;
      const ix = width * 0.17;
      const iy = height * 0.17;

      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          const x = ix + (w + gap) * i;
          const y = iy + (h + gap) * j;

          // Rectangle
          context.beginPath();
          context.rect(x, y, w, h);
          context.stroke();

          // Randomly decide whether to draw circles or not
          if (Math.random() > 0.5) {
            context.beginPath();
            context.fillStyle = "black";
            context.arc(x + h / 2, y + h / 2, w / 2, 0, Math.PI * 2);
            context.fill();
          }
        }
      }
    };
    drawRandomGrid();
  };
};

canvasSketch(sketch, settings);
