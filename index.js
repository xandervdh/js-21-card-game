(() => {

    let user = 0;
    let random = 0;
    let card = 0;
    start();

    function randomCard() {
        random = Math.floor(Math.random() * (13 - 1)) + 1;
        console.log("original" + random);
        if (random == 11 || random == 12 || random == 13){
            random = 10;
        } else if (random == 1){
            random = 11;
        }
        console.log(random);
    }

    function start() {
        randomCard();
        user += random;
        console.log("user start " + random);
        alert("your current card is " + random);
        askCard();
    }


    function dealerCard() {
        if (card < 15) {
            randomCard();
            console.log("new card " + random)
            card += random;
            console.log("computer " + card);
            dealerCard();
        }

    }

    function askCard() {
        let question = window.prompt("Do you want to draw another card?")
        if (question == "yes") {
            randomCard();
            user += random;
            console.log("user " + user);
            alert("your card is " + random + " your current total is " + user);
            if (user > 21) {
                alert("you are busted, GAME OVER!!");
                playAgain();
            } else {
                askCard();
            }
        } else {
            randomCard();
            card += random;
            console.log("computer start " + card);
            dealerCard();
            winner();
        }
    }

    function winner() {
        if (card < user && card <= 21) {
            alert("you won!!");
            playAgain();
        } else if (card > user && card <= 21) {
            alert("you lost");
            playAgain();
        }
    }

    function playAgain() {
        let again = prompt("want to play again?");
        if (again == "yes"){
            start();
        }
    }


})();