// Game Values
let min = 1,
    max = 5,
    winningNum = getNum(),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listner
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    console.log(guess);
    // Validate input
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number b/w ${min} and ${max}.`, 'red');
    }

    // Check if won
    if(guess === winningNum){
        // Game Over - won
        gameOver(true, `Congratulations! You Have Won!!`, 'teal');
    } else {
        // Wrong number
        guessesLeft -= 1;

        if (guessesLeft === 0){
            // Game Over - lost
            gameOver(false, `Game Over! The Correct Number was ${winningNum}.`, 'crimson')
        } else {
            // Game Continues
            guessInput.style.borderColor = 'darkred';

            // Clear input
            guessInput.value = '';

            // Set message
            setMessage(`${guess} is not correct. ${guessesLeft} guesses left.`, 'darkred')
        }
    }
});

// Game Over
function gameOver(won, msg, color){
    // Disable input
    guessInput.disabled = true;
    // Make border green
    guessInput.style.borderColor = color;
    // Set message
    setMessage(msg, color);

    // Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again'; 
}

// Get Winning Number
function getNum(){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Set Message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}