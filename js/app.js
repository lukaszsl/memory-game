const container = document.querySelector('.container');
const deck = document.querySelector('.deck');
const modal = document.querySelector('.modal');
const moves = document.querySelector('.moves');
const movesNumber = document.querySelector('.moves-number');
const playAgainBtn =document.querySelector('.modal__button');
const restartBtn = document.querySelector('.restart');

//Create a list that holds all of your cards
const cards = document.getElementsByClassName('card');

//Create an array of cards
let cardsList = Array.from(cards);
let matchCounter = 0;
let moveCounter = 0;
let openCardsList = [];

/*
	* Display the cards on the page
	*   - shuffle the list of cards using the provided "shuffle" method
	*   - loop through each card and create its HTML
	*   - add each card's HTML to the page
	*/

	newGame();

	deck.addEventListener('click', function(event) {
		showCard(event); // Show card after click
		addToList(event); // Add card to the list to compare
		compareCards(); // Compare two open cards
		countMoves(event);

		// Display final message if all cards match
		if (ifAllMatch()) {
			finalMessage();
		}
	});

	restartBtn.addEventListener('click', function() {
		newGame();
	});

	playAgainBtn.addEventListener('click', function() {
		newGame();
	});

function newGame() {
	moveCounter = 0;
	moves.innerText = moveCounter;
	cardsList = shuffle(cardsList);
	addShuffledCards();
	container.style.display = 'flex';
	modal.style.display = 'none';

}

//Add shuffled cards to the DOM
function addShuffledCards() {
	deck.innerHTML = '';
	for (let i = 0; i < cardsList.length; i++) {
		deck.innerHTML += cardsList[i].outerHTML;
	}
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

/*
	* set up the event listener for a card. If a card is clicked:
	*  - display the card's symbol (put this functionality in another function that you call from this one)
	*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
	*  - if the list already has another card, check to see if the two cards match
	*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
	*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
	*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
	*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
	*/


// Add the open card to the list of open cards
function addToList(card) {
	openCardsList.push(card);
}

function showCard(card) {
	card.target.classList.toggle('open');
	card.target.classList.toggle('show');
}

function compareCards() {
	if(openCardsList.length > 1) {
		if(openCardsList[0].target.innerHTML === openCardsList[1].target.innerHTML) {
			console.log('match');
			ifMatch(openCardsList);
		} else {
			console.log('do not much');
			ifDontMatch(openCardsList);
		}
			openCardsList = [];
	}
}

function ifMatch(cards) {
	for (card of cards) {
		card.target.classList.toggle('match');
	}
}

// Hide cards(with delay) if not match
function ifDontMatch(cards) {
	setTimeout(function() {
		for (card of cards) {
			card.target.classList.remove('open');
			card.target.classList.remove('show');
		}
	}, 700);
}

function countMoves(card) {
	if (card.target.classList[0] === 'card') {
		moveCounter++;
		moves.innerText = moveCounter;
	}
}

// Check if all cards match
function ifAllMatch() {
	matchCounter = 0;

	for (card of cards) {
		if (card.className === 'card open show match') matchCounter++;
	}

		if (matchCounter === 16) {
			return true;
		}
		else {
			return false;
		}
}

//Function which display modal with scores in the end of the game
function finalMessage() {
	container.style.display = 'none';
	modal.style.display = 'flex';
	movesNumber.innerText = moveCounter;
}
