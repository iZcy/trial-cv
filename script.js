const toggleBtn = document.getElementById('theme-toggle');
const icon = toggleBtn.querySelector('i');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  icon.className = 'fas fa-sun';
}

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

const calcToggle = document.getElementById('calc-toggle');
const calcWidget = document.getElementById('calc-widget');
const calcClose = document.getElementById('calc-close');
const calcDisplay = document.getElementById('calc-display');
const calcButtons = document.querySelectorAll('.calc-buttons button');

calcToggle.addEventListener('click', () => {
  calcWidget.classList.toggle('calc-hidden');
});

calcClose.addEventListener('click', () => {
  calcWidget.classList.add('calc-hidden');
});

let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldReset = false;

function updateDisplay() {
  calcDisplay.textContent = currentInput;
}

calcButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.dataset.value;
    if (val === 'C') {
      currentInput = '0';
      previousInput = '';
      operator = null;
      shouldReset = false;
    } else if (val === '±') {
      currentInput = String(-parseFloat(currentInput));
    } else if (val === '%') {
      currentInput = String(parseFloat(currentInput) / 100);
    } else if (val === '=') {
      if (operator && previousInput) {
        const a = parseFloat(previousInput);
        const b = parseFloat(currentInput);
        let result;
        switch (operator) {
          case '+': result = a + b; break;
          case '-': result = a - b; break;
          case '*': result = a * b; break;
          case '/': result = b !== 0 ? a / b : 'Error'; break;
        }
        currentInput = String(result);
        operator = null;
        previousInput = '';
        shouldReset = true;
      }
    } else if (['+', '-', '*', '/'].includes(val)) {
      if (operator && !shouldReset) {
        const a = parseFloat(previousInput);
        const b = parseFloat(currentInput);
        let result;
        switch (operator) {
          case '+': result = a + b; break;
          case '-': result = a - b; break;
          case '*': result = a * b; break;
          case '/': result = b !== 0 ? a / b : 'Error'; break;
        }
        currentInput = String(result);
      }
      previousInput = currentInput;
      operator = val;
      shouldReset = true;
    } else {
      if (shouldReset || currentInput === '0') {
        currentInput = val === '.' ? '0.' : val;
        shouldReset = false;
      } else {
        currentInput = val === '.' && currentInput.includes('.') ? currentInput : currentInput + val;
      }
    }
    updateDisplay();
  });
});
