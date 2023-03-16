var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0; 

var hidden;
var deck = [];


var canHit = true;
var canStay = true;

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];

    for (let i = 0; i < 5; i++){ //creating 5 decks
    values.forEach((value)=>{
        types.forEach((type)=>{
            deck.push(value + type); 
        })
    })
    }
    return deck;
    }


function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); 
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function dealerValue (card){
  return  dealerSum += getValue(card),
    dealerAceCount += checkAce(card);
}

function dealerCards(){

    let card = deck.pop();
    let $cardImg = $("<img>").attr("src","./cards/" + card + ".png").appendTo("#dealer-cards");
    dealerValue(card);
}

function playerCards(){
    let card = deck.pop();
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    let $cardImg = $("<img>").attr("src","./cards/" + card + ".png").appendTo("#your-cards")
}


function startGame() {
    hidden = deck.pop();
    dealerValue(hidden);
      
    dealerCards();

    for (let i = 0; i < 2; i++) {
        playerCards();
    }

    $("#hit").on("click", hit);
    $("#stay").on("click", stay);
    $("#submit").on("click", refreshPage);

}

function hit() {
    if (!canHit) {
        return;
    }
    
  playerCards();

    if (reduceAce(yourSum, yourAceCount) > 21){ 
        canHit = false;
        canStay = false;
      winner();
}
}

function calculate(){
    while (dealerSum < 17) {
        dealerCards();
    }
}

function winner(){
    $("#hidden").attr("src","./cards/" + hidden + ".png");

    $("#dealer-sum").html(dealerSum);
    $("#your-sum").html(yourSum);
    $("#results").text(function(){
        if (yourSum > 21) {
            return "BUST!, you lose";
        }
        else if (dealerSum > 21) {
            return  "You Win!";
        }
        //both you and dealer <= 21
        else if (yourSum == dealerSum) {
            return "Tie!";
        }
        else if (yourSum > dealerSum) {
            return "You Win!";
        }
        else if (yourSum < dealerSum) {
           return  "BUST!, you lose";
        }})
     
}


function stay() {
    if (!canStay) {
        return;
    }
    calculate();
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    winner();
    
}

function getValue(card) {
    let data = card.split(""); 
    let value = data[0];

    if (isNaN(value)) { 
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    if (value === "1"){
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {

  while(playerSum > 21 && playerAceCount > 0 ){
      playerSum -= 10 
      playerAceCount -= 1
    }
   return playerSum
}


function refreshPage(){
    window.location.reload();
}  