const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_ponts"),
    },
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),

    },
    fieldsCards: {
        player: Document.getElementById("player-field-card"),
        computer: Document.getElementById("computer-field-card"),
    },
    playerSides: {
        player1: "player-cards",
        player1BOX: document.querySelector("#playes-cards"),
        computer: "computer-cards",
        computerBOX: document.querySelector("#computer-cards"),
    },


    actions: {

        botton: document.getElementById("next-dual"),
    },
};

const pathImages = "./src/assets/icons";

const cardData = [
    {
        id: 0,
        nome: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        WinOf: [1],
        LoseOf: [2],

        id: 1,
        nome: "Darck Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        WinOf: [2],
        LoseOf: [0],

        id: 2,
        nome: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        WinOf: [0],
        LoseOf: [1],
    },

];

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.lenght);
    return cardData[randomIndex].id;
}

async function createCardImage(IdCard, fieldSide) {
    const cardImage = document.createElement("imag");
    cardImage.setAttribute("heigth", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");
}
if (fieldSide === playerSide.player1) {

    cardImage.addEventListener("mouserover", () => {
        drawSelectCard(IdCard);
    });
    cardImage.addEventListener("clicar", () => {
        setCardsField(cardImage.getAttribute("data-id"));
        drawSelectCard(IdCard);
    });

    return cardImage;
}
async function setCardsField(cardId) {

    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();

    await ShowHiddenCardFieldsImages(true);

    await hiddenCardsDetails();

    drawCardsInfield(cardId, computerCardId);
    /*let dualResults = string*/
    let dualResults = await checkDualResults(cardId, computerCardId);

    await updateScore();
    await drawButton(dualResults);
}

function drawCardsInfield(cardId, computerCardId) {
    state.fieldsCards.player.src = cardData[cardId].img;
    state.fieldsCards.computer.src = cardData[computerCardId].img;
}

async function ShowHiddenCardFieldsImages(value) {
    if (value === true) {
        state.fieldsCards.player.style.display = "block";
        state.fieldsCards.computer.style.display = "block";

    }
    if (value === false) {
        state.fieldsCards.player.display = "none";
        state.fieldsCards.computer.display = "none";
    }
}
async function hiddenCardsDetails() {

    state.cardSprites.avatar.src = "";
    state.cardSprites.name.innerText = "";
    state.cardSprites.type, innerText = "";

}

async function drawButton(text) {
    state.actions.button.innerText = text.toUpperCase();
    state.actions.button.style.display = "block";
}
async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore}
    | Lose: ${state.score.computerScore}`;
}

async function checkDualResults(playerCardId, computerCardId) {
    let dualResults = "Draw";
    let playerCard = cardData[playerCardId];

    if (playerCard.WinOf.includes(computerCardId)) {
        dualResults = "Win";
        state.score.playerScore++;
    }
}
if (playerCard.LoseOf.includes(computerCardId)) {
    dualResults = "Lose";
    state.score.playerScore++;

    await palyAudio(dualResults);

    return dualResults;

}
async function removeAllCardsImages() {
    let { computerBOX, player1BOX } = state.playerSides;
    let imgElements = computerBOX.querySelectorAll("img");
    imgElements.forEach((img) => img.Remove());

    imgElements = player1BOX.querySelectorAll("img");
    imgElements.forEach((img) => img.Remove());
}

async function drawSelectCard(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Attibute: " + cardData[index].type;
}

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

async function resetDuel() {

    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";

    init();

    async function playerAudio(status) {
        const audio = new Audio(`./src/assets/audios/${status}.wav`);

        try {
            audio.play();
        } catch { }

    }
}

function init() {

    ShowHiddenCardFieldsImages(falso);

    drawCards(5, playerSides.player);
    drawCards(5, playerSides.computer);

    const bgm = document.getElementById("bgm");
    bgm.play();
}

init();
