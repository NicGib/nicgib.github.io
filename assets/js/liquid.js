class LiquidDivider {
  constructor(canvas, numPoints = 11) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.numPoints = numPoints;
    this.elasticity = 0.015; // originally 0.015
    this.friction = 0.05; // originally 0.1
    this.damping = 0.5; // dampen mouse influence, originally 0.3
    this.maxInfluence = 15; // originally 15

    this.width = window.innerWidth;
    this.height = canvas.height;
    this.segWidth = this.width / (this.numPoints - 1);
    this.colour = "#000000"; // black background
    this.mouse = { x: 0, y: 0, prevY: 0 };
    this.interactive = window.innerWidth >= 600;

    canvas.width = this.width;
    canvas.height = this.height;

    this.initPoints();
    this.animate = this.animate.bind(this);
    this.animate();

    if (this.interactive) {
      window.addEventListener("mousemove", this.handleMouseMove.bind(this));
    }

    window.addEventListener("resize", this.handleResize.bind(this));
  }

  initPoints() {
    this.points = [];
    for (let i = 0; i < this.numPoints; i++) {
      const baseHeight = this.interactive ? 0 : Math.sin(i / 2) * 10;
      this.points.push({ height: baseHeight, speed: 0, accel: 0 });
    }
  }

  // only react when mouse is over canvas surface
  handleMouseMove(e) {
    // check if canvas is set to be interactive before reacting
    if (!this.interactive) return;

    const mouseY = e.clientY;
    const mouseX = e.clientX;
    const rect = this.canvas.getBoundingClientRect();
    const yOnCanvas = mouseY - rect.top;

    if (yOnCanvas > 0 && yOnCanvas < this.height) {
      const index = Math.floor((mouseX / this.width) * this.numPoints);
      if (this.points[index]) {
        const dy = this.mouse.prevY - mouseY;
        const influence = Math.max(
          -this.maxInfluence,
          Math.min(this.maxInfluence, dy * this.damping)
        );
        this.points[index].height -= influence;
      }
    }

    this.mouse.prevY = mouseY;
  }

  handleResize() {
    this.width = window.innerWidth;
    this.canvas.width = this.width;

    // this.interactive = window.innerWidth >= 600;
    const wasInteractive = this.interactive;
    this.interactive = window.innerWidth >= 600;

    if (!this.interactive && wasInteractive) {
      // remove mouse event below 600px
      window.removeEventListener("mousemove", this.mouseHandler);
    } else if (this.interactive && !wasInteractive) {
      // re-add mouse event above 600px
      window.addEventListener("mousemove", this.mouseHandler);
    }

    this.segWidth = this.width / (this.numPoints - 1);
    this.initPoints();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const middleY = this.height / 2;

    // wave physics
    for (let i = 0; i < this.numPoints; i++) {
      const prev = this.points[i - 1] || this.points[i];
      const next = this.points[i + 1] || this.points[i];
      const point = this.points[i];

      if (this.interactive) {
        point.accel =
          (-0.3 * point.height +
            (prev.height - point.height) +
            (next.height - point.height)) *
            this.elasticity -
          point.speed * this.friction;
        point.speed += point.accel;
        point.height += point.speed;
      }
    }

    // draw smooth curve using cubic Bézier approximation (originally made as a Catmull-Rom spline)
    const pts = this.points.map((p, i) => ({
      x: i * this.segWidth,
      y: middleY + p.height
    }));

    this.ctx.beginPath();
    this.ctx.moveTo(pts[0].x, pts[0].y);

    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      // Catmull-Rom to Bezier conversion
      /*
        previously working in catmull-rom splines 
          (cubic-interpolating splines that have a curve that passes through their control points),
        now converting to four point (cubic) bezier curves that the canvas can work with
          (doesn't have to pass through the control points)
        
          p0 - p1 - p2 - p3
        
        cp1 is slightly ahead of p1, angled based on the direction from p0 to p2
        cp2 is just before p2, angled based on the direction from p1 to p3

        https://link.springer.com/article/10.1007/s42979-021-00770-x (see equation 15)
      */
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
    }

    // close the shape
    this.ctx.lineTo(this.width, this.height);
    this.ctx.lineTo(0, this.height);
    this.ctx.closePath();

    this.ctx.fillStyle = this.colour;
    this.ctx.fill();

    requestAnimationFrame(this.animate);
  }
}

// initialize on page load
window.addEventListener("load", () => {
  const canvas = document.getElementById("liquid-divider");
  new LiquidDivider(canvas);
});