(() => {

    let user = 0;
    let random = 0;
    let card = 0;
    let deck = [];
    let newCard;
    let suits = ["clubs", "diamonds", "hearts", "spades"];
    let ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
    let cardImage;
    let cardNumberPlayer;
    let cardNumberDealer;

    let startButton = document.getElementById("start");
    let hitButton = document.getElementById("hit");
    let standButton = document.getElementById("stand");

    startButton.addEventListener("click", function () {
        start();
    })

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

    function shuffle(a) {
        let j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
    }

    function topCard() {
        newCard = deck.pop();
        console.log(newCard);
    }

    function setCardsPlayer() {
        cardImage[cardNumberPlayer].setAttribute("src", newCard.image);
        cardNumberPlayer++;
    }

    function setCardsDealer() {
        cardImage[cardNumberDealer].setAttribute("src", newCard.image);
        cardNumberDealer++;
    }

    function cardReset() {
        for (let x = 0; x < cardImage.length; x++) {
            cardImage[x].setAttribute("src", "images/black_border.png")
        }
    }

    function start() {
        cardImage = document.getElementsByClassName("cards");
        user = 0;
        random = 0;
        card = 0;
        deck = [];
        cardNumberPlayer = 5;
        cardNumberDealer = 0;
        cardReset();
        createDeck();
        shuffle(deck);
        console.log(deck);
        topCard();
        setCardsPlayer();
        user += newCard.value;
        topCard();
        setCardsDealer()
        card += newCard.value;
        topCard();
        setCardsPlayer();
        topCard();
        setCardsDealer()
        card += newCard.value;
        console.log("start pc " + card);
        user += newCard.value;
        console.log("start user " + user);
        //askCard();
    }


    function dealerCard() {
        if (card < 15) {
            topCard();
            setCardsDealer();
            card += newCard.value;
            console.log("computer " + card);
            dealerCard();
        }
    }

    hitButton.addEventListener('click', function () {
        topCard();
        setCardsPlayer();
        user += newCard.value;
        console.log("user " + user);
        if (user > 21) {
            alert("you are busted, GAME OVER!!");
        }
    })

    standButton.addEventListener("click", function (){
        dealerCard();
        winner();
    })

    /*function askCard() {
        let question = window.confirm("Do you want to draw another card?");
        if (question == true) {
            topCard();
            setCardsPlayer();
            user += newCard.value;
            console.log("user " + user);
            if (user > 21) {
                alert("you are busted, GAME OVER!!");
            } else {
                askCard();
            }
        } else if (user > 21) {
            alert("you are busted, GAME OVER!!");
        } else {
            dealerCard();
            winner();
        }
    }*/

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

    function playAgain() {
        let again = confirm("want to play again?");
        if (again == true) {
            start();
        }
    }


})();