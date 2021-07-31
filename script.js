const cursor = document.querySelector(".cursor")

// move cursor as mouse move
document.addEventListener("mousemove", (e) => {
   cursor.style.left = e.pageX + 'px'
   cursor.style.top = e.pageY + 'px'
})

const cursorwhite = document.querySelector(".cwhite")

// move white cursor as mouse move
document.addEventListener("mousemove", (e) => {
   cursorwhite.style.left = e.pageX + 'px'
   cursorwhite.style.top = e.pageY + 'px'
})

// add different classes on events
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


window.onscroll = function() {myFunction()};

function myFunction() {
  if (document.body.scrollTop > 550 || document.documentElement.scrollTop > 550) {
    document.getElementById("fhiderid").style.zIndex = "-4";
    document.getElementById("footerid").style.zIndex = "2";
  } else {
    document.getElementById("fhiderid").style.zIndex = "-1";
    document.getElementById("footerid").style.zIndex = "-2";
  }
}