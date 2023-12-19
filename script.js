"use strict";

// Selecting elements
const score1El = document.getElementById("score--1");
const score2El = document.getElementById("score--2");
const totalRoundsEl = document.getElementById("totalRounds");
const currentRoundEl = document.getElementById("currentRound");
const tieEl = document.getElementById("tie");
const message = document.querySelector(".message");
const player1Container = document.querySelector(".player--1");
const player2Container = document.querySelector(".player--2");
const btnPlay = document.getElementById("play");
const btnReset = document.getElementById("reset");
const selectionPlayer1 = document.getElementById("selection-player1");
const selectionPlayer2 = document.getElementById("selection-player2");
const winMessage = document.querySelector(".win-message");
const tieMessage = document.querySelector(".tie-message");
const labelRules = document.querySelector(".label-rules");
const rules = document.querySelector(".rules");
const totalRoundsRule = document.getElementById("total-rounds-rule");
const btnCloseRules = document.querySelector(".btn-close-rules");
const overlay = document.querySelector(".overlay");

// Selecting image elements
const img0Player1 = document.getElementById("img-0");
const img1Player1 = document.getElementById("img-1");
const img2Player1 = document.getElementById("img-2");
const img3Player1 = document.getElementById("img-3");
const img4Player1 = document.getElementById("img-4");
const img0Player2 = document.getElementById("img-5");
const img1Player2 = document.getElementById("img-6");
const img2Player2 = document.getElementById("img-7");
const img3Player2 = document.getElementById("img-8");
const img4Player2 = document.getElementById("img-9");

// **************************************************************************

let score1, score2, currentRound, numOfTies, totalRounds;
const images = ["rock", "paper", "scissor", "lizard", "spock"];

// Starting conditions
const init = function () {
  score1 = 0; // Player1 score
  score2 = 0; // Player2 score
  totalRounds = 10;
  currentRound = 0;
  numOfTies = 0;

  score1El.textContent = 0;
  score2El.textContent = 0;
  totalRoundsEl.textContent = totalRounds;
  currentRoundEl.textContent = 0;
  tieEl.textContent = 0;
  message.textContent = "";
  totalRoundsRule.textContent = `There are total ${totalRounds} rounds. If score ties after ${totalRounds} rounds, then an additional round is added until winner is declared.`;

  winMessage.classList.add("hidden");
  tieMessage.classList.add("hidden");
  rules.classList.add("hidden");
  overlay.classList.add("hidden");

  btnPlay.removeAttribute("disabled");
  btnPlay.style.color = "#fff";
  btnPlay.style.backgroundColor = "#872341";
  player1Container.classList.remove("winner");
  player2Container.classList.remove("winner");
  selectionPlayer1.src = `images/question-mark.svg`;
  selectionPlayer2.src = `images/question-mark.svg`;
  removeSelections();
};

const player1wins = function () {
  score1++;
  score1El.textContent = score1;
  winMessage.classList.remove("hidden");
  winMessage.style.left = "36%";
};

const player2wins = function () {
  score2++;
  score2El.textContent = score2;
  winMessage.classList.remove("hidden");
  winMessage.style.left = "60%";
};

const selectImages = function (indexPlayer1, indexPlayer2) {
  document.getElementById(`img-${indexPlayer1}`).style.borderColor = "#fff";
  document.getElementById(`img-${indexPlayer2 + 5}`).style.borderColor = "#fff";
};

const removeSelections = function () {
  for (let i = 0; i < 10; i++) {
    document.getElementById(`img-${i}`).style.borderColor = "transparent";
  }
};

const closeRules = function () {
  rules.classList.add("hidden");
  overlay.classList.add("hidden");
};

init();

// Open Rules-Board functionality
labelRules.addEventListener("click", function () {
  rules.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

// Close Rules-Board functionality
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeRules();
  }
});

overlay.addEventListener("click", closeRules);

btnCloseRules.addEventListener("click", closeRules);

// Play Game functionality
btnPlay.addEventListener("click", function () {
  if (currentRound < totalRounds) {
    btnPlay.setAttribute("disabled", true);
    message.textContent = "";
    winMessage.classList.add("hidden");
    tieMessage.classList.add("hidden");
    selectionPlayer1.classList.add("hidden");
    selectionPlayer2.classList.add("hidden");
    removeSelections();

    setTimeout(function () {
      currentRound++;
      currentRoundEl.textContent = currentRound;
      const random1 = Math.trunc(Math.random() * 5);
      const random2 = Math.trunc(Math.random() * 5);

      selectionPlayer1.classList.remove("hidden");
      selectionPlayer2.classList.remove("hidden");

      selectionPlayer1.src = `images/${images[random1]}.svg`;
      selectionPlayer2.src = `images/${images[random2]}.svg`;

      if (random1 === random2) {
        numOfTies++;
        tieEl.textContent = numOfTies;
        tieMessage.classList.remove("hidden");
        selectImages(random1, random2);
      }
      // Rock vs Paper
      else if (random1 === 0 && random2 === 1) {
        selectImages(random1, random2);
        player2wins();
        message.textContent = "Paper covers Rock!";
      }
      // Rock vs Scissor
      else if (random1 === 0 && random2 === 2) {
        selectImages(random1, random2);
        player1wins();
        message.textContent = "Rock crushes Scissor!";
      }
      // Rock vs Lizard
      else if (random1 === 0 && random2 === 3) {
        selectImages(random1, random2);
        player1wins();
        message.textContent = "Rock crushes Lizard!";
      }
      // Rock vs Spock
      else if (random1 === 0 && random2 === 4) {
        selectImages(random1, random2);
        player2wins();
        message.textContent = "Spock vaporizes Rock!";
      }
      // Paper vs Rock
      else if (random1 === 1 && random2 === 0) {
        selectImages(random1, random2);
        player1wins();
        message.textContent = "Paper covers Rock!";
      }
      // Paper vs Scissor
      else if (random1 === 1 && random2 === 2) {
        selectImages(random1, random2);
        player2wins();
        message.textContent = "Scissor cuts Paper!";
      }
      // Paper vs Lizard
      else if (random1 === 1 && random2 === 3) {
        selectImages(random1, random2);
        player2wins();
        message.textContent = "Lizard eats Paper!";
      }
      // Paper vs Spock
      else if (random1 === 1 && random2 === 4) {
        selectImages(random1, random2);
        player1wins();
        message.textContent = "Paper disproves Spock!";
      }
      // Scissor vs Rock
      else if (random1 === 2 && random2 === 0) {
        selectImages(random1, random2);
        player2wins();
        message.textContent = "Rock crushes Scissor!";
      }
      // Scissor vs Paper
      else if (random1 === 2 && random2 === 1) {
        selectImages(random1, random2);
        player1wins();
        message.textContent = "Scissor cuts Paper!";
      }
      // Scissor vs Lizard
      else if (random1 === 2 && random2 === 3) {
        selectImages(random1, random2);
        player1wins();
        message.textContent = "Scissor decapitates Lizard!";
      }
      // Scissor vs Spock
      else if (random1 === 2 && random2 === 4) {
        selectImages(random1, random2);
        player2wins();
        message.textContent = "Spock smashes Scissor!";
      }
      // Lizard vs Rock
      else if (random1 === 3 && random2 === 0) {
        selectImages(random1, random2);
        player2wins();
        message.textContent = "Rock crushes Lizard!";
      }
      // Lizard vs Paper
      else if (random1 === 3 && random2 === 1) {
        selectImages(random1, random2);
        player1wins();
        message.textContent = "Lizard eats Paper!";
      }
      // Lizard vs Scissor
      else if (random1 === 3 && random2 === 2) {
        selectImages(random1, random2);
        player2wins();
        message.textContent = "Scissor decapitates Lizard!";
      }
      // Lizard vs Spock
      else if (random1 === 3 && random2 === 4) {
        selectImages(random1, random2);
        player1wins();
        message.textContent = "Lizard poisons Spock!";
      }
      // Spock vs Rock
      else if (random1 === 4 && random2 === 0) {
        selectImages(random1, random2);
        player1wins();
        message.textContent = "Spock vaporizes Rock!";
      }
      // Spock vs Paper
      else if (random1 === 4 && random2 === 1) {
        selectImages(random1, random2);
        player2wins();
        message.textContent = "Paper disproves Spock!";
      }
      // Spock vs Scissor
      else if (random1 === 4 && random2 === 2) {
        selectImages(random1, random2);
        player1wins();
        message.textContent = "Spock smashes Scissor!";
      }
      // Spock vs Lizard
      else if (random1 === 4 && random2 === 3) {
        selectImages(random1, random2);
        player2wins();
        message.textContent = "Lizard poisons Spock!";
      }

      btnPlay.removeAttribute("disabled");

      if (currentRound === totalRounds) {
        if (score1 === score2) {
          totalRounds++;
          totalRoundsEl.textContent = totalRounds;
          return;
        }
        btnPlay.setAttribute("disabled", true);
        btnPlay.style.color = "#333";
        btnPlay.style.backgroundColor = "#555";
        if (score1 > score2) {
          player1Container.classList.add("winner");
        } else if (score2 > score1) {
          player2Container.classList.add("winner");
        }
      }
    }, 1000);
  }
});

// Reset Game functionality
btnReset.addEventListener("click", init);
