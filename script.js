const resultEl = document.getElementById('result');
const histEl = document.getElementById('history');
let expr = '';

function updateDisplay() {
  resultEl.textContent = expr || '0';
}

function insert(token) {
  expr += token;
  updateDisplay();
}

function clearAll() {
  expr = '';
  updateDisplay();
}

function backspace() {
  expr = expr.slice(0, -1);
  updateDisplay();
}

function factorial(n) {
  if (n < 0) return NaN;
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

function evaluateExpression(s) {
  try {
    let replaced = s.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-')
      .replace(/π/g, 'Math.PI').replace(/ℯ/g, 'Math.E')
      .replace(/√\(/g, 'Math.sqrt(')
      .replace(/sin\(/g, 'Math.sin(')
      .replace(/cos\(/g, 'Math.cos(')
      .replace(/tan\(/g, 'Math.tan(')
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g, 'Math.log(')
      .replace(/\^/g, '**');

    // factorial handling
    replaced = replaced.replace(/(\d+)!/g, (m, n) => factorial(parseInt(n)));

    let val = Function('return ' + replaced)();
    return val;
  } catch {
    return 'Error';
  }
}

document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    const insertVal = btn.dataset.insert;
    if (insertVal !== undefined) {
      insert(insertVal);
    } else if (action === 'ac') {
      clearAll();
    } else if (action === 'del') {
      backspace();
    } else if (action === 'equals') {
      let res = evaluateExpression(expr);
      histEl.textContent = expr + ' =';
      resultEl.textContent = res;
      expr = '';
    }
  });
});
