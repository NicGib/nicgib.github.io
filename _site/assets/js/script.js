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