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
let arrayScorePlayer = []
let arrayScorePc = []
let counterFunctionPlayer = 0;
const especialCards = { 11 : 'A', 12 : 'J', 13 : 'K', 14 : 'Q'};
const possibleLetters = ['C','D','H','S'];


// Random cards for choise one of the nummbers and letters


const randomLetterCard = ()=> {

    let ramdomIndex = Math.floor( Math.random() * possibleLetters.length );

    let ramdomLetter = possibleLetters[ramdomIndex];

    return ramdomLetter
}


// Create a New Deck for the Player and CPU Randomly


const createDeckCardsPlayer = () => {
   
    for ( let i = 0; i < 5; i++ ) {
        
        let randomNumberCard = Math.round(2 + Math.random() * 12);
        const probabilityOfCardsPlayer = () => {

            if (randomNumberCard <= 10) { 
                scoreCounterPlayer(randomNumberCard);
                return randomNumberCard

            } else {
                scoreCounterPlayer(especialCards[randomNumberCard]);
                return especialCards[randomNumberCard]
            }
        }
        
        deckCardsPlayer.push(`assets/cartas/${probabilityOfCardsPlayer()}${randomLetterCard()}.png`); 
}
console.log(deckCardsPlayer, 'soy player');
console.log(arrayScorePlayer);

}

createDeckCardsPlayer();


// Here was something


const createDeckCardsPc = () => {
        
    for ( let i = 0; i < 5; i++ ) {
        
        let randomNumberCard = Math.round(2 + Math.random() * 12);
        const probabilityOfCardsPc = () => {

            if (randomNumberCard <= 10) { 
                scoreCounterPc(randomNumberCard);
                return randomNumberCard

            } else {
                scoreCounterPc(especialCards[randomNumberCard]);
                return especialCards[randomNumberCard]
            }
        }

        deckCardsPc.push(`assets/cartas/${probabilityOfCardsPc()}${randomLetterCard()}.png`);
    }
    console.log(deckCardsPc,'soy pc');
    console.log(arrayScorePc);

     
}

createDeckCardsPc();

// Modificate the Html for add the images 


const addImageHtml = () => {
    if ( counterFunctionPlayer < 5 ) {

        let imageDesignerPlayer = document.createElement('img');
        imageDesignerPlayer.classList.add('cardImage');
        imageDesignerPlayer.setAttribute('src', deckCardsPlayer[counterFunctionPlayer]);
        imageContainerPlayer.append(imageDesignerPlayer);
        
        scoreCounterPlayer(counterFunctionPlayer)
        counterFunctionPlayer++;
        gameFunctionCardsPc();
        console.log(arrayScorePlayer);
        
    }
}

btnAskCard.addEventListener('click', addImageHtml);

// Show the cards of the Pc after the play of the Player


const gameFunctionCardsPc = async () => {
    
    for ( let i = 0; counterFunctionPlayer == 5 && i <= 4 ; i++ ) {
        
        let imageDesignerPc = document.createElement('img');
        imageDesignerPc.classList.add('cardImagePc');
        imageDesignerPc.setAttribute('src', deckCardsPc[i]);
        imageContainerPc.append(imageDesignerPc);
        scoreBarPc.innerHTML = arrayScorePc[i];

        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

// Score Bar of the Player and the Pc


function scoreCounterPlayer (randomMathNumber) { 
    if (arrayScorePlayer.length < 5) arrayScorePlayer.push(randomMathNumber);
    
    scoreBarPlayer.innerHTML = arrayScorePlayer[randomMathNumber];
    let sum = 0;
    
    for (let i = 0; i <= randomMathNumber; i++) {
        sum += arrayScorePlayer[i];
    }
    
    scoreBarPlayer.innerHTML = sum;

        

}

function scoreCounterPc (randomMathNumber) { 
    arrayScorePc.push(randomMathNumber)
}    




// Button Actions


btnNewGame.addEventListener('click' , ()=> {

    imageContainerPlayer.innerHTML = '';
    imageContainerPc.innerHTML = '';
    deckCardsPlayer = [];
    deckCardsPc = [];
    arrayScorePlayer = [];
    arrayScorePc = [];
    counterFunctionPlayer = 0;
    createDeckCardsPlayer();
    createDeckCardsPc();
    console.log('nuevas Barajas');
    console.log(arrayScorePlayer)
    
    });

btnStay.addEventListener('click', ()=> {

    if ( counterFunctionPlayer < 5 ) {
        counterFunctionPlayer = 5;
        gameFunctionCardsPc();
    }
    
});





