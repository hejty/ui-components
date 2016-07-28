import ConicGradient from './vendor/conic-gradient.js';
import easeInOutQuad from './ease-in-out-quad';

class DoughnutProgressBar {
  constructor({innerR, outerR, colorStart, colorEnd, percentage, element, duration = 300, fillColor = 'white',
    gradientSize = 120}) {
    this.gradient = this._generateBackground({colorStart, colorEnd, innerR, outerR, fillColor, gradientSize});

    this.size = outerR * 2;

    this.element = element;
    this.element.width = outerR * 2;
    this.element.height = outerR * 2;
    this.element.style.borderRadius = '50%';

    this.ctx = this.element.getContext('2d');
    this.ctx.fillStyle = fillColor;

    this.duration = duration;

    this.percentage = percentage;
    this._draw();
  }

  _generateBackground({colorStart, colorEnd, innerR, outerR, fillColor, gradientSize}) {
    const gradient = new ConicGradient({
      stops: `${colorStart}, ${colorEnd}`,
      size: gradientSize
    });

    const offscreen = document.createElement('canvas');
    const osCtx = offscreen.getContext('2d');

    offscreen.width = outerR * 2;
    offscreen.height = outerR * 2;

    //outer ring
    osCtx.beginPath();
    osCtx.arc(offscreen.width / 2, offscreen.height / 2, offscreen.height / 2 + 2, 0, Math.PI * 2, false);
    osCtx.clip();

    //gradient
    osCtx.drawImage(gradient.canvas, 0, 0, offscreen.width, offscreen.height);

    //inner ring
    osCtx.fillStyle = fillColor;
    osCtx.beginPath();
    osCtx.moveTo(offscreen.width / 2, offscreen.height / 2);
    osCtx.arc(offscreen.width / 2, offscreen.height / 2, innerR, 0, Math.PI * 2, false);
    osCtx.fill();

    return offscreen;
  }

  _draw() {
    const deg = this.percentage / 100 * 360;
    const start = ((-90 + deg) / 360) * (Math.PI * 2);
    const end = Math.PI * 1.5;

    this.ctx.drawImage(this.gradient, 0, 0, this.size, this.size);

    this.ctx.beginPath();
    this.ctx.moveTo(this.size / 2, this.size / 2);
    // Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
    this.ctx.arc(this.size / 2, this.size / 2, this.size / 2 + 2, start, end, false);
    this.ctx.fill();
  }

  setPercentage(endPercentage, finishCallback) {
    const distance = endPercentage - this.percentage;
    const startPercentage = this.percentage;
    const timeStep = 1 / (this.duration / 16);
    let t = 0;

    const drawFrame = function() {
      t += timeStep;

      if (t < 1) {
        this.percentage = startPercentage + easeInOutQuad(t) * distance;
        this._draw();

        requestAnimationFrame(drawFrame);
      } else {
        this.percentage = endPercentage;
        this._draw();

        if (typeof finishCallback === 'function') {
          finishCallback();
        }
      }
    }.bind(this);

    requestAnimationFrame(drawFrame);
  }
}

export default DoughnutProgressBar;
