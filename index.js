"use strict";
//Seleción de los elemento
const cards = document.querySelectorAll(".card");
const backCard = document.querySelectorAll(".back");
const puntos = document.querySelector(".puntos");
const body = document.querySelector("body");
const h1 = document.querySelector("h1");
const segundos = document.querySelector(".segundos");
const minutos = document.querySelector("#minutos");
const modal = document.createElement("div");
const parrafoModal = document.querySelector("div p");
const botonModal = document.querySelector(".botonModal");

const celda = document.querySelector(".content");
//Array de emojis
let emojisArr = ["🌇", "🌉", "🌃", "🌄", "🌅", "🏞", "🎑", "🛤"];

let temporizador = false;
let timer = 0;
let tiempoMinSegun = null;

let flippedCards = [];
let flippedElement = [];
let puntuacion = 0;
let numberOfMatches = 0;
let randomEmoji = createRandomArrayFromOther(emojisArr);
let randomEmojiPar = [...randomEmoji, ...randomEmoji];
let nombreSonido = new Audio("/MEMORY/sonidos/pasarcarta.wav");
let gameOver = new Audio("/MEMORY/sonidos/perdedor.wav");
let noCoincidenCartas = new Audio("/MEMORY/sonidos/noCoincidenCartas.wav");
let coincidenCartas = new Audio("/MEMORY/sonidos/win.wav");
let ganador = new Audio("/MEMORY/sonidos/fuegosArtificiales.wav");

//////////////////////////////////////////////////////////////

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
//////////////////////POR TERMiNAR ////////////////////////////////
//Cambiar de estilo
/* [1. si la partia aun no ha empezado no pasa nada
  2. si la partia ha comnzado que salga un modal con dos opciones, "Si cambias ahora perderas todos los avances del juego"] 
  3.reset del juego + cambios de emojis*/

/* h1.addEventListener("click", Mode);

function Mode(e) {
  if (flippedCards.length || flippedElement.length) {
    console.log("holi");
    modal.setAttribute("id", "modal");
    modal.innerHTML = `
    <div>
    <h2>¿SEGURO QUE QUIERES CAMBIR DE MODO?</h2>
    <p>Si cambias ahora perderas el progreso del juego</p>
    <button class="botonModal">Cambiar de modo</button>
    <button>Seguir jugando
</button>
    </div>
    `;

    body.append(modal);
    botonModal.addEventListener("click", () => {
      console.log("holi");
      modal.remove();
      body.classList.toggle("arcade");
      resetGame();
    });
  } else {
    body.classList.toggle("arcade");
  }

} */

//////////////////////////////////////
//Colocar cada emoji en su caja.
for (let i = 0; i < 16; i++) {
  const randomIndex = Math.floor(Math.random() * randomEmojiPar.length);

  backCard[i].innerHTML = randomEmojiPar[randomIndex];

  randomEmojiPar.splice(randomIndex, 1);
  console.log(randomEmojiPar, randomIndex);
}

//////////////////////////////////////
//Funcion PRINCIPAL
function reveal(event) {
  //tiempo

  if (temporizador == false) {
    contarTiempo();
    temporizador = true;
  }

  const card = event.target.closest(".card");

  if (card && flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    nombreSonido.play();
    flippedCards.push(card.innerText);
    flippedElement.push(card);
    if (flippedCards.length === 2) {
      comprobarPareja();
    }
  }
}
////////////////////////////////////////
for (const card of cards) {
  card.addEventListener("click", reveal);
}
//////////////////////////////////////////////////////////////////////
//
function comprobarPareja() {
  const emoji1 = flippedCards[0];
  const emoji2 = flippedCards[1];

  if (emoji1 === emoji2) {
    puntuacion++;
    numberOfMatches++;

    puntos.textContent = `Intentos:  ${puntuacion} `;
    for (const element of flippedElement) {
      element.classList.add("move");
    }

    setTimeout(() => terminarJuego(), 500);

    flippedCards.length = 0;
    flippedElement = [];
    coincidenCartas.play();
  } else {
    noCoincidenCartas.play()
    setTimeout(() => {
      flippedElement.forEach((card) => {
        card.classList.remove("flipped");
      });

      puntuacion++;
      puntos.textContent = `INTENTOS: ${puntuacion} `;
      flippedElement = [];

      flippedCards.length = 0;
    }, 500);
  }
}
//////////////////////////////////////////////////////
//
function terminarJuego() {
  if (numberOfMatches == 8) {
    ganador.play();
    modal.setAttribute("id", "modal");
    modal.innerHTML = `
    <div>
    <h2>Fin del Juego</h2>
    <p>INTENTOS: ${puntuacion} TIEMPO:${timer}s</p>
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
/////////////////////////////////////////////////

function resetGame() {
  randomEmoji = createRandomArrayFromOther(emojisArr);
  randomEmojiPar = [...randomEmoji, ...randomEmoji];
  flippedCards = [];
  flippedElement = [];
  puntuacion = 0;
  numberOfMatches = 0;
  timer = 0;
  puntos.textContent = `Intentos:  ${puntuacion}`;
  tiempo.textContent = `TIEMPO:  ${contadorMinutos} : ${contadorSegundos}`;

  setTimeout(
    () =>
      cards.forEach((card) => {
        card.classList.remove("flipped", "move");
      }),
    500
  );
}

//////////////HAY QUE DARLE ESTILOS/////////////////////
//Lanzar un modal cuando termine el juego

// function contarTiempo() {
//   tiempoRegresivo = setInterval(() => {
//     timer++;
//     tiempo.textContent = `TIEMPO: ${timer}s`;
//   }, 1000);
// }

//////////////HAY QUE DARLE ESTILOS/////////////////////
//Lanzar un modal cuando termine el juego

function endGame() {
  modal.setAttribute("id", "modal");
  modal.innerHTML = `
  <div>
  <h2>Fin del Juego</h2>
  <p>INTENTOS: ${puntuacion} TIEMPO: 00:00s</p>
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
botonModal.addEventListener("click", () => resetGame());
////////////////////TIEMPO

function contarTiempo() {
  let contadorSegundos = 0;
  let contadorMinutos = 0;

  if (contadorSegundos < 10) {
    contadorSegundos = "0" + contadorSegundos;
  }
  if (contadorMinutos < 10) {
    contadorMinutos = "0" + contadorMinutos;
  }

  tiempoMinSegun = setInterval(() => {
    if (contadorSegundos == 60) {
      contadorSegundos = 0;
      contadorMinutos++;
      //contadorSegundos = "0" + contadorSegundos;
      minutos.innerHTML = contadorMinutos;
      if (contadorMinutos == 0) {
        contadorMinutos = 0;
      }
    }
    segundos.innerHTML = contadorSegundos;
    contadorSegundos++;

    segundos.textContent = `TIEMPO: ${contadorMinutos} : ${contadorSegundos}`;
  }, 1000);
}
