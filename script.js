const heartMap = [
  [0,1,0,0,0,1,0],
  [1,1,1,0,1,1,1],
  [1,1,1,1,1,1,1],
  [0,1,1,1,1,1,0],
  [0,0,1,1,1,0,0],
  [0,0,0,1,0,0,0],
];

function checkAnswer() {
  const ans = document.getElementById("answer").value.toLowerCase().trim();
  if (ans === "halwa") {
    document.getElementById("unlock").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    document.getElementById("bg-music").play();
    startGame();
  } else {
    document.getElementById("error").innerText = "Wrong answer 😛 Try again!";
  }
}

let images = [
  "images/pic1.jpeg","images/pic1.jpeg",
  "images/pic2.jpeg","images/pic2.jpeg",
  "images/pic3.jpeg","images/pic3.jpeg",
  "images/pic4.jpeg","images/pic4.jpeg",
  "images/pic5.jpeg","images/pic5.jpeg",
  "images/pic6.jpeg","images/pic6.jpeg",
  "images/pic7.jpeg","images/pic7.jpeg",
  "images/pic8.jpeg","images/pic8-1.jpeg",
  "images/pic9.jpeg","images/pic9.jpeg",
  "images/pic10.jpeg","images/pic10-1.jpeg"
];

const cardData = [
  { img: "pic1.jpg", matchGroup: "a" },
  { img: "pic2.jpg", matchGroup: "b" },
  { img: "pic3.jpg", matchGroup: "c" },
  { img: "pic4.jpg", matchGroup: "d" },
  { img: "pic5.jpg", matchGroup: "e" },
  { img: "pic6.jpg", matchGroup: "f" },
  { img: "pic7.jpg", matchGroup: "g" },
  { img: "pic8.jpg", matchGroup: "h" },
  { img: "pic8-1.jpg", matchGroup: "h" },
  { img: "pic9.jpg", matchGroup: "i" },
  { img: "pic10.jpg", matchGroup: "j" },
  { img: "pic10-1.jpg", matchGroup: "j" }
  // ... continue for all 15 images
];


let first = null, second = null, lock = false, matched = 0;

function startGame() {
  images.sort(() => 0.5 - Math.random());
  const board = document.getElementById("game-board");
  board.innerHTML = "";

  let imgIndex = 0;

  for (let r = 0; r < heartMap.length; r++) {
    for (let c = 0; c < heartMap[r].length; c++) {
      if (heartMap[r][c] === 1) {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <div class="card-inner">
            <div class="card-front">
              <img src="${images[imgIndex]}">
            </div>
            <div class="card-back">❤️</div>
          </div>
        `;
        card.onclick = () => flip(card);
        board.appendChild(card);
        imgIndex++;
      } else {
        // Add an invisible placeholder to keep grid spacing
        const placeholder = document.createElement("div");
        placeholder.style.width = "80px";
        placeholder.style.height = "80px";
        placeholder.style.visibility = "hidden";
        board.appendChild(placeholder);
      }
    }
  }
}


function flip(card) {
  if (lock || card === first || card.classList.contains("matched")) return;

  card.classList.add("flip");

  if (!first) {
    first = card;
  } else {
    second = card;
    lock = true;

    // Check if they can match
    const canMatch = first.dataset.match === second.dataset.match;

    if (canMatch) {
      first.classList.add("matched");
      second.classList.add("matched");
      popHearts(first);
      popHearts(second);
      matched++;
    } else {
      // Not a match: flip back after delay
      setTimeout(() => {
        first.classList.remove("flip");
        second.classList.remove("flip");
      }, 800);
    }

    setTimeout(() => {
      reset();
      // Check if all matched
      if (matched === cardData.length / 2) {
        document.getElementById("game-board").classList.add("hidden");
        document.getElementById("question").classList.remove("hidden");
      }
    }, 900);
  }
}

function reset() {
  [first, second, lock] = [null, null, false];
}


function popHearts(card) {
  const rect = card.getBoundingClientRect();
  for (let i = 0; i < 5; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "💖";
    heart.style.left = rect.left + 40 + "px";
    heart.style.top = rect.top + 40 + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  }
}


function reset() {
  [first, second, lock] = [null, null, false];
}
