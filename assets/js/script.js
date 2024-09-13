// Image Fullscreen on Click when has "data-enlargable" attribute
// https://stackoverflow.com/questions/18545077/image-fullscreen-on-click/50430187#50430187
// Note: must be before cursor logic

$('img[data-enlargeable]').addClass('img-enlargeable').click(function() {
  var src = $(this).attr('src');
  var modal;

  function removeModal() {
    modal.remove();
    $('body').off('keyup.modal-close');

    // Reset cursor when modal is removed
        isLinkHovered = false; // Reset flag
        cursor.classList.remove('link');
        cursorwhite.classList.remove('link');
        // scale down
        TweenMax.to(cursor, 0.05, { width: 10, height: 10, ease: Power2.easeIn });
        TweenMax.to(cursorwhite, 0.2, { width: 20, height: 20, ease: Power2.easeIn });
        updateCursorPosition(); // Adjust position on size change
  }

  modal = $('<div>').css({
    // (puts image url in place of src)
    // [FIXED] NOTE: will not work if has certain special characters like a space, (, ), -
    // background: 'RGBA(0,0,0,.5) url(' + src + ') no-repeat center',
    // background: 'RGBA(235, 242, 250,.5) url(' + src + ') no-repeat center',
    background: 'url("' + src + '") no-repeat center, repeating-linear-gradient(45deg, RGBA(235, 242, 250,.7), RGBA(235, 242, 250,.7) 50px, RGBA(255, 255, 255, .7) 50px, RGBA(255, 255, 255, .7) 100px)',
    backgroundSize: 'contain',
    width: '100%',
    height: '100%',
    position: 'fixed',
    zIndex: '900',
    top: '0',
    left: '0',
    // cursor: 'zoom-out'
  }).click(function() {
    removeModal();
  }).appendTo('body');

  // Add a small 'x' button for closing
var closeButton;
closeButton = $('<div>')
  .addClass('closeButton')
  .text('✖') // "x" character
  .css({
    position: 'absolute',
    top: 'calc(50% - 15px)',
    right: '30px',
    fontSize: '30px',
    color: '#ECF2F9',
    zIndex: '901', // Ensures the "x" stays on top of the image
    width: '50px',
    height: '50px',
    paddingBottom: '2px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Black circle with 50% opacity
    borderRadius: '50%', // Makes it a circle
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center' // Centers the "x" inside the circle
  }).click(function() {
    removeModal();
  }).appendTo(modal);

  //handling ESC
  $('body').on('keyup.modal-close', function(e) {
    if (e.key === 'Escape') {
      removeModal();
    }
  });
});


// Custom Cursor Logic

const cursor = document.querySelector(".cursor");
const cursorwhite = document.querySelector(".cwhite");

let mouseX = 0;
let mouseY = 0;
let isLinkHovered = false; // Track if a link is hovered

// Move cursor as mouse moves
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    updateCursorPosition();
});

// Update cursor position on scroll
document.addEventListener("scroll", updateCursorPosition);

function updateCursorPosition() {
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    // Adjust position to keep cursor centered
    const cursorWidth = cursor.offsetWidth / 2;
    const cursorHeight = cursor.offsetHeight / 2;

    cursor.style.left = (mouseX + scrollX) + 'px';
    cursor.style.top = (mouseY + scrollY) + 'px';
    cursorwhite.style.left = (mouseX + scrollX) + 'px';
    cursorwhite.style.top = (mouseY + scrollY) + 'px';
}

// add different classes on events
// classes for general links (all a and enlargable images)
const links = document.querySelectorAll("a, .img-enlargeable, button, .closeButton");
document.addEventListener("mouseover", (event) => {
   if (event.target.closest("a, .img-enlargeable, button, .closeButton")) {
       isLinkHovered = true; // Set flag to indicate a link is hovered
       cursor.classList.add('link');
       cursorwhite.classList.add('link');
       // scale up
       TweenMax.to(cursor, 0.05, { width: 60, height: 60, ease: Power4.easeOut });
       TweenMax.to(cursorwhite, 0.4, { width: 70, height: 70, ease: Power4.easeOut });
       updateCursorPosition(); // Adjust position on size change
   }
});
document.addEventListener("mouseout", (event) => {
   if (event.target.closest("a, .img-enlargeable, button, .closeButton")) {
       isLinkHovered = false; // Reset flag when leaving a link
       cursor.classList.remove('link');
       cursorwhite.classList.remove('link');
       // scale down
       TweenMax.to(cursor, 0.05, { width: 10, height: 10, ease: Power2.easeIn });
       TweenMax.to(cursorwhite, 0.2, { width: 20, height: 20, ease: Power2.easeIn });
       updateCursorPosition(); // Adjust position on size change
   }
});

/* This way doesn't update for dynamically created links. */
// links.forEach((link) => {
//    link.addEventListener("mouseover", () => {
//         isLinkHovered = true; // Set flag to indicate a link is hovered
//         cursor.classList.add('link');
//         cursorwhite.classList.add('link');
//         //scale up
//         TweenMax.to(cursor, 0.05, { width: 60, height: 60, ease: Power4.easeOut });
//         TweenMax.to(cursorwhite, 0.4, { width: 70, height: 70, ease: Power4.easeOut });
//         updateCursorPosition(); // Adjust position on size change
//    })
//    link.addEventListener("mouseout", () => {
//         isLinkHovered = false; // Reset flag when leaving a link
//         cursor.classList.remove('link');
//         cursorwhite.classList.remove('link');
//         //scale down
//         TweenMax.to(cursor, 0.05, { width: 10, height: 10, ease: Power2.easeIn });
//         TweenMax.to(cursorwhite, 0.2, { width: 20, height: 20, ease: Power2.easeIn });
//         updateCursorPosition(); // Adjust position on size change
//    })
// })

// Scale up on mouse press (mousedown), scale down on release (mouseup)
document.addEventListener("mousedown", () => {
    if (isLinkHovered) {
        // Custom scaling for links on mousedown
        TweenMax.to(cursor, 0.05, { width: 70, height: 70, ease: Power4.easeOut });
        TweenMax.to(cursorwhite, 0.4, { width: 80, height: 80, ease: Power4.easeOut });
    } else {
        TweenMax.to(cursor, 0.05, { width: 30, height: 30, ease: Power4.easeOut });
        TweenMax.to(cursorwhite, 0.4, { width: 40, height: 40, ease: Power4.easeOut });
        updateCursorPosition(); // Adjust position during size change
    }
});
document.addEventListener("mouseup", () => {
    if (isLinkHovered) {
        // Return to hover size after releasing click on a link
        TweenMax.to(cursor, 0.1, { width: 60, height: 60, ease: Power2.easeIn });
        TweenMax.to(cursorwhite, 0.2, { width: 70, height: 70, ease: Power2.easeIn });
    } else {
        // Return to default size after releasing click outside of links
        TweenMax.to(cursor, 0.1, { width: 10, height: 10, ease: Power2.easeIn });
        TweenMax.to(cursorwhite, 0.2, { width: 20, height: 20, ease: Power2.easeIn });
    }
    updateCursorPosition(); // Adjust position during size change
});


// Flag to track the current mode (desktop or mobile)
let isMobileMode = false;
let animationFrames = []; // Array to store active animation frame IDs for mobile animations

// Title Parallax Effect for desktop (mousemove-based)
function initParallax() {
    $("#titleParallax-container").mousemove(function(e) {
        parallaxIt(e, ".tP1", 0);
        parallaxIt(e, ".tP2", 50);
        parallaxIt(e, ".tP3", -50);
    });

    function parallaxIt(e, target, movement) {
        var $this = $("#titleParallax-container");
        var relX = e.pageX - $this.offset().left;
        var relY = e.pageY - $this.offset().top;

        TweenMax.to(target, 1, {
            x: (relX - $this.width() / 2) / $this.width() * movement,
            y: (relY - $this.height() / 2) / $this.height() * movement
        });
    }
}

// Looping Circular Animation for Mobile Devices with Clockwise and Counterclockwise Motion
function circularMotion(target, radius, speed, direction, startAngle) {
    let angle = startAngle; // Initialize angle

    function animate() {
        angle += direction * (0.01 + speed); // Increment or decrement angle based on direction (+1 for clockwise, -1 for counterclockwise)
        const x = radius * Math.cos(angle); // Calculate x position using cosine
        const y = radius * Math.sin(angle); // Calculate y position using sine

        TweenMax.set(target, { x: x, y: y }); // Move the element in a circular path
        const frameId = requestAnimationFrame(animate); // Continue the animation loop

        // Store the frame ID to allow for later cancellation
        animationFrames.push(frameId);
    }

    animate(); // Start the animation loop
}

function initParallaxMobile() {
    // tP2 moves counterclockwise (negative direction)
    circularMotion(".tP2", 10, 0, -1, 0); // target (tP2), radius, speed, direction, startAngle 
    // tP3 moves clockwise (positive direction)
    circularMotion(".tP3", 10, 0.005, -1, 180); // target (tP3), radius, speed, direction, startAngle
}

//Cancellation & Switching Parallax Modes

// Stop the circular motion animations when switching modes
function stopCircularMotion() {
    animationFrames.forEach(frameId => cancelAnimationFrame(frameId)); // Cancel all stored animation frames
    animationFrames = []; // Clear the stored frame IDs
}

// Clean up event listeners or animations from the previous mode
function clearParallax() {
    $("#titleParallax-container").off("mousemove"); // Stop listening for mousemove on desktop mode
    TweenMax.killAll(); // Kill all TweenMax animations to stop any ongoing animations
    stopCircularMotion(); // Stop circular motion animations if they are running
}

// Mobile Detection
function isMobile() {
    return window.matchMedia("(max-width: 767px)").matches;
}

// Initialize Parallax Based on Current Window Size
function initParallaxBasedOnWindowSize() {
    const currentIsMobile = isMobile();

    if (currentIsMobile && !isMobileMode) {
        // Switch to mobile mode if it's currently mobile and not already in mobile mode
        clearParallax();  // Clear any previous desktop parallax
        initParallaxMobile();  // Start mobile circular animations
        isMobileMode = true;
    } else if (!currentIsMobile && isMobileMode) {
        // Switch to desktop mode if it's currently desktop and not already in desktop mode
        clearParallax();  // Clear any previous mobile animations
        initParallax();  // Start desktop parallax animations
        isMobileMode = false;
    } else if (!currentIsMobile && !isMobileMode) {
        // Ensure desktop parallax starts properly if already in desktop mode
        initParallax();
    }
}

// Initialize intro animations with smoother transitions
function initIntroAnimations() {
    // Set initial offscreen positions and opacity
    TweenMax.set(".tP1", { x: "100vw", y: "0px", opacity: 0, force3D: true });
    TweenMax.set(".tP2", { x: "100vw", y: "0px", opacity: 0, force3D: true }); // Adjust offset as needed
    TweenMax.set(".tP3", { x: "100vw", y: "0px", opacity: 0, force3D: true }); // Adjust offset as needed

    // Animate to their normal positions with easing and opacity fade-in
    TweenMax.to(".tP1", 1.5, { x: "0px", y: "0px", opacity: 1, ease: Power3.easeOut, delay: 0.4, force3D: true });
    TweenMax.to(".tP2", 1.5, { x: "0px", y: "0px", opacity: 1, ease: Power3.easeOut, delay: 0.8, force3D: true }); // Adjust delay as needed
    TweenMax.to(".tP3", 1.5, { x: "0px", y: "0px", opacity: 1, ease: Power3.easeOut, delay: 1.2, force3D: true }); // Adjust delay as needed
}

// Ensure initialization when document is ready
$(document).ready(function() {
    initParallaxBasedOnWindowSize(); // Set up the initial parallax mode based on window size
    initIntroAnimations(); // Start the intro animations for tP1, tP2, and tP3
});

// Handle Window Resize Event to Switch Modes
$(window).resize(function() {
    initParallaxBasedOnWindowSize(); // Recheck window size on resize and switch modes if necessary
});

// .landingLogo color change on scroll

$(window).scroll(function(){
    var landingLogo = $(".landingLogo");
    var landingLogoHidden = $(".landingLogoHidden");

    var landingBody = $("#blackHomeContainer");

    if (landingLogo.length && landingBody.length) { //If landingLogo & landingBody exist:
        var fixed_position = landingLogo.offset().top;
        var fixed_height = landingLogo.height();

        var toCross_position = landingBody.offset().top;
        var toCross_height = landingBody.height();

        if (fixed_position + fixed_height < toCross_position) {
            //landingLogo.removeClass('invertLogo');
            landingLogo.css("visibility", "visible");
            landingLogoHidden.css("visibility", "hidden");
        } else if (fixed_position > toCross_position + toCross_height) {
            //landingLogo.removeClass('invertLogo');
            landingLogo.css("visibility", "visible");
            landingLogoHidden.css("visibility", "hidden");
        } else {
            //landingLogo.addClass('invertLogo');
            landingLogo.css("visibility", "hidden");
            landingLogoHidden.css("visibility", "visible");
        }
    }

});


//Footer Hide & Back To Top
let mybutton = document.getElementById("myBtn");
let isHomeFooter = document.getElementsByClassName('fhider');

window.onscroll = function() {myFunction()};

function myFunction() {
    //Footer Hide
    if (isHomeFooter.length > 0) { //If page has the home footer
      if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        document.getElementById("fhiderid").style.zIndex = "-4";
        document.getElementById("footerid").style.zIndex = "2";
      } else {
        document.getElementById("fhiderid").style.zIndex = "-1";
        document.getElementById("footerid").style.zIndex = "-2";
      }
    }

    //Back to top button
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        /*mybutton.style.display = "flex";*/
        /*mybutton.style.justify-content = "center";
        mybutton.style.align-items = "center";*/
        mybutton.style.opacity = "1"
    } else {
        /*mybutton.style.display = "none";*/
        mybutton.style.opacity = "0"
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    /*document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;*/
    window.scrollTo({top: 0, behavior: 'smooth'});
}



