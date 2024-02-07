const OPERATORS = ['+', '-', '*', '/'];
const COMMANDS = ['='];
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
    return result;
}
function resetValues() {
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
    display.textContent = `${firstNum} ${operator} ${secondNum}`;
}
function handleClick(e) {
    const value = e.target.dataset.value;
    if ('0' <= value && value <= '9') {
        if(operator === '') {
            if (rewriteFirstnum) {
                firstNum = value;
                rewriteFirstnum = false;
            } else if (+firstNum === 0) {
                firstNum = value
            } else {
                firstNum += value
            }
        } else {
            if (+secondNum === 0) secondNum = value;
            else secondNum += value;
        }
    } else if (OPERATORS.includes(value)) {
        if (rewriteFirstnum) {
            firstNum = 0;
            rewriteFirstnum = false;
        }
        if (firstNum === '') {
            firstNum = '0';
        }
        if (secondNum === '') {
            operator = value;
        } else {
            firstNum = operate(+firstNum, +secondNum, operator);
            operator = value;
            secondNum = '';
        }
    } else if (value === '=') {
        if (secondNum !== '') {
            firstNum = operate(+firstNum, +secondNum, operator);
            operator = '';
            secondNum = '';
            rewriteFirstnum = true;
        }
    } else if (value === 'clear') {
        firstNum = '0';
        secondNum = '';
        operator = '';
        rewriteFirstnum = true;
    }
    if (+firstNum === Infinity || +firstNum === -Infinity) {
        firstNum = 'You tried to divide by 0';
        secondNum = '';
        operator = '';
        rewriteFirstnum = true;
    }
    populateDisplay();
}

const buttons = document.querySelector('.buttons');
const display = document.querySelector('.display');
buttons.addEventListener('click', handleClick);
let firstNum = '0';
let secondNum = '';
let operator = '';
let rewriteFirstnum = true;