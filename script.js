const cellElement = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";

const WINNING_COMBINATIONS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const winMsg = document.querySelector("[data-win-msg]");
const winMsgElem = document.getElementById("winningMessage");

const restartBtn = document.getElementById("restartBtn");

let circleTurn;

startGame();


restartBtn.addEventListener("click",startGame);

function startGame() {
    circleTurn = false;
    cellElement.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener("click",handleClick);
        cell.addEventListener("click",handleClick, { once:true});
    });
    setBoardHoverCLass();
    winMsgElem.classList.remove("show");
}

function handleClick(event) {
   
    const cell = event.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    //plave mark
    placeMark(cell,currentClass);
    //chevk for win
    if(checkWin(currentClass)) {
       endGame(false);
    } else if(isDraw()) {
        endGame(true);
    }else {
    //switch turn
    switchTurn();
    setBoardHoverCLass();
    }
}


function placeMark(cell,currentClass) {
    cell.classList.add(currentClass);
}

function switchTurn() {
    circleTurn = !circleTurn;
}

function setBoardHoverCLass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElement[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cellElement].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function endGame(draw) {
    if(draw) {
        winMsg.innerHTML = "Its A Draw";
    } else {
        winMsg.innerHTML = `${circleTurn ? "O's": "X's"} Wins`;
    }
    winMsgElem.classList.add("show");
}