"use strict";
//CARD ANIMATION
const cards = document.querySelectorAll(".card");
const backCard = document.querySelectorAll(".back");
const puntos = document.querySelector(".puntos");
const body = document.querySelector("body");
const h1 = document.querySelector("h1");
//EMOJI ARCADE
let emojisArcade = [
  {
    id: 1,
    emoji: "🧌",
  },
  {
    id: 2,
    emoji: "🏰",
  },
  {
    id: 3,
    emoji: "🫅🏽",
  },
  {
    id: 4,
    emoji: "🧙🏽",
  },
  {
    id: 5,
    emoji: "🧝🏽‍♀️",
  },
  {
    id: 6,
    emoji: "🧟",
  },
  {
    id: 7,
    emoji: "🧞",
  },
  {
    id: 8,
    emoji: "🧚🏽‍♀️",
  },
];
//[("🧌", "🏰", "🫅🏽", "🧙🏽", "🧝🏽‍♀️", "🧟", "🧞", "🧚🏽‍♀️")];
//CLASSIC {🛤 🎑 🏞 🌅 🌄  🌃  🌉 🌇}
let emojisClassic = [
  {
    id: 1,
    emoji: "🛤",
  },
  {
    id: 2,
    emoji: "🎑",
  },
  {
    id: 3,
    emoji: "🏞",
  },
  {
    id: 4,
    emoji: "🌅",
  },
  {
    id: 5,
    emoji: "🌄",
  },
  {
    id: 6,
    emoji: "🌃",
  },
  {
    id: 7,
    emoji: "🌉",
  },
  {
    id: 8,
    emoji: "🌇",
  },
];
//cambiar de estilo
h1.addEventListener("click", Mode);

function Mode(e) {
  body.classList.toggle("arcade");
}
if (body.classList.contains("arcade")) {
  emojisClassic = emojisArcade;
}

let flippedCards = [];
//array aleatoria
function createRandomArrayFromOther(arrayToCopy, maxLength = 8) {
  const clonedArray = [...arrayToCopy];
  const randomArray = [];

  for (let i = 0; i < maxLength; i++) {
    const randomIndex = Math.floor(Math.random() * clonedArray.length);
    const randomItem = clonedArray[randomIndex];

    randomArray.push(randomItem);
    clonedArray.splice(randomIndex, 1);
  }
  return randomArray;
}
const randomEmoji = createRandomArrayFromOther(emojisClassic);
console.log(randomEmoji);
const randomEmojiPar = [...randomEmoji, ...randomEmoji];
console.log(randomEmojiPar);
let flippedElement = [];

let puntuacion = 0;
let numberOfMatches = 0;
// 1-colocar un emoji en cada targeta

for (let i = 0; i < randomEmojiPar.length; i++) {
  backCard[i].innerHTML = randomEmojiPar[i].emoji;

  //cada emoji en posicion i lo meta en una casilla del table
}
// console.log(backCard[0].textContent);
//2-rota la carta || si NO son iguales se giran otra vez
//3 Funfion para comparar cartas

function reveal(event) {
  const card = event.target.closest(".card");

  if (card && flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    flippedCards.push(card.innerText);
    flippedElement.push(card);

    if (flippedCards.length === 2) {
      comprobarPareja();
      setTimeout(() => terminarJuego(), 1000);
    }
  }
}

/* const rotate = (e) => {
  const currentCard = e.currentTarget;
  currentCard.classList.add("rotate");

  setTimeout((e) => {
    currentCard.classList.remove("rotate");
  }, 2000);
}; */

for (const card of cards) {
  card.addEventListener("click", reveal);
  // card.addEventListener("", rotate);
}

function comprobarPareja() {
  const emoji1 = flippedCards[0];
  const emoji2 = flippedCards[1];

  if (emoji1 === emoji2) {
    puntuacion++;
    numberOfMatches++;

    puntos.textContent = `Intentos:  ${puntuacion} `;
    flippedCards.length = 0;
    flippedElement = [];
  } else {
    setTimeout(() => {
      flippedElement.forEach((card) => {
        card.classList.remove("flipped");
      });
      puntuacion++;
      puntos.textContent = `INTENTOS: ${puntuacion} `;
      flippedCards.length = 0;
    }, 1000);
  }
}

function terminarJuego() {
  if (numberOfMatches == 8) {
    alert(`Has terminado el juego con un total de ${puntuacion}`),
      cards.forEach((card) => {
        card.classList.remove("flipped");
      });

    flippedCards = [];
    flippedElement = [];
    puntuacion = 0;
  }
}

function resetGame() {
  cards.forEach((card) => {
    card.classList.remove("flipped");
  });

  flippedCards = [];
  flippedElement = [];
  puntuacion = 0;
}
