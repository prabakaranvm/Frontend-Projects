//Dom Declaration
const userCardsDom = document.getElementById("user-cards");
const openCardDom = document.getElementById("topCard");
const cpuCardsDom = document.getElementById("cpu-cards");
const deckCardDom = document.getElementById("deckCard");
const getCloseDeckDom = document.getElementById("getCloseDeck");
const outputModalDom = document.getElementById("outputModalId");
const colorBoxDom = document.getElementById("colorBoxId")
//Array Initialization
const cardDecks = [];
const cardColors = ["red", "blue", "green", "yellow"];
const cardValues = ["0","1","2","3","4","5","6","7","8","9","skip","rev","+2",];
const specialCardColor = ["black"];
const specialCardValues = ["Wild", "+4"];
const userCards = [];
const cpuCards = [];
const openCard = [];
let deckOfCards = [];
let getCloseDeck = [];
//Card Creation
createCard();
function createCard() {
  for (let color of cardColors) {
    for (let value of cardValues) {
      cardDecks.push({ color, value });
      if (value !== "0") {
        cardDecks.push({ color, value });
      }
    }
  }
  for (let color of specialCardColor) {
    for (let value of specialCardValues) {
      for (let i = 0; i < 4; i++) {
        cardDecks.push({ color, value });
      }
    }
  }
  shuffleDeck();
}
//Shuffle Cards
function shuffleDeck() {
  const shuffledDecks = [...cardDecks];
  for (let i = shuffledDecks.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = shuffledDecks[i];
    shuffledDecks[i] = shuffledDecks[j];
    shuffledDecks[j] = temp;
  }
  spliceCards(shuffledDecks);
}
//Splice Cards
function spliceCards(shuffledDecks) {
  for (let i = 0; i < 14; i++) {
    if (i % 2 == 0) {
      userCards.push(shuffledDecks.pop());
    } else {
      cpuCards.push(shuffledDecks.pop());
    }
  }
  let getOpenCard = shuffledDecks.pop();
  while (getOpenCard.value === "skip" || getOpenCard.value === "rev" || getOpenCard.value === "+2" || getOpenCard.value === "+4" || getOpenCard.value === "Wild") {
    shuffledDecks.unshift(getOpenCard);
    getOpenCard = shuffledDecks.pop();
  }
  openCard.push(getOpenCard);
  displayCard(userCards, userCardsDom);
  displayCpuCards(cpuCards, cpuCardsDom);
  displayCard(openCard, openCardDom);
  deckOfCards = [...shuffledDecks];
}
//Display Cards
function displayCard(getCards, getElement) {
  getCards.forEach((card) => {
    const getCard = document.createElement("div");
    getCard.classList.add("card");
    const innerCard = document.createElement("div");
    innerCard.classList.add("innerCard");
    const bottomCard = document.createElement("div");
    bottomCard.classList.add("bottomCard");
    innerCard.innerHTML = card.value;
    bottomCard.innerHTML = card.value;
    getCard.innerHTML = card.value;
    getCard.data = card;
    innerCard.data = card;
    bottomCard.data = card;
    getCard.style.backgroundColor = card.color;
    getCard.style.color = "white";
    getCard.appendChild(innerCard);
    getCard.appendChild(bottomCard);
    getElement.appendChild(getCard);
    if (getElement === userCardsDom) {
      getCard.addEventListener("click", userPlay);
      const getValue = userCards.find(card => isValidCard(card))
      if(getValue === undefined)
        deckCardDom.addEventListener('click',closeDeck)
      else
        deckCardDom.removeEventListener('click',closeDeck)
    }
  });
}
function displayCpuCards(getCards, getElement) {
  getCards.forEach((card) => {
    const getCard = document.createElement("div");
    getCard.classList.add("card");
    const innerCard = document.createElement("div");
    innerCard.classList.add("innerCard");
    const bottomCard = document.createElement("div");
    bottomCard.classList.add("bottomCard");
    innerCard.innerHTML = card.value;
    bottomCard.innerHTML = card.value;
    getCard.innerHTML = card.value;
    getCard.data = card;
    innerCard.data = card;
    bottomCard.data = card;
    getCard.style.backgroundColor = card.color;
    getCard.style.color = "white";
    getCard.appendChild(innerCard);
    getCard.appendChild(bottomCard);
    getElement.appendChild(getCard);
    // getCard.classList.add("cpuCard");
    // getCard.style.backgroundImage = `url("UNO-Back_1.png")`;
    // getElement.appendChild(getCard);
  });
}
//Close Deck
function closeDeck(){
  deckCardDom.removeEventListener('click',closeDeck)
  let getCard = deckOfCards.pop();
  getCloseDeck.push(getCard);
  displayCard(getCloseDeck, getCloseDeckDom);
  outputModalDom.style.display = "block";
}
const play = () => {
  deckCardDom.removeEventListener('click',closeDeck)
  if(openCard[0].value === "+4"){
    popAndSlice(getCard)
  }
  getCloseDeck.forEach((getCard) => {
    if (isValidCard(getCard)) {
      getCloseDeckDom.innerHTML = "";
      openCard.pop();
      openCard.push(getCard);
      updateCard();
      getCloseDeck = [];
      outputModalDom.style.display = "none";
      if(getCard.value === "skip" || getCard.value === "rev" || getCard.value === "+2")
      {
        specialCard(getCard.value,cpuCards)
      }
      else if(getCard.value === "+4")
      {
        specialCard(getCard.value,cpuCards)
      }
      else
      {
        setTimeout(cpuPlay, 5000);
      }
    }
  });
};
const pass = () => {
  deckCardDom.removeEventListener('click',closeDeck)
  getCloseDeck.forEach((getCard) => {
    getCloseDeckDom.innerHTML = "";
    userCards.push(getCard);
    updateCard();
    getCloseDeck = [];
    outputModalDom.style.display = "none";
    setTimeout(cpuPlay, 5000);
  });
};
//Common Function
function popAndSlice(getCard){
    const index = userCards.findIndex((card) => card === getCard);
    userCards.splice(index, 1);
    openCard.pop();
    openCard.push(getCard);
    updateCard();
}
//User Play
function userPlay(event) {
  let getCard = event.target.data;
  const getCardsDom = document.getElementsByClassName("card");
  if(openCard[0].value === "+4"){
    popAndSlice(getCard)
  }
  if (isValidCard(getCard)) {
    popAndSlice(getCard)
    for (let getUserCards of getCardsDom) {
      getUserCards.removeEventListener("click", userPlay);
    }
    //If its a Special Card
    if(getCard.value === "skip" || getCard.value === "rev" || getCard.value === "+2")
    {
      specialCard(getCard.value,cpuCards)
    }
    else if(getCard.value === "+4")
    {
      specialCard(getCard.value,cpuCards)
    }
    else
    {
      setTimeout(cpuPlay, 5000);
    }
  }
}
//Cpu Play
function cpuPlay() {
  const getCpuCards = [];
  cpuCards.forEach((card) => {
    if (isValidCard(card)) {
      getCpuCards.push(card);
    }
  });
  if (getCpuCards.length !== 0) {
    const getRandomIndex = Math.floor(Math.random() * getCpuCards.length);
    const getCard = getCpuCards[getRandomIndex];
    const index = cpuCards.findIndex((card) => card === getCard);
    cpuCards.splice(index, 1);
    openCard.pop();
    openCard.push(getCard);
    updateCard();
  } else {
    let getCard = deckOfCards.pop();
    if (isValidCard(getCard)) {
      openCard.pop();
      openCard.push(getCard);
      updateCard();
    } else {
      cpuCards.push(getCard);
      updateCard();
    }
  }
  //If its a Special Card
  const getCard = openCard[0]
  console.log(cpuCards,getCard)
  if(getCard.value === "skip" || getCard.value === "rev" || getCard.value === "+2")
  {
    specialCard(getCard.value,userCards)
    setTimeout(cpuPlay, 5000);
  }
  else if(getCard.value === "+4")
  {
    specialCard(getCard.value,userCards)
  }
  else
  {
    updateCard()
  }
}
//Special card functions
function specialCard(getValue,getArray)
{
  if(getValue === "skip"){
    updateCard()
  }
  if(getValue === "rev"){
    updateCard()
  }
  if(getValue === "+2"){
    for (let i = 0; i < 2; i++) {
      let getCard = deckOfCards.pop();
      getArray.push(getCard);
    }
    updateCard();
  }
  if(getValue === "+4"){
    for (let i = 0; i < 2; i++) {
      let getCard = deckOfCards.pop();
      getArray.push(getCard);
    }
    updateCard()
    if(getArray === userCards){
      setTimeout(()=>{
        const getRandomIndex = Math.floor(Math.random() * cpuCards.length);
        const getCard = cpuCards[getRandomIndex];
        cpuCards.splice(getRandomIndex, 1);
        openCard.pop();
        openCard.push(getCard);
        updateCard()
      },4000)
    } 
  }
}
//Valid Card
function isValidCard(getSelectedCard) {
  let getOpenCard = openCard[openCard.length - 1];
  return (getSelectedCard.color === getOpenCard.color || getSelectedCard.value === getOpenCard.value || getSelectedCard.color === "black");
}
//Update Card
function updateCard() {
  userCardsDom.innerHTML = "";
  cpuCardsDom.innerHTML = "";
  openCardDom.innerHTML = "";
  displayCard(userCards, userCardsDom);
  displayCpuCards(cpuCards, cpuCardsDom);
  displayCard(openCard, openCardDom);
}
