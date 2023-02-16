let XorO = true, xArr = [], oArr = [];
const half = 5;
const boxes = document.querySelectorAll('.cell');

eventHandlers();
function eventHandlers() {
    boxes.forEach(box => box.addEventListener('click', boxClickHandler));
}

function boxClickHandler(e) {
    backgroundChanger(e.target.id);
    if (xArr.length >= 3) checkWinner(xArr, "X player win!");
    if (oArr.length >= 3) checkWinner(oArr, "O player win!")
}

function backgroundChanger(parmasId) {
    if (!boxes[parseInt(parmasId) - 1].textContent) {
        boxes[parseInt(parmasId) - 1].innerHTML += XorO ? 'X' : "O";
        XorO ? xArr.push(parseInt(parmasId)) : oArr.push(parseInt(parmasId));
        console.log(xArr, oArr)
        XorO = !XorO;
    }
}

function checkWinner(paramsArray, paramsMessage) {
    let subarrays = getSubArrays(paramsArray)
    let winArray = subarrays.filter(item => parseInt(item) !== half).filter((item) => { if (item.every(num => num % 2 === 0) || item.every(num => num % 2 !== 0)) return item; })
    if (winArray.some((arr) => arr.reduce((a, b) => a + b) === 10 && arr.length === 2) && paramsArray.includes(half)) {
        winwinwin(paramsMessage)
        return;
    }
    winArray = subarrays.filter(item => !item.includes(half)).filter(arr => arr.length === 3).map(arr => arr.sort((a, b) => a - b))[0]
    if (((winArray[0] + winArray[2]) / 2 === winArray[1]) && (winArray[2] - winArray[1] === winArray[1] - winArray[0]) && (winArray[2] % 2 !== 0 && winArray[0] % 2 !== 0)) {
        winwinwin(paramsMessage)
        return;
    }
    if (paramsArray.length === 5) {
        winwinwin("Draw");
        return;
    }
}

function winwinwin(paramsMessage) {
    setTimeout(() => {
        alert(paramsMessage);
    }, 100)

    setTimeout(() => {
        location.reload();
    }, 2000)
}

//stack overflow
function getSubArrays(arr) {
    if (arr.length === 1) return [arr];
    else {
        subarr = getSubArrays(arr.slice(1));
        return subarr.concat(subarr.map(e => e.concat(arr[0])), [[arr[0]]]);
    }
}
