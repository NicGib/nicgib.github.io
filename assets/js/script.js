const cursor = document.querySelector(".cursor");
const cursorwhite = document.querySelector(".cwhite");

let mouseX = 0;
let mouseY = 0;

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
    cursor.style.left = (mouseX + scrollX) + 'px';
    cursor.style.top = (mouseY + scrollY) + 'px';
    cursorwhite.style.left = (mouseX + scrollX) + 'px';
    cursorwhite.style.top = (mouseY + scrollY) + 'px';
}

// add different classes on events
// classes for general links (all a)
const links = document.querySelectorAll("a")
links.forEach((link) => {
   link.addEventListener("mouseover", () => {
      cursor.classList.add('link');
      cursorwhite.classList.add('link');
   })
   link.addEventListener("mouseout", () => {
      cursor.classList.remove('link');
      cursorwhite.classList.remove('link');
   })
})



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



//Footer Hide & Back To Top
let mybutton = document.getElementById("myBtn");

let isHomeFooter = document.getElementsByClassName('fhider');

window.onscroll = function() {myFunction()};

function myFunction() {
    //Footer Hide
    if (isHomeFooter.length > 0) { //If page is has the home footer
      if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
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