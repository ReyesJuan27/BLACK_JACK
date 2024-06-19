// Html buttons and images containers


const btnNewGame = document.querySelector('#btnNewGame');
const btnAskCard = document.querySelector('#btnAskCard');
const btnStop = document.querySelector('#btnStop');

const imageContainerPlayer = document.querySelector('.imagesCardsPlayer');
const imageContainerPc = document.querySelector('.imagesCardsPc');


// Basic arrays and counter what its used in the functions 


let deckCardsPlayer = [];
let deckCardsPc = [];
let counterFunctionPlayer = 0;


// Random cards for choise one of the nummbers and letters


const randomLetterCard = ()=> {
    let posibleLetters = ['C','D','H','S'];

    let ramdomIndex = Math.floor( Math.random() * posibleLetters.length );

    let ramdomLetter = posibleLetters[ramdomIndex];

    return ramdomLetter
}


// Create a New Deck for the Player and CPU Randomly


const createDeckCardsPlayer = () => {

    if ( deckCardsPlayer.length >= 5 ) {

        imageContainerPlayer.innerHTML = ''
        imageContainerPc.innerHTML = ''
        deckCardsPlayer = [];
        deckCardsPc = [];
        counterFunctionPlayer = 0;
        createDeckCardsPc();
        console.log('nuevas Barajas');

    } 

    for ( let i = 0; i < 5; i++ ) {
        
        let randomNumberCard = 2 + Math.random() * 8;
        randomNumberCard = Math.round(randomNumberCard);

        deckCardsPlayer.push(`assets/cartas/${randomNumberCard}${randomLetterCard()}.png`);
    }
    console.log(deckCardsPlayer);
      
}

const especialCardsDeck = () => {
    const probabilityFaceCards = 0.3;
    const probabilityAcesCards = 0.1;
    const faceCardsGroup = [ 'J', 'Q', 'K'];
    
    const randomValue = Math.random();

    if ( randomValue < probabilityFaceCards ) {

        const randomFace = faceCardsGroup[Math.floor(Math.random() * faceCardsGroup.length)];
        return randomNumberCard = randomFace;

    } else if ( randomValue < probabilityAcesCards ) {
        return randomNumberCard = 'A'
    }
}


// const createDeckCardsPlayer = () => {

//     if (deckCardsPlayer.length >= 5) {

//         imageContainerPlayer.innerHTML = '';
//         imageContainerPc.innerHTML = '';
//         deckCardsPlayer = [];
//         deckCardsPc = [];
//         counterFunctionPlayer = 0;
//         createDeckCardsPc();
//         console.log('Nuevas Barajas');

//     }

//     for (let i = 0; i < 5; i++) {
//         const cardValue = especialCardsDeck(); // Utiliza la función especialCardsDeck para obtener el valor de la carta
//         deckCardsPlayer.push(`assets/cartas/${cardValue}${randomLetterCard()}.png`);
//     }
//     console.log(deckCardsPlayer);
// }

// const especialCardsDeck = () => {
//     const probabilityFaceCards = 0.3;
//     const probabilityAcesCards = 0.1;
//     const faceCardsGroup = ['J', 'Q', 'K'];

//     const randomValue = Math.random();

//     if (randomValue < probabilityFaceCards) {
//         const randomFace = faceCardsGroup[Math.floor(Math.random() * faceCardsGroup.length)];
//         return randomFace;
//     } else if (randomValue < probabilityAcesCards) {
//         return 'A';
//     } else {
//         // Si no es una carta especial, devuelve un número aleatorio
//         const randomNumberCard = 2 + Math.floor(Math.random() * 7); // Ajusta el rango según tus necesidades
//         return randomNumberCard.toString();
//     }
// }



const createDeckCardsPc = () => {
        
    for ( let i = 0; i < 5; i++ ) {
        
        let randomNumberCard = 2 + Math.random() * 8;
        randomNumberCard = Math.round(randomNumberCard);

        deckCardsPc.push(`assets/cartas/${randomNumberCard}${randomLetterCard()}.png`);
    }
    console.log(deckCardsPc,'soy pc');
     
}


// If the User want to asked a new card and show in the game


const askCardFunctionPlayer = () => {
    if ( counterFunctionPlayer < 5 ) {

        let imageDesignerPlayer = document.createElement('img');
        imageDesignerPlayer.classList.add('cardImage');
        imageDesignerPlayer.setAttribute('src', deckCardsPlayer[counterFunctionPlayer]);
        imageContainerPlayer.append(imageDesignerPlayer);
        
        counterFunctionPlayer++;
        gameFunctionCardsPc();

    }
}


// Show the cards of the Pc after the game of the Player


const gameFunctionCardsPc = async () => {
    
    for ( let i = 0; counterFunctionPlayer == 5 && i <= 4 ; i++ ) {
        
        let imageDesignerPc = document.createElement('img');
        imageDesignerPc.classList.add('cardImagePc');
        imageDesignerPc.setAttribute('src', deckCardsPc[i]);
        imageContainerPc.append(imageDesignerPc);

        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}


// Some of the invocates of functions and event Listenner


createDeckCardsPlayer();
createDeckCardsPc();


// Button Actions


btnAskCard.addEventListener('click', askCardFunctionPlayer);
btnNewGame.addEventListener('click', createDeckCardsPlayer);
btnStop.addEventListener('click', ()=> {

    if ( counterFunctionPlayer < 5 ) {
        counterFunctionPlayer = 5;
        gameFunctionCardsPc();
    }
    
});




