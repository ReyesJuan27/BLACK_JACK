// Html buttons and images containers


const btnNewGame = document.querySelector('#btnNewGame');
const btnAskCard = document.querySelector('#btnAskCard');
const btnStay = document.querySelector('#btnStay');

const imageContainerPlayer = document.querySelector('.imagesCardsPlayer');
const imageContainerPc = document.querySelector('.imagesCardsPc');

const scoreBarPlayer = document.querySelector('#scoreBarPlayer');
const scoreBarPc = document.querySelector('#scoreBarPc');



// Basic arrays/objects that's used in the functions 


let deckCardsPlayer = [];
let deckCardsPc = [];
let arrayOfValuesPlayer = []
let arrayOfValuesPc = []
let counterFunctionPlayer = 0;
let counterFunctionPc = 0;

let sumPlayer = 0;
let sumPc = 0;
let theTruthPlayer;
let theTruthPc;
let valueSpecialCard;

const specialCards = { 11 : 'A', 12 : 'J', 13 : 'K', 14 : 'Q'};
const possibleLetters = ['C','D','H','S'];


// Random cards for choise one of the nummbers and letters


const randomLetterCard = ()=> {

    let ramdomIndex = Math.floor( Math.random() * possibleLetters.length );

    let ramdomLetter = possibleLetters[ramdomIndex];

    return ramdomLetter
}


// Create a New Deck for the Player and CPU Randomly


const createDeckCardsPlayer = () => {
   
    for ( let i = 0; i < 6; i++ ) {
        
        const probabilityOfCardsPlayer = () => {
            let randomNumberCard = Math.round(2 + Math.random() * 12); // random number 2-14

            if (randomNumberCard <= 10) { 
                scoreCounterPlayer(randomNumberCard);
                return randomNumberCard
                
            } else {
                scoreCounterPlayer(specialCards[randomNumberCard]);
                return specialCards[randomNumberCard]
            }
        }
        
        deckCardsPlayer.push(`assets/cartas/${probabilityOfCardsPlayer()}${randomLetterCard()}.png`); 
}
console.log(deckCardsPlayer, 'soy player');
console.log(arrayOfValuesPlayer);

}

createDeckCardsPlayer();

const createDeckCardsPc = () => {
        
    for ( let i = 0; i < 6; i++ ) {
        
        let randomNumberCard = Math.round(2 + Math.random() * 12);
        const probabilityOfCardsPc = () => {

            if (randomNumberCard <= 10) {
                scoreCounterPc(randomNumberCard);
                return randomNumberCard

            } else {
                scoreCounterPc(specialCards[randomNumberCard]);
                return specialCards[randomNumberCard]
            }
        }

        deckCardsPc.push(`assets/cartas/${probabilityOfCardsPc()}${randomLetterCard()}.png`);
    }
    console.log(deckCardsPc,'soy pc');
    console.log(arrayOfValuesPc);

     
}

createDeckCardsPc();

// Modificate the Html for add the images 


const addImageHtml = () => {
    if ( counterFunctionPlayer < 6 ) {
        
        
        let imageDesignerPlayer = document.createElement('img');
        imageDesignerPlayer.classList.add('cardImage');
        imageDesignerPlayer.setAttribute('src', deckCardsPlayer[counterFunctionPlayer]);
        imageContainerPlayer.append(imageDesignerPlayer);
        
        theTruthPlayer = true;
        let realSumScore = scoreCounterPlayer(counterFunctionPlayer)
        functionOfWinner(realSumScore, 0);
        counterFunctionPlayer++;


        gameFunctionCardsPc();        
    }
}

btnAskCard.addEventListener('click', addImageHtml);

// Show the cards of the Pc after the play of the Player


const gameFunctionCardsPc = async () => {
    
    for ( let i = 0; counterFunctionPlayer >= 5 && i <= 5 && counterFunctionPc == 0 ; i++ ) {
        
        let imageDesignerPc = document.createElement('img');
        imageDesignerPc.classList.add('cardImagePc');
        imageDesignerPc.setAttribute('src', deckCardsPc[i]);
        imageContainerPc.append(imageDesignerPc);
        scoreBarPc.innerHTML = arrayOfValuesPc[i];
        
        theTruthPc = true;
        let realSumScore = scoreCounterPc(counterFunctionPc);
        functionOfWinner(0, realSumScore);

        
        await new Promise(resolve => setTimeout(resolve, 1000));
        // if (functionOfWinner){counterFunctionPc = 1}
    }
}

// Score Bar of the Player and the Pc


function scoreCounterPlayer (randomMathNumber) { 
    if (arrayOfValuesPlayer.length < 6) { 
        (randomMathNumber ==='J' || randomMathNumber ==='K' || randomMathNumber ==='Q') ? arrayOfValuesPlayer.push(10):
        (randomMathNumber ==='A') ? arrayOfValuesPlayer.push(1):
        arrayOfValuesPlayer.push(randomMathNumber);
    }
    
    if (theTruthPlayer) { 
        sumPlayer += arrayOfValuesPlayer[randomMathNumber]; 
        scoreBarPlayer.innerHTML = sumPlayer;
    }

    return sumPlayer
}


function scoreCounterPc (randomMathNumber) { 
    if (arrayOfValuesPc.length < 6) { 
        (randomMathNumber ==='J' || randomMathNumber ==='K' || randomMathNumber ==='Q') ? arrayOfValuesPc.push(10):
        (randomMathNumber ==='A') ? arrayOfValuesPc.push(1):
        arrayOfValuesPc.push(randomMathNumber);
    }

    if (theTruthPc) { 
        sumPc += arrayOfValuesPc[randomMathNumber]; 
        scoreBarPc.innerHTML = sumPc;
    }

    return sumPc

}


// Decide the Winner

function functionOfWinner(realSumScorePlayer, realSumScorePc){ 
    if (realSumScorePlayer > 21 ) { 
        counterFunctionPlayer = 5;
        counterFunctionPc = 0;
        deckCardsPlayer = [];
        arrayOfValuesPlayer = []
        alert('bro has perdido, te pasaste de 21')
    } 
    if (realSumScorePc > 21 ) { 
        counterFunctionPc = 1;
        deckCardsPc = [];
        arrayOfValuesPc = []
        alert('bro has ganado, el cpu pasó 21')
    }    
} 
function functionOfWinner(realSumScorePc){ 
    
    
} 



// Button Actions


btnNewGame.addEventListener('click' , ()=> {

    imageContainerPlayer.innerHTML = '';
    imageContainerPc.innerHTML = '';
    scoreBarPlayer.innerHTML = 0;
    scoreBarPc.innerHTML = 0;

    deckCardsPlayer = [];
    deckCardsPc = [];
    arrayOfValuesPlayer = [];
    arrayOfValuesPc = [];

    counterFunctionPlayer = 0;
    counterFunctionPc = 0;
    sumPlayer = 0;
    sumPc = 0;
    theTruthPlayer = 0;
    theTruthPc = 0;

    createDeckCardsPlayer();
    createDeckCardsPc();

    console.log('nuevas Barajas');
    console.log(arrayOfValuesPlayer)
    
    });

btnStay.addEventListener('click', ()=> {

    if ( counterFunctionPlayer < 5 ) {
        counterFunctionPlayer = 5;
        gameFunctionCardsPc();
        // functionOfWinner = false
    }
    
});





