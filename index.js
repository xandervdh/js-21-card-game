(() => {

    let user = 0;
    let random = 0;
    let card = 0;
    let deck = [];
    let newCard;
    let suits = ["clubs", "diamonds", "hearts", "spades"];
    let ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

    let startButton = document.getElementById("start");

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
            let image = numbers + ".png";
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

    /*function randomCard() {
        random = Math.floor(Math.random() * (13 - 1)) + 1;
        if (random == 11 || random == 12 || random == 13){
            random = 10;
        } else if (random == 1){
            random = 11;
        }
    }*/

    function topCard() {
        newCard = deck.pop();
        console.log(newCard);
    }

    function start() {
        user = 0;
        random = 0;
        card = 0;
        deck = [];
        createDeck();
        shuffle(deck);
        console.log(deck);
        topCard();
        user += newCard.value;
        topCard();
        user += newCard.value;
        console.log("start user " + user);
        alert("the total of your 2 starting cards is " + user);
        askCard();
    }


    function dealerCard() {
        if (card < 15) {
            topCard();
            card += newCard.value;
            console.log("computer " + card);
            dealerCard();
        }

    }

    function askCard() {
        let question = window.confirm("Do you want to draw another card?");
        if (question == true) {
            topCard();
            user += newCard.value;
            console.log("user " + user);
            alert("your card is " + newCard.rank + " of " + newCard.suit +  " \nyour current total is " + user);
            if (user > 21) {
                alert("you are busted, GAME OVER!!");
            } else {
                askCard();
            }
        } else if (user > 21) {
            alert("you are busted, GAME OVER!!");
        } else {

            topCard();
            card += newCard.value;
            topCard();
            card += newCard.value;
            console.log("start pc " + card);
            dealerCard();
            winner();
        }
    }

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