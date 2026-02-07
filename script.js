const heartMap = [
  [0,1,0,0,0,1,0],
  [1,0,1,0,1,0,1],
  [1,0,0,1,0,0,1],
  [0,1,0,0,0,1,0],
  [0,0,1,0,1,0,0],
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
  "images/pic8.jpeg","images/pic8.jpeg",
  "images/pic9.jpeg","images/pic9.jpeg",
  "images/pic10.jpeg","images/pic10.jpeg"
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

    const img1 = first.querySelector("img").src;
    const img2 = second.querySelector("img").src;

    if (img1 === img2) {
      first.classList.add("matched");
      second.classList.add("matched");
      popHearts(first);
      popHearts(second);
      matched++;
      reset();

      if (matched === images.length / 2) {
        setTimeout(() => {
          document.getElementById("game").classList.add("hidden");
          document.getElementById("question").classList.remove("hidden");
        }, 800);
      }
    } else {
      setTimeout(() => {
        first.classList.remove("flip");
        second.classList.remove("flip");
        reset();
      }, 800);
    }
  }
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
