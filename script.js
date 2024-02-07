const OPERATORS = ['+', '-', '*', '/'];
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}
function operate(a, b, op) {
    let result = 0;
    switch(op) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
    }
    return parseFloat(result.toFixed(8)).toString();
}
function clearDisplay() {
    firstNum = '0';
    secondNum = '';
    operator = '';
    rewriteFirstnum = true;
}
function isNumeric(str) {
    if (typeof str != "string") return false;
    return !isNaN(str) && 
           !isNaN(parseFloat(str));
  }
function populateDisplay() {
    if (+firstNum === Infinity || +firstNum === -Infinity) {
        firstNum = 'You tried to divide by 0';
        secondNum = '';
        operator = '';
        rewriteFirstnum = true;
    }
    display.textContent = `${firstNum || '0'} ${operator} ${secondNum}`;
}
function handleDigit(value) {
    if (operator === '') {
        if (rewriteFirstnum) {
            firstNum = value;
            rewriteFirstnum = false;
        } else if (firstNum === '0') {
            firstNum = value;
        } else if (firstNum.length < 10) {
            firstNum += value;
        }
    } else {
        if (secondNum === '0') secondNum = value;
        else if (secondNum.length < 10) secondNum += value;
    }
}
function handleOperator(value) {
    if (isNaN(+firstNum)) {
        firstNum = '0';
        rewriteFirstnum = false;
    }
    if (secondNum === '') {
        operator = value;
    } else {
        firstNum = operate(+firstNum, +secondNum, operator);
        operator = value;
        secondNum = '';
    }
}
function handleEvaluate() {
    if (secondNum !== '') {
        firstNum = operate(+firstNum, +secondNum, operator);
        operator = '';
        secondNum = '';
        rewriteFirstnum = true;
    }
}
function handleDecimal() {
    if (operator === '') {
        if (isNaN(+firstNum) || +firstNum === 0 || rewriteFirstnum || firstNum === '') {
            firstNum = '0.';
            rewriteFirstnum = false;
        } else if (!firstNum.includes('.')) {
            firstNum += '.';
        }
    } else {
        if (isNaN(+secondNum) || +secondNum === 0 || secondNum === '') {
            secondNum = '0.';
        } else if (!secondNum.includes('.')) {
            secondNum += '.';
        }
    }
}
function handleBackspace() {
    if (operator === '' || rewriteFirstnum) {
        firstNum = firstNum.length > 1 && !rewriteFirstnum
            ? firstNum.slice(0, firstNum.length - 1)
            : '0';
        rewriteFirstnum = false;
    } else if (secondNum === '') {
        operator = '';
    } else {
        secondNum = secondNum.slice(0, secondNum.length - 1);
    }
}

function handleClick(e) {
    const value = e.target.dataset.value;
    if ('0' <= value && value <= '9') {
        handleDigit(value);
    } else if (OPERATORS.includes(value)) {
        handleOperator(value);
    } else if (value === '.') {
        handleDecimal();
    } else if (value === '=') {
        handleEvaluate();
    } else if (value === 'clear') {
        clearDisplay();
    } else if (value === 'back') {
        handleBackspace();
    }
    populateDisplay();
}

const buttons = document.querySelector('.buttons');
const display = document.querySelector('.display');
buttons.addEventListener('click', handleClick);
let firstNum = '';
let secondNum = '';
let operator = '';
let rewriteFirstnum = true;
populateDisplay();