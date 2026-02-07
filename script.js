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
  "images/pic1.jpg","images/pic1.jpg",
  "images/pic2.jpg","images/pic2.jpg",
  "images/pic3.jpg","images/pic3.jpg",
  "images/pic4.jpg","images/pic4.jpg",
  "images/pic5.jpg","images/pic5.jpg",
  "images/pic6.jpg","images/pic6.jpg",
  "images/pic7.jpg","images/pic7.jpg",
  "images/pic8.jpg","images/pic8.jpg",
  "images/pic9.jpg","images/pic9.jpg",
  "images/pic10.jpg","images/pic10.jpg"
];

let first = null, second = null, lock = false, matched = 0;

function startGame() {
  images.sort(() => 0.5 - Math.random());
  const board = document.getElementById("game-board");

  images.forEach(src => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
  <div class="card-inner">
    <div class="card-front">
      <img src="${src}">
    </div>
    <div class="card-back">
      ❤️
    </div>
  </div>
`;

    card.onclick = () => flip(card);
    board.appendChild(card);
  });
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
