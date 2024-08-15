document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentOperand = '';
    let previousOperand = '';
    let operator = null;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            switch (button.id) {
                case 'clear':
                    clear();
                    break;
                case 'equals':
                    compute();
                    break;
                case 'add':
                case 'subtract':
                case 'multiply':
                case 'divide':
                    chooseOperator(button.innerText);
                    break;
                case 'decimal':
                    appendDecimal();
                    break;
                default:
                    appendNumber(button.innerText);
                    break;
            }
        });
    });

    function clear() {
        currentOperand = '';
        previousOperand = '';
        operator = null;
        updateDisplay();
    }

    function appendNumber(number) {
        if (number === '0' && currentOperand === '0') return;
        currentOperand = currentOperand.toString() + number.toString();
        updateDisplay();
    }

    function appendDecimal() {
        if (currentOperand.includes('.')) return;
        currentOperand = currentOperand.toString() + '.';
        updateDisplay();
    }

    function chooseOperator(op) {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            compute();
        }
        operator = op;
        previousOperand = currentOperand;
        currentOperand = '';
    }

    function compute() {
        let result;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        currentOperand = result;
        operator = null;
        previousOperand = '';
        updateDisplay();
    }

    function updateDisplay() {
        display.innerText = currentOperand;
    }

    clear();
});
