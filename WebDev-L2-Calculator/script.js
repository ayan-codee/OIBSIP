let btns = document.querySelectorAll('.btn');
let currOper = document.querySelector('.current-operand');
let preOper = document.querySelector('.previous-operand');

let currentInput = '';
let firstOperand = '';
let operator = '';

btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        let text = btn.textContent;

        // 1. AC (All Clear) button handler
        if (btn.dataset.action === 'clear') {
            currentInput = '';
            firstOperand = '';
            operator = '';
            currOper.textContent = '0';
            preOper.textContent = '';
            return;
        }

        // 2. DEL (Delete) button handler
        if (btn.dataset.action === 'delete') {
            currentInput = currentInput.slice(0, -1);
            currOper.textContent = currentInput || '0';
            return;
        }

        // 3. Number & Decimal handler
        if (btn.classList.contains('number')) {
            if (text === '.' && currentInput.includes('.')) return;
            currentInput += text;
            currOper.textContent = currentInput;
            return;
        }

        // 4. Operator handler (+, -, ×, ÷)
        if (btn.classList.contains('operator') && text !== '=') {
            if (currentInput === '') return;
            if (firstOperand !== '') {
                compute(); // Agar pehle se calculation baki hai toh pehle wo karein
            }
            operator = text;
            firstOperand = currentInput;
            preOper.textContent = `${firstOperand} ${operator}`;
            currentInput = '';
            currOper.textContent = '';
            return;
        }

        // 5. Equals (=) handler
        if (text === '=') {
            if (!firstOperand || !operator || !currentInput) return;
            let result = compute(firstOperand, currentInput, operator);
            preOper.textContent = `${firstOperand} ${operator} ${currentInput} =`;
            currOper.textContent = result;
            currentInput = result;
            firstOperand = '';
            operator = '';
        }
    });
});

// Calculation function
function compute(num1, num2, op) {
    let a = parseFloat(num1);
    let b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) return;
    
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '×': return a * b;
        case '÷': return b === 0 ? 'Error' : a / b;
        default: return 0;
    }
}