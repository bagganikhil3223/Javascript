'use strict';
/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = 'Correct Number';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23; // value is used in case of input field
console.log(document.querySelector('.guess').value)
*/

let secretNumber = Math.trunc(Math.random()*20)+1; // here trunc will delete all the digits after decimal
// and will give us numbers till 19 as 20 will be excluded, so we added 1 to include 20 as well
// secretNumber is also a state variable

let score = 20; // score variable can be referred to as state variable as it is holding the score state in the app.
let highScore = 0;

// using DRY to avoid duplicate code
const displayMessage = function(message) {
    document.querySelector('.message').textContent = message;
}
  

const gameLogic = function () {
    const guess = +document.querySelector('.guess').value;
    console.log(guess, typeof guess);

    // when there is no input
    if(!guess) {
        // document.querySelector('.message').textContent = '⛔ No Number';
        displayMessage('⛔ No Number');
        // when player wins
    } else if(guess === secretNumber) {
        // document.querySelector('.message').textContent = '🎉 Correct Number!';
        displayMessage('🎉 Correct Number!')
        document.querySelector('.number').textContent = secretNumber; 
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width='30rem'; // it will be inline style as we are directly applying it on style property

        if(score > highScore) {
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        }
        // when guess is wrong
    } else if(guess !== secretNumber) {
        if(score > 1) {
            //document.querySelector('.message').textContent = guess > secretNumber ? '📈 Too high!' : '📉 Too Low!';
            displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too Low!');
        score--;
        document.querySelector('.score').textContent = score;
        } else {
            //document.querySelector('.message').textContent = '💥 You lost the game';
            displayMessage('💥 You lost the game');
            document.querySelector('.score').textContent = 0;
        }
        
        // when guess is too high
    }

    // else if (guess > secretNumber) {
    //     if(score > 1) {
    //         document.querySelector('.message').textContent = '📈 Too high!';
    //     score--;
    //     document.querySelector('.score').textContent = score;
    //     } else {
    //         document.querySelector('.message').textContent = '💥 You lost the game';
    //         document.querySelector('.score').textContent = 0;
    //     }
    //     // when guess is too low
    // } else if (guess < secretNumber) {
    //     if(score > 1) {
    //     document.querySelector('.message').textContent = '📉 Too Low!';
    //     score--;
    //     document.querySelector('.score').textContent = score;
    //     } else {
    //         document.querySelector('.message').textContent = '💥 You lost the game';
    //         document.querySelector('.score').textContent = 0;
    //     }
    // }

}
document.querySelector('.check').addEventListener('click',gameLogic);


const playAgain = function() {
score = 20;
secretNumber = Math.trunc(Math.random()*20)+1;
document.querySelector('.message').textContent = 'Start guessing...';
document.querySelector('.score').textContent = score;
document.querySelector('.number').textContent = '?';
document.querySelector('.guess').value = '';
document.querySelector('body').style.backgroundColor = '#222';
document.querySelector('.number').style.width='15rem';

}

document.querySelector('.again').addEventListener('click',playAgain);
