const cards = document.querySelectorAll('.card');
let firstCard = null;
let secondCard = null;
let isFlipedCard = false;
let lockBoard = false;
let score = 0,
    lives = 5;
let scoreSpan = document.querySelectorAll('.score span'),
    livesSpan = document.querySelectorAll('.lives span');
let correctSound = new Audio('sounds/correct.mp3');
let wonSound = new Audio('sounds/won.mp3');

function setRandomItems(list, eventFunction, count, flipClass) {
    list.forEach((item) => {
        let randomPost = Math.floor(Math.random() * count);
        item.style.order = randomPost;
        item.removeEventListener('click', eventFunction);
        item.addEventListener('click', eventFunction);
        item.classList.remove(flipClass);
    });
}

function setSpansTexts(spans, text) {
    spans.forEach((span) => {
        span.innerHTML = text;
    });
}

setRandomItems(cards, flipCard, 12, 'flip');

function flipCard(event) {
    if (event.target.parentElement.classList.contains('card') && lives > 0) {
        let parentCard = event.target.parentElement;
        if (lockBoard == true) {
            return lockBoard;
        }
        if (parentCard == firstCard) {
            return firstCard;
        }
        parentCard.classList.add('flip');
        if (isFlipedCard == false) {
            isFlipedCard = true;
            firstCard = parentCard;
            return;
        }
        secondCard = parentCard;
        if (firstCard.dataset.pair == secondCard.dataset.pair) {
            disabledCards();
            correctSound.play();
        } else {
            unFlipCards();
        }
    }
}

function disabledCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetCard();
    score = score + 10;
    setSpansTexts(scoreSpan, score);
    if (score == 60) {
        document.querySelector('.message').classList.add('show');
        document.querySelector('.message h1').innerHTML = 'You Won!';
        document.body.style.overflow = 'hidden';
        wonSound.play();
    }
}
function unFlipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetCard();
        if (lives == 0) {
            document.querySelector('.message').classList.add('show');
            document.querySelector('.message h1').innerHTML = 'You Lose!!';
            document.body.style.overflow = 'hidden';
        }
    }, 1000);
    lives--;
    setSpansTexts(livesSpan, lives);
}
function resetCard() {
    firstCard = null;
    secondCard = null;
    isFlipedCard = false;
    lockBoard = false;
}
/*document.querySelector('.close i').addEventListener('click', () => {
    document.querySelector('.message').classList.remove('show');
});*/

document.querySelector('.message button').addEventListener('click', () => {
    lives = 5;
    score = 0;
    setSpansTexts(livesSpan, lives);
    setSpansTexts(scoreSpan, score);
    resetCard();
    setRandomItems(cards, flipCard, 12, 'flip');
    document.querySelector('.message').classList.remove('show');
    document.body.style.overflow = 'unset';
});
