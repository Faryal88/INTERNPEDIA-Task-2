let displayValue = ''; 
let currentInput = ''; 
let operator = ''; 

function updateDisplay() {
    document.getElementById('display').innerText = displayValue + currentInput || '0';
}

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        if (value === 'AC') {
            displayValue = '';
            currentInput = '';
            operator = '';
        } else if (value === 'DEL') {
            if (currentInput) {
                currentInput = currentInput.slice(0, -1);
            } else if (displayValue) {
                displayValue = displayValue.trim();
                displayValue = displayValue.slice(0, -1);
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput !== '') {
                displayValue += currentInput + ' ' + value + ' ';
                currentInput = '';
            } else if (displayValue) {
                displayValue = displayValue.slice(0, -2) + value + ' ';
            }
            operator = value;
        } else if (value === '=') {
            if (currentInput && operator) {
                displayValue += currentInput;
                try {
                    currentInput = eval(displayValue).toString();
                } catch {
                    currentInput = 'Error';
                }
                displayValue = '';
                operator = '';
            }
        } else {
            currentInput += value;
        }
        updateDisplay();
    });
});

updateDisplay();
