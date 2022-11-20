"use strict";

const cards = document.querySelectorAll(".card");
const backCard = document.querySelectorAll(".back");
const puntos = document.querySelector(".puntos");
const h1 = document.querySelector("h1");
const segundos = document.querySelector(".segundos");
const minutos = document.querySelector("#minutos");
const modal = document.createElement("div");
const parrafoModal = document.querySelector("div p");
const botonModal = document.querySelector(".botonModal");
const botonNoche = document.querySelector(".switch-button");
const body = document.querySelector("body")
let emojisArr = ["🌇", "🌉", "🌃", "🌄", "🌅", "🏞", "🎑", "🛤"];
let temporizador = false;
let tiempoMinSegun = null;

let flippedCards = [];
let flippedElement = [];
let score = 0;
let numberOfMatches = 0;
let randomEmoji = createRandomArrayFromOther(emojisArr);
let randomEmojiPar = [...randomEmoji, ...randomEmoji];
let nombreSonido = new Audio("/MEMORY/sonidos/pasarcarta.wav");
let gameOver = new Audio("/MEMORY/sonidos/perdedor.wav");
let noCoincidenCartas = new Audio("/MEMORY/sonidos/noCoincidenCartas.wav");
let coincidenCartas = new Audio("/MEMORY/sonidos/win.wav");
let ganador = new Audio("/MEMORY/sonidos/fuegosArtificiales.wav");
botonNoche.addEventListener("change", (e) => body.classList.toggle("dark"));



function createRandomArrayFromOther(array) {
  const clonedArray = [...array];
  const randomArray = [];

  for (let i = 0; i < array.length; i++) {
    const randomIndex = Math.floor(Math.random() * clonedArray.length);
    const randomItem = clonedArray[randomIndex];
    randomArray.push(randomItem);
    clonedArray.splice(randomIndex, 1);
  }
  return randomArray;
}

for (let i = 0; i < 16; i++) {
  const randomIndex = Math.floor(Math.random() * randomEmojiPar.length);

  backCard[i].innerHTML = randomEmojiPar[randomIndex];

  randomEmojiPar.splice(randomIndex, 1);

}


function reveal(event) {
  inicioDeTiempo();

  const card = event.target.closest(".card");

  if (card && flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    nombreSonido.play();
    flippedCards.push(card.innerText);
    flippedElement.push(card);
    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

for (const card of cards) {
  card.addEventListener("click", reveal);
}

function checkMatch() {
  const emoji1 = flippedCards[0];
  const emoji2 = flippedCards[1];

  if (emoji1 === emoji2) {
    score++;
    numberOfMatches++;

    puntos.textContent = `Intentos:  ${score} `;
    for (const element of flippedElement) {
      element.classList.add("move");
    }

    setTimeout(() => endGame(), 500);

    flippedCards.length = 0;
    flippedElement = [];
    coincidenCartas.play();
  } else {
    noCoincidenCartas.play();
    setTimeout(() => {
      flippedElement.forEach((card) => {
        card.classList.remove("flipped");
      });

      score++;
      puntos.textContent = `INTENTOS: ${score} `;
      flippedElement = [];

      flippedCards.length = 0;
    }, 500);
  }
}

function endGame() {
  if (numberOfMatches == 8) {
    ganador.play();
    modal.setAttribute("id", "modal");
    modal.innerHTML = `
    <div>
    <h2>Fin del Juego</h2>
    <p>INTENTOS: ${score} TIEMPO:${contadorMinutos}:${contadorSegundos}s</p>
    <button class="botonModal">Jugar de nuevo
  </button>
  
    </div>
    `;
    body.append(modal);
    modal.addEventListener("click", () => {
      modal.remove();
      location.reload();
      setTimeout(() => resetGame(), 1000);
    });
  }
}


function resetGame() {
  randomEmoji = createRandomArrayFromOther(emojisArr);
  randomEmojiPar = [...randomEmoji, ...randomEmoji];
  flippedCards = [];
  flippedElement = [];
  score = 0;
  numberOfMatches = 0;
  timer = 0;
  puntos.textContent = `Intentos:  ${score}`;
  segundos.textContent = `TIEMPO:  ${contadorMinutos} : ${contadorSegundos}`;

  setTimeout(
    () =>
      cards.forEach((card) => {
        card.classList.remove("flipped", "move");
      }),
    500
  );
}



function endGame() {
  modal.setAttribute("id", "modal");
  modal.innerHTML = `
  <div>
  <h2>Fin del Juego</h2>
  <p>INTENTOS: ${score} TIEMPO: ${
    "0" + contadorMinutos
  } : ${contadorSegundos}s</p>
  <button class="botonModal">Jugar de nuevo
</button>

  </div>
  `;

  body.append(modal);
  modal.addEventListener("click", () => {
    modal.remove();
    resetGame();
  });
}


function inicioDeTiempo() {
  if (temporizador == false) {
    contarTiempo();
    temporizador = true;
  }
}

let contadorSegundos = 0;
let contadorMinutos = 0;

function contarTiempo() {
  tiempoMinSegun = setInterval(() => {
    if (contadorMinutos == 0) {
      contadorMinutos = 0;
    }
    if (contadorSegundos == 59) {
      contadorSegundos = 0;
      contadorMinutos++;
      //contadorSegundos = "0" + contadorSegundos;
      minutos.innerHTML = contadorMinutos;
    }
    segundos.innerHTML = contadorSegundos;
    contadorSegundos++;
    if (contadorSegundos < 10) {
      contadorSegundos = "0" + contadorSegundos;
    }

    segundos.textContent = `TIEMPO: ${
      "0" + contadorMinutos
    } : ${contadorSegundos}`;
  }, 1000);
}


