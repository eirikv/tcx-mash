require('./less/styles.less');

const { get } = require('./utils/fetch-util');

const canvas = document.getElementById('heart-rate');
const ctx = canvas.getContext('2d');

const height = canvas.height;
const width = canvas.width;

ctx.translate(0, height);
ctx.scale(1, -1);

async function draw() {
  const tcx = await get('/tcx');

  const colors = ['red', 'blue'];

  tcx.plotPoints.forEach(trackpoints => {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.strokeStyle = colors.pop();

      trackpoints.forEach(({ point }) => {
        const x = point.x * width;
        const y = point.y * height;

        ctx.lineTo(x, y);
      });

      ctx.stroke();
      ctx.closePath();
  });
}

draw();
