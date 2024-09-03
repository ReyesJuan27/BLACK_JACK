// Html buttons and images containers


const btnNewGame = document.querySelector('#btnNewGame');
const btnAskCard = document.querySelector('#btnAskCard');
const btnStay = document.querySelector('#btnStay');

const imageContainerPlayer = document.querySelector('.imagesCardsPlayer');
const imageContainerPc = document.querySelector('.imagesCardsPc');

const scoreBarPlayer = document.querySelector('#scoreBarPlayer');
const scoreBarPc = document.querySelector('#scoreBarPc');

// Basic arrays/objects that's used in the functions // ========================


let deckCardsPlayer = [] , deckCardsPc = [], arrayOfValuesPlayer = [] , arrayOfValuesPc = [];
let counterFunctionPlayer= 0 , counterFunctionPc = 0;

let manualDeckCardsPlayer = [
    '6S',
    '3D',
    '7D', 
    'QS',
    '6H',
    'QC'
], manualDeckCardsPc = [
    '8H',
    '3C', 
    'AD',
    '2H',
    '4C',
    '7C'
];


let sumPlayer = 0, sumPc = 0;

let theTruthPlayer, theTruthPc;

let valueSpecialCard;

const specialCards = { 11 : 'A', 12 : 'J', 13 : 'K', 14 : 'Q'};
const possibleLetters = ['C','D','H','S'];


const randomLetterCard = ()=> {

    let ramdomIndex = Math.floor( Math.random() * possibleLetters.length );
    let ramdomLetter = possibleLetters[ramdomIndex];

    return ramdomLetter
}

// Create a New Deck for the Player and CPU Randomly // ========================


const createDeckCardsPlayer = () => {
   
    for ( let i = 0; i < 6; i++ ) { //&& manualTruthUse // i < 6 (original)
        
        const probabilityOfCardsPlayer = () => {
            let randomNumberCard = Math.round(2 + Math.random() * 12); // random number 2-14

            if (randomNumberCard <= 10) { 
                scoreCounterPlayer(randomNumberCard, false);
                return randomNumberCard
                
            } else {
                scoreCounterPlayer(specialCards[randomNumberCard], false);
                return specialCards[randomNumberCard]
            }
        }
        
        deckCardsPlayer.push(`assets/cartas/${ probabilityOfCardsPlayer() }${ randomLetterCard() }.png`); //original
        
        // Manual Cards ===================================================================== //call it or not for testing 
        
        // const numberCardsPlayerManual = (index) => (manualDeckCardsPlayer[index].length == 2) ? manualDeckCardsPlayer[index][0] : 10 
        // const letterCardsPlayerManual = (index2) => (manualDeckCardsPlayer[index2].length == 2) ? manualDeckCardsPlayer[index2][1] : manualDeckCardsPlayer[index2][2]

        // deckCardsPlayer.push(`assets/cartas/${ numberCardsPlayerManual(i) }${ letterCardsPlayerManual(i) }.png`); 
        // scoreCounterPlayer( numberCardsPlayerManual(i) );

        // =====================================================================
    }
}

createDeckCardsPlayer();

const createDeckCardsPc = () => {
        
    for ( let i = 0; i < 6; i++ ) { //&& manualTruthUse // i < 6 (original)
        
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

        deckCardsPc.push(`assets/cartas/${probabilityOfCardsPc()}${randomLetterCard()}.png`); //original

        // Manual Cards ===================================================================== // call it or not for testing 

        // const numberCardsPcManual = (index) => (manualDeckCardsPc[index].length == 2) ? manualDeckCardsPc[index][0] : 10 
        // const letterCardsPcManual = (index2) => (manualDeckCardsPc[index2].length == 2) ? manualDeckCardsPc[index2][1] : manualDeckCardsPc[index2][2]

        // deckCardsPc.push(`assets/cartas/${ numberCardsPcManual(i) }${ letterCardsPcManual(i) }.png`); 
        // scoreCounterPc( numberCardsPcManual(i) )

        // =====================================================================

    }
}

createDeckCardsPc();

// Modificate the Html for add the images // ========================


const addImageHtml = async () => {
    if ( counterFunctionPlayer < 6 ) {
        
        let imageDesignerPlayer = document.createElement('img');
        imageDesignerPlayer.classList.add('cardImage');
        imageDesignerPlayer.setAttribute('src', deckCardsPlayer[counterFunctionPlayer]);
        imageContainerPlayer.append(imageDesignerPlayer);
        
        theTruthPlayer = true;
        let realSumScorePlayer = scoreCounterPlayer( counterFunctionPlayer, true )
        counterFunctionPlayer++;

        if (realSumScorePlayer > 21) {
            
            counterFunctionPlayer = 6, counterFunctionPc = 0;            
            gameFunctionCardsPc(realSumScorePlayer);            
            
        }
        
        if ( realSumScorePlayer === 21 && (arrayOfValuesPlayer[0] == 10 || arrayOfValuesPlayer[0] == 11 ) ) { // if the player reach a natural 21

            counterFunctionPlayer = 6, counterFunctionPc = 0;
            return await gameFunctionCardsPc( true );

        } else if ( realSumScorePlayer === 21 ) { // if the player reach a no natural 21
            
            counterFunctionPlayer = 6, counterFunctionPc = 0;
            return await gameFunctionCardsPc();
        } 

        btnNewGame.disabled = true;

    } else { return counterFunctionPlayer }    
}

btnAskCard.addEventListener('click', addImageHtml);


// Show the cards of the Pc after the play of the Player // ========================


const gameFunctionCardsPc = async (value) => {

    for ( let i = 0; counterFunctionPlayer >= 6 && counterFunctionPc == 0 && i <= 5; i++ ) {

        let imageDesignerPc = document.createElement('img');
        imageDesignerPc.classList.add('cardImagePc');
        imageDesignerPc.setAttribute('src', deckCardsPc[i]);
        imageContainerPc.append(imageDesignerPc);
        scoreBarPc.innerHTML = arrayOfValuesPc[i];                
        
        theTruthPc = true;
        let realSumScorePc = scoreCounterPc( i, true );

        let stopLoop = await functionOfWinner ( sumPlayer, realSumScorePc, i );
        if ( stopLoop ) { break }

        await new Promise( resolve => setTimeout ( resolve, 1000 ) );
    }
    btnNewGame.disabled = false;
}


// Score Bar of the Player and the Pc // ========================

function scoreCounterPlayer (randomMathNumber, trueValue) { 
    if (arrayOfValuesPlayer.length < 6) { 
        (randomMathNumber ==='J' || randomMathNumber ==='K' || randomMathNumber ==='Q') ? arrayOfValuesPlayer.push(10) :
        (randomMathNumber ==='A') ? arrayOfValuesPlayer.push(1) : arrayOfValuesPlayer.push( parseInt(randomMathNumber) );
    }
    
    if (theTruthPlayer) { 
        
        if (trueValue) {
            
            if ( arrayOfValuesPlayer[randomMathNumber] == 1 && sumPlayer > 10 )  { 
                                
                sumPlayer += arrayOfValuesPlayer[randomMathNumber]; 
                scoreBarPlayer.innerHTML = sumPlayer;
                
            }
            else if ( arrayOfValuesPlayer[randomMathNumber] == 1  && sumPlayer <= 10 ) {  //here is the chance of the value of the As
                
                arrayOfValuesPlayer[randomMathNumber] = 11;
                sumPlayer += arrayOfValuesPlayer[randomMathNumber]; 
                scoreBarPlayer.innerHTML = sumPlayer;                

            }
            else {
                
                sumPlayer += arrayOfValuesPlayer[randomMathNumber]; 
                scoreBarPlayer.innerHTML = sumPlayer;
                
            }
            
        }
        return sumPlayer;
    }
    
}


function scoreCounterPc (randomMathNumber) { 
    if (arrayOfValuesPc.length < 6) { 
        (randomMathNumber ==='J' || randomMathNumber ==='K' || randomMathNumber ==='Q') ? arrayOfValuesPc.push(10) :
        (randomMathNumber ==='A') ? arrayOfValuesPc.push(1) : arrayOfValuesPc.push( parseInt(randomMathNumber) );
        
    }

    if (theTruthPc) { 

        if ( arrayOfValuesPc[randomMathNumber] == 1 && sumPc > 10 )  { 
                            
            sumPc += arrayOfValuesPc[randomMathNumber]; 
            scoreBarPc.innerHTML = sumPc;
            
        }
        else if ( arrayOfValuesPc[randomMathNumber] == 1  && sumPc <= 10 ) { //here is the chance of the value of the As
            
            arrayOfValuesPc[randomMathNumber] = 11;
            sumPc += arrayOfValuesPc[randomMathNumber];
            scoreBarPc.innerHTML = sumPc;                

        } 
        else {
            
            sumPc += arrayOfValuesPc[randomMathNumber]; 
            scoreBarPc.innerHTML = sumPc;
            
        }
        return sumPc;
    }
    
}


// Decide the Winner // ========================

async function functionOfWinner(realSumScorePlayer, realSumScorePc, counterCards) { 
   
    // natural 21, asking for the chance of an natural push
    
    if ( (arrayOfValuesPlayer[0] + arrayOfValuesPlayer[1] == 21) && counterCards == 1 ) {    
        
        if ( ( arrayOfValuesPc[0] + arrayOfValuesPc[1] ) == 21 ) {
            
            counterFunctionPc = 1, deckCardsPc = [], deckCardsPlayer = [], arrayOfValuesPlayer = [],  arrayOfValuesPc = [];
            setTimeout( () => { alert( 'Bro, WHAT!, ha sido un empate, ambos jugadores sacaron un 21 natural' ) ; }, 400 );
            return true;
        } 

        else if ( sumPc != 21 && counterCards == 1 ) {

            return setTimeout(() => { 

                counterFunctionPlayer = 6, counterFunctionPc = 0
                alert('bro has ganado, sacaste un 21 natural y el pc no');
                return true; 

            }, 400); 
        }
    } 
      
    // no natural 21, asking for the chance of a no natural push
    
    if ( realSumScorePlayer == 21 && realSumScorePc >= 21) { // && counterCards > 1

        if ( realSumScorePc == 21) { 

            arrayOfValuesPlayer = [], counterFunctionPlayer = 0; 
            setTimeout(() => { alert('bro ha sido un empate, ambos jugadores sacaron un 21 no natural');}, 400);
            return true;

        } if ( realSumScorePc > 21 ){
            counterFunctionPlayer = 6, counterFunctionPc = 0;
            setTimeout(() => { alert('bro has ganado, el pc se paso y tu clavaste el 21 '); }, 400);
            return true; 
    
        }
        else {
    
            counterFunctionPlayer = 6, counterFunctionPc = 0;
            setTimeout(() => { alert('bro has ganado, clavaste el 21'); }, 400);
            return true; 
        }
        
    }

    // PLAYER 

    if ( realSumScorePlayer > 21 ) {

            arrayOfValuesPlayer = [], counterFunctionPlayer = 6;
            setTimeout(() => { alert('bro has perdido, te pasaste de 21');}, 400);
            return true; 
        }

    
    // PC

    if ( realSumScorePc == 21){

        counterFunctionPc = 1, deckCardsPc = [], arrayOfValuesPc = [];
        setTimeout(() => {alert('bro has perdido, la cpu clavo el 21');}, 400);

        return true;
    }

    if (realSumScorePc > 21 ) { 

        counterFunctionPc = 1, arrayOfValuesPc = [];
        setTimeout(() => {alert('bro has ganado, el cpu se pasó de 21');}, 400);
        return true 
    }    
    
    
    // DRAW
    

    if ( realSumScorePc === realSumScorePlayer ) { 
        
        counterFunctionPc = 1, arrayOfValuesPc = [], arrayOfValuesPlayer = [];
        setTimeout(() => {alert('bro ha sido un empate');}, 400)
        return true; 
    }
    
    
    if (realSumScorePc > realSumScorePlayer && realSumScorePc < 21) {
        
        counterFunctionPc = 1, arrayOfValuesPc = [];
        setTimeout(() => {alert('bro has perdido, el cpu saco un puntaje mayor al tuyo');}, 400);
        return true; 
    }

}    


// Button Actions // ========================


btnNewGame.addEventListener('click' , ()=> {

    imageContainerPlayer.innerHTML = '', imageContainerPc.innerHTML = '', scoreBarPlayer.innerHTML = 0, scoreBarPc.innerHTML = 0;

    deckCardsPlayer = [], deckCardsPc = [], arrayOfValuesPlayer = [], arrayOfValuesPc = [];
    
    counterFunctionPlayer = 0, counterFunctionPc = 0, sumPlayer = 0, sumPc = 0, theTruthPlayer = 0, theTruthPc = 0;

    createDeckCardsPlayer();
    createDeckCardsPc();

    });

btnStay.addEventListener('click', ()=> {
    if ( counterFunctionPlayer < 6 ) {

        counterFunctionPlayer = 6, counterFunctionPc = 0;
        gameFunctionCardsPc();        
    }
});