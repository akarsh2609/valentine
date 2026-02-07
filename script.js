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

const cardData = [
  { img: "pic1.jpeg", matchGroup: "a" },
  { img: "pic1.jpeg", matchGroup: "a" },
  { img: "pic2.jpeg", matchGroup: "b" },
  { img: "pic2.jpeg", matchGroup: "b" },
  { img: "pic3.jpeg", matchGroup: "c" },
  { img: "pic3.jpeg", matchGroup: "c" },
  { img: "pic4.jpeg", matchGroup: "d" },
  { img: "pic4.jpeg", matchGroup: "d" },
  { img: "pic5.jpeg", matchGroup: "e" },
  { img: "pic5.jpeg", matchGroup: "e" },
  { img: "pic6.jpeg", matchGroup: "f" },
  { img: "pic6.jpeg", matchGroup: "f" },
  { img: "pic7.jpeg", matchGroup: "g" },
  { img: "pic7.jpeg", matchGroup: "g" },
  { img: "pic8.jpeg", matchGroup: "h" },
  { img: "pic8-1.jpeg", matchGroup: "h" },
  { img: "pic9.jpeg", matchGroup: "i" },
  { img: "pic9.jpeg", matchGroup: "i" },
  { img: "pic10.jpeg", matchGroup: "j" },
  { img: "pic10-1.jpeg", matchGroup: "j" },
  { img: "pic11.jpeg", matchGroup: "k" },
  { img: "pic11.jpeg", matchGroup: "k" },
  { img: "pic12.jpeg", matchGroup: "l" },
  { img: "pic12.jpeg", matchGroup: "l" },
];

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

let first = null, second = null, lock = false, matched = 0;

function startGame() {
  const board = document.getElementById("game-board");
  board.innerHTML = "";

  const shuffledData = shuffle([...cardData]); // make a copy and shuffle
  let imgIndex = 0;

  for (let r = 0; r < heartMap.length; r++) {
    for (let c = 0; c < heartMap[r].length; c++) {
      if (heartMap[r][c] === 1) {
        const data = shuffledData[imgIndex]; // use shuffled cardData
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.match = data.matchGroup;
        card.innerHTML = `
          <div class="card-inner">
            <div class="card-front">
              <img src="images/${data.img}">
            </div>
            <div class="card-back">❤️</div>
          </div>
        `;
        card.onclick = () => flip(card);
        board.appendChild(card);
        imgIndex++;
      } else {
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


window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("unlock-btn").addEventListener("click", checkAnswer);

let noClickCount = 0; // counter for NO button presses

document.getElementById("no-btn").addEventListener("click", () => {
  noClickCount++; // increment on each click

  // Floating crying emojis
  for (let i = 0; i < 5; i++) {
    const emoji = document.createElement("div");
    emoji.innerText = "😭";
    emoji.style.position = "fixed";
    emoji.style.fontSize = 40 + noClickCount * 2 + "px"; // emojis slightly bigger each time
    emoji.style.left = 50 + Math.random() * 200 + "px";
    emoji.style.top = 50 + Math.random() * 200 + "px";
    emoji.style.zIndex = 9999;
    document.body.appendChild(emoji);

    // Animate upward
    let top = parseInt(emoji.style.top);
    const floatInterval = setInterval(() => {
      top -= 2;
      emoji.style.top = top + "px";
      if (top < -50) {
        clearInterval(floatInterval);
        emoji.remove();
      }
    }, 20);
  }

  // On-page NO text
  const msg = document.createElement("div");
  const oos = "OO".repeat(noClickCount + 1); // add extra O each click
  msg.innerText = `💔 How dare you say N${oos}!!!`;
  msg.style.position = "fixed";
  msg.style.top = "20%";
  msg.style.left = "50%";
  msg.style.transform = "translateX(-50%)";
  msg.style.background = "rgba(255,255,255,0.9)";
  msg.style.padding = 15 + noClickCount * 2 + "px 25px"; // grow padding
  msg.style.border = "2px solid red";
  msg.style.borderRadius = "10px";
  msg.style.fontSize = 20 + noClickCount * 2 + "px"; // grow font
  msg.style.zIndex = 10000;
  document.body.appendChild(msg);

  setTimeout(() => {
    msg.remove();
  }, 2000);
});



  document.getElementById("yes-btn").addEventListener("click", () => {
    document.getElementById("question").classList.add("hidden");
    document.getElementById("valentine-response").classList.remove("hidden");
    showDay(currentDay);
  });
});




const sevenDays = [
  { text: "Phool for my fool 🌹", day: "Happy Rose Day" },
  { text: "Will you be mine? 💌", day: "Propose Day" },
  { text: "I ate your chocolate btw 🍫", day: "Chocolate Day" },
  { text: "I promise to stay at your side 💕", day: "Promise Day" },
  { text: "Virtual hug for ya! 🤗", day: "Hug Day" },
  { text: "You wear my kisses better than me 😘", day: "Kiss Day" },
  { text: "Happy Valentines Day ❤️", day: "Valentine's Day" }
];

let currentDay = 0;

function showDay(index) {
  const container = document.createElement("div");
  container.id = "day-container";
  container.innerHTML = `
    <h2>${sevenDays[index].text}</h2>
    <h3>HAPPY ${sevenDays[index].day.toUpperCase()} BABY!</h3>
    <button id="next-day">Next ➡️</button>
  `;
  document.body.appendChild(container);

  document.getElementById("next-day").onclick = () => {
    container.remove();
    currentDay++;
    if (currentDay < sevenDays.length) {
      showDay(currentDay);
    } else {
      alert("🎉 You reached the end of the 7-day surprise!");
    }
  };
};
