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
