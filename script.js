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
  if (lock || card === first) return;

  card.querySelector("img").style.display = "block";

  if (!first) {
    first = card;
  } else {
    second = card;
    lock = true;

    if (
      first.querySelector("img").src ===
      second.querySelector("img").src
    ) {
      matched++;
      reset();
      if (matched === images.length / 2) {
        document.getElementById("game").classList.add("hidden");
        document.getElementById("question").classList.remove("hidden");
      }
    } else {
      setTimeout(() => {
        first.querySelector("img").style.display = "none";
        second.querySelector("img").style.display = "none";
        reset();
      }, 800);
    }
  }
}

function reset() {
  [first, second, lock] = [null, null, false];
}
