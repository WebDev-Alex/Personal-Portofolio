const $ = (id) => document.getElementById(id);
var position = 0;

const rotate_the_circle = (side) => {
  position += side;
  $("circle").style.transform = `translate(-50%) rotate(${position}deg)`;
};

const am = () => {
  autoMove = setInterval(f, 250);
};

//Added fallback for events
var upEvent, downEvent;
if (
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0
) {
  // Touch Events Supported
  downEvent = "touchstart";
  upEvent = "touchend";
} else {
  //mouse is here
  downEvent = "mousedown";
  upEvent = "mouseup";
}

//copied & edited. Mouse Hold for buttons.
var right_timer;
$("right_button").addEventListener(upEvent, function () {
  clearInterval(right_timer);
  am();
  //Clear timeout
  return false;
});
$("right_button").addEventListener(downEvent, function () {
  //Set timeout
  clearInterval(autoMove);
  intervalTimer(0.05);
  clearInterval(right_timer);
  right_timer = setInterval(function () {
    rotate_the_circle(-1);
  }, 50);
  return false;
});

var left_timer;
$("left_button").addEventListener(upEvent, function () {
  clearInterval(left_timer);
  am();
  //Clear timeout
  return false;
});
$("left_button").addEventListener(downEvent, function () {
  //Set timeout
  clearInterval(autoMove);
  intervalTimer(0.05);
  left_timer = setInterval(function () {
    rotate_the_circle(1);
  }, 50);
  return false;
});
//

//Function for auto movement of the stars.
function f() {
  intervalTimer(1);
  rotate_the_circle(-0.25);
}
//the interval for the stars movement.
var autoMove = setInterval(f, 250);
//The interval transition for the stars movement.
function intervalTimer(t) {
  $("circle").style.transition = `transform ${t}s`;
}

function createStars() {
  //Creating a star
  let star = document.createElement("div");
  $("circle").appendChild(star);
  star.classList = "star";
  //The x and y position of the star.
  let left_p = Math.floor(Math.random() * $("circle").offsetWidth);
  let right_p = Math.floor(Math.random() * $("circle").offsetHeight);
  //Positioning.
  star.style.left = left_p + "px";
  star.style.top = right_p + "px";
  //Adding the size of the stars.
  let dimension = Math.floor(Math.random() * 5);
  star.style.width = dimension + "px";
  star.style.height = dimension + "px";
}

window.onload = function () {
  document.body.style.opacity = "1"
  //Creating all the stars.
  for (let k = 0; k < 150; k++) {
    createStars();
  }

  $("astronaut").addEventListener("click", function () {
    open_page("container");
  });
  $("sattelite").addEventListener("click", function () {
    open_page("cards-container");
  });
  $("moon").addEventListener("click", function () {
    open_page("contact-container");
  });
  $("contact-x").addEventListener("click", function () {
    open_page("contact-container");
  });
  $("dim2").addEventListener("click", rev_cols);
  $("alien_ship").addEventListener("click", random_Q, { once: true });

  $("circle").addEventListener("click", function () {
    clearInterval(left_timer);
    clearInterval(right_timer);
    clearInterval(autoMove);
    am();
  });
  //Wheel event for page rotation
  $("main").addEventListener("wheel", function (evt) {
    clearInterval(autoMove);
    intervalTimer(0.35);
    clearInterval(right_timer);
    clearInterval(left_timer);
    rotate_the_circle(Math.floor(-3 * (evt.deltaY / 100)));
  });
};

//Opening and closing the pages( Skills, About and Contact )
function open_page(page) {
  if ($(page).style.display == "block") {
    $("main").style.display = "block";
    $(page).style.display = "none";
    $(page).style.transform = "scale(0)";
  } else {
    $("main").style.display = "none";
    $(page).style.display = "block";
    setTimeout(function () {
      $(page).style.transform = "scale(1)";
    }, 250);
  }
}

function rev_cols() {
  if ($("main").style.filter == "hue-rotate(100deg)") {
    $("main").style.filter = "hue-rotate(0deg)";
  } else {
    $("main").style.filter = "hue-rotate(100deg)";
  }
}

const quotes = [
  [
    "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    "Nelson Mandela"
  ],
  ["The way to get started is to quit talking and begin doing.", "Walt Disney"],
  [
    "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    "oprah Winfrey"
  ],
  [
    "Always remember that you are absolutely unique. Just like everyone else.",
    "Margaret Mead"
  ],
  [
    "The future belongs to those who believe in the beauty of their dreams.",
    "Eleanor Roosevelt"
  ],
  [
    "You will face many defeats in life, but never let yourself be defeated.",
    "Maya Angelou"
  ],
  [
    "Many of life's failures are people who did not realize how close they were to success when they gave up.",
    "Thomas A. Edison"
  ],
  ["The only impossible journey is the one you never begin.", "Tony Robbins"],
  ["Only a life lived for others is a life worthwhile.", "Albert Einstein"],
  ["You only live once, but if you do it right, once is enough.", "Mae West"],
  [
    "Go confidently in the direction of your dreams! Live the life you've imagined.",
    "Henry David Thoreau"
  ],
  ["Be yourself; everyone else is already taken.", "Oscar Wilde"],
  ["Be the change that you wish to see in the world.", "Mahatma Gandhi"],
  ["Always forgive your enemies; nothing annoys them so much.", "Oscar Wilde"],
  [
    "To live is the rarest thing in the world. Most people exist, that is all.",
    "Oscar Wilde"
  ]
];

function random_Q() {
  let ranQ = Math.floor(Math.random() * quotes.length);
  $("quotes_page").style.display = "block";
  $("quotes_page").innerHTML =
    quotes[ranQ][0] +
    " - <span style = 'font-size:85%'>" +
    quotes[ranQ][1] +
    "</span>";
  setTimeout(function () {
    $("quotes_page").style.display = "none";
    $("alien_ship").addEventListener("click", random_Q, { once: true });
  }, 5000);
}

function go_to(x) {
  position = x;
  rotate_the_circle(0);
  clearInterval(autoMove);
  intervalTimer(1);
}