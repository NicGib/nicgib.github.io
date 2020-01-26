/*TYMPANUS EXAMPLE https://tympanus.net/codrops/2019/01/31/custom-cursor-effects/*/


// set the starting position of the cursor outside of the screen
paper.install(window);
with (paper) {
  let clientX = -100;
  let clientY = -100;
  const innerCursor = document.querySelector(".cursor--small");
  const innerCursor2 = document.querySelector(".cursor--medium");

  const initCursor = () => {
    // add listener to track the current mouse position
    document.addEventListener("mousemove", e => {
      clientX = e.clientX;
      clientY = e.clientY;
    });

    // transform the innerCursor to the current mouse position
    // use requestAnimationFrame() for smooth performance
    const render = () => {
      innerCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
      // if you are already using TweenMax in your project, you might as well
      // use TweenMax.set() instead
      // TweenMax.set(innerCursor, {
      //   x: clientX,
      //   y: clientY
      // });

      requestAnimationFrame(render);
    };
    const render2 = () => {
      innerCursor2.style.transform = `translate(${clientX}px, ${clientY}px)`;
      // if you are already using TweenMax in your project, you might as well
      // use TweenMax.set() instead
      // TweenMax.set(innerCursor2, {
      //   x: clientX,
      //   y: clientY
      // });

      requestAnimationFrame(render2);
    };
    requestAnimationFrame(render);
    requestAnimationFrame(render2);
  };

  initCursor();
}
