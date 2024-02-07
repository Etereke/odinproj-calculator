const OPERATORS = ['+', '-', '*', '/'];
const buttons = document.querySelector('.buttons');
const display = document.querySelector('.display');
let firstNum = '';
let secondNum = '';
let operator = '';
// If firstNum is a result of an operation, 
// backspacing or entering a digit while no 
// operator is present should reset firstNum to 0
let isResult = false;

buttons.addEventListener('click', handleClick);
window.addEventListener('keydown', handleKeyboard);
populateDisplay();


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
function handleKeyboard(e) {
    const value = e.key;
    if ('0' <= value && value <= '9') {
        handleDigit(value);
    } else if (OPERATORS.includes(value)) {
        handleOperator(value);
    } else if (value === '.') {
        handleDecimal();
    } else if (value === '=' || value === 'Enter') {
        handleEvaluate();
    } else if (value === 'Delete') {
        clearDisplay();
    } else if (value === 'Backspace') {
        handleBackspace();
    }
    populateDisplay();
}

function handleDigit(value) {
    if (operator === '') {
        if (isResult || firstNum === '0') {
            firstNum = value;
            isResult = false;
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
        isResult = false;
    }
    if (secondNum === '') {
        operator = value;
    } else {
        firstNum = operate(+firstNum, +secondNum, operator);
        operator = value;
        secondNum = '';
        isResult = true;
    }
}
function handleEvaluate() {
    if (secondNum !== '') {
        firstNum = operate(+firstNum, +secondNum, operator);
        operator = '';
        secondNum = '';
        isResult = true;
    }
}
function handleDecimal() {
    if (operator === '') {
        if (isNaN(+firstNum) || +firstNum === 0 || isResult || firstNum === '') {
            firstNum = '0.';
            isResult = false;
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
    if (operator === '') {
        firstNum = firstNum.length > 1 && !isResult
            ? firstNum.slice(0, firstNum.length - 1)
            : '0';
            isResult = false;
    } else if (secondNum === '') {
        operator = '';
    } else {
        secondNum = secondNum.slice(0, secondNum.length - 1);
    }
}


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
    isResult = false;
}
function populateDisplay() {
    display.classList.remove('display-overflow', 'display-overflow-extra', 'display-overflow-max');
    if (+firstNum === Infinity || +firstNum === -Infinity) {
        firstNum = 'You tried to divide by 0... shame on you!';
        secondNum = '';
        operator = '';
        isResult = true;
    }
    display.textContent = `${firstNum || '0'} ${operator} ${secondNum}`;
    if (display.textContent.length > 17) {
        display.classList.add('display-overflow');
    }
    if (display.textContent.length > 24) {
        display.classList.add('display-overflow-extra');
    }
    if (display.textContent.length > 31) {
        display.classList.add('display-overflow-max');
    }
}
