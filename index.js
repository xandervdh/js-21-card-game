(() => {
    //all the variables initiated and getting some elements out of the html
    let user = 0;
    let card = 0;
    let deck = [];
    let newCard;
    let suits = ["clubs", "diamonds", "hearts", "spades"];
    let ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
    let cardImage;
    let cardNumberPlayer;
    let cardNumberDealer;
    let dSecondCard;
    let dCounter = document.getElementById("dCount");
    let pCounter = document.getElementById("pCount");

    let startButton = document.getElementById("start");
    let hitButton = document.getElementById("hit");
    let standButton = document.getElementById("stand");

    //event listener for the start button
    startButton.addEventListener("click", function () {
        hitButton.disabled = false;
        standButton.disabled = false;
        startButton.disabled = true;
        start();
    })

    //event listener for the hit button
    hitButton.addEventListener('click', function () {
        setCardsPlayer();
        console.log("user " + user);
        if (user > 21) {
            hitButton.disabled = true;
            standButton.disabled = true;
            startButton.disabled = false;
            resetAnimation();
            setTimeout(function (){
                cardImage[1].setAttribute("src", dSecondCard.image);
                cardImage[1].classList.toggle("flip");
            }, 100)
            card += dSecondCard.value;
            addDealerCounter()
            setTimeout(function (){
                alert("you are busted, GAME OVER!!");
            },200);
        }
    })

    //event listener for stand button
    standButton.addEventListener("click", function (){
        hitButton.disabled = true;
        standButton.disabled = true;
        startButton.disabled = false;
        cardImage[1].classList.remove("flip");
        setTimeout(function (){
            cardImage[1].setAttribute("src", dSecondCard.image);
            cardImage[1].classList.toggle("flip");
        }, 100)
        card += dSecondCard.value;
        addDealerCounter()
        cardNumberDealer = 2;
        setTimeout(function (){dealerCard()}, 1000);
        setTimeout(function (){winner()}, 2000);
    })

    //creating the deck of cards
    function createDeck() {
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                let r = "";
                if (ranks[j] == "J" || ranks[j] == "Q" || ranks[j] == "K") {
                    r = 10;
                } else if (ranks[j] == "A") {
                    r = 11;
                } else {
                    r = j + 2;
                }
                let card = {'rank': ranks[j], 'suit': suits[i], 'value': r};
                deck.push(card);
            }
        }
        for (let x = 0; x < 52; x++) {
            let numbers = x + 1
            let image = "images/" + numbers + ".png";
            deck[x].image = image;
        }
    }

    //shuffle the deck
    function shuffle(a) {
        let j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
    }

    //put the top card into a variable
    function topCard() {
        newCard = deck.pop();
        console.log(newCard);
    }

    //put the player's cards on the playing field and update the counter
    function setCardsPlayer() {
        topCard();
        cardImage[cardNumberPlayer].setAttribute("src", newCard.image);
        cardImage[cardNumberPlayer].classList.toggle("flip");
        user += newCard.value;
        addPlayerCounter();
        cardNumberPlayer++;
    }

    //put the dealer's cards on the playing field and update the counter
    function setCardsDealer() {
        topCard();
        cardImage[cardNumberDealer].setAttribute("src", newCard.image);
        cardImage[cardNumberDealer].classList.toggle("flip");
        card += newCard.value;
        addDealerCounter();
        cardNumberDealer++;
    }

    //save the dealer's blind card
    function secondCardDealer() {
        topCard();
        cardImage[1].setAttribute("src", "images/red_back.png");
        cardImage[1].classList.toggle("flip");
        dSecondCard = newCard;
    }

    //reset the playing field to the black borders
    function cardReset() {
        for (let x = 0; x < cardImage.length; x++) {
            cardImage[x].setAttribute("src", "images/black_border.png")
        }
    }

    //update the dealer's counter
    function addDealerCounter() {
        dCounter.innerHTML = card;
    }

    //update the player's counter
    function addPlayerCounter() {
        pCounter.innerHTML = user;
    }

    //start new game
    function start() {
        cardImage = document.getElementsByClassName("cards");
        user = 0;
        card = 0;
        deck = [];
        cardNumberPlayer = 5;
        cardNumberDealer = 0;
        dSecondCard = 1;
        resetAnimation();
        cardReset();
        createDeck();
        shuffle(deck);
        console.log(deck);
        setCardsPlayer();
        setTimeout(function (){ setCardsDealer()}, 1000);
        setTimeout(function (){ setCardsPlayer()}, 2000);
        setTimeout(function (){ secondCardDealer()}, 3000);
        console.log("start pc " + card);
        console.log("start user " + user);
    }

    //let the dealer decide to take another card or not
    function dealerCard() {
        if (card < 15) {
            setCardsDealer();
            console.log("computer " + card);
            setTimeout(function (){dealerCard()}, 1000);
        }
    }

    //reset the flip animation
    function resetAnimation() {
        for (let x = 0; x < cardImage.length; x++) {
            cardImage[x].classList.remove("flip");
        }
    }

    //announce if you lost or won
    function winner() {
        if (card < user && card <= 21) {
            alert("you won!!");
        } else if (card > user && card <= 21) {
            alert("you lost!!");
        } else if (card > 21 && user > 21) {
            alert("nobody won!!");
        } else if (card == user) {
            alert("draw, you lose!!");
        } else if (card > 21 && card > user)
            alert("you won!!");
    }

})();