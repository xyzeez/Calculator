const numbers = document.querySelectorAll('#number');
const operators = document.querySelectorAll('#operator');
const dotBtn = document.querySelector('#dot-btn');
const equalsBtn = document.querySelector('#equals-btn');
const clearBtn = document.querySelector('#clear-btn');
const deleteBtn = document.querySelector('#delete-btn');

const currentOperationScreen = document.querySelector('.screen-current');
const lastOperationScreen = document.querySelector('.screen-last');

let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let shouldResetScreen = false;

deleteNumber = () => {
    currentOperationScreen.textContent =
    currentOperationScreen.textContent.toString().slice(0, currentOperationScreen.textContent.length - 1);
   if (currentOperationScreen.textContent.length === 0) {
    currentOperationScreen.textContent = '0';
   }
}

clear = () => {
    currentOperationScreen.textContent = '0';
    lastOperationScreen.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperator = null;
    shouldResetScreen = false;
}

appendDot = () => {
    if (shouldResetScreen) {
        resetScreen();
    }
    if (currentOperationScreen.textContent === '') {
        currentOperationScreen.textContent = '0';
    }
    if (currentOperationScreen.textContent.includes('.')) {
        return;
    }
    currentOperationScreen.textContent += '.';
}

appendNumber = (number) => {
    if (currentOperationScreen.textContent === '0' || shouldResetScreen) {
        resetScreen();
    }
    currentOperationScreen.textContent += number;
}

resetScreen = () => {
    currentOperationScreen.textContent = '';
    shouldResetScreen = false;
}

setOperator = (operator) => {
    if (currentOperator !== null) {
        evaluate();
    }
    firstOperand = currentOperationScreen.textContent;
    currentOperator = operator;
    lastOperationScreen.textContent = `${firstOperand} ${currentOperator}`
    shouldResetScreen = true;
}

evaluate = () => {
    if (currentOperator === null || shouldResetScreen) {
        return;
    }
    if (currentOperator === '÷' && currentOperationScreen.textContent === '0') {
        return;
    }
    secondOperand = currentOperationScreen.textContent;
    currentOperationScreen.textContent = operate(firstOperand, currentOperator, secondOperand);
    lastOperationScreen.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`;
    currentOperator = null;
}

operate = (operand1, operator, operand2) => {
    let result;
    switch (operator) {
        case '+' :
            result = add(operand1, operand2);
            break;
        case '-' :
            result = subtract(operand1, operand2);
            break;
        case '÷' :
            result = divide(operand1, operand2);
            break;
        case 'x' :
            result = multiply(operand1, operand2);
            break;
    }
    return Math.round(result * 1000) / 1000;
}

add = (num1, num2) => {
	return num1 + num2;
};

subtract = (num1, num2) => {
	return num1 - num2;
};

divide = (num1, num2) => {
	return num1 / num2;
};

multiply = (num1, num2) => {
	return num1 * num2;
};

numbers.forEach(number => {
    number.addEventListener('click', () => {
        appendNumber(number.textContent);
    })
})

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        setOperator(operator.textContent);
    })
})

dotBtn.addEventListener('click', appendDot);

equalsBtn.addEventListener('click', evaluate);

clearBtn.addEventListener('click', clear);

deleteBtn.addEventListener('click', deleteNumber);