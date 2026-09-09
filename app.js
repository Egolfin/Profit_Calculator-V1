const salesInput = document.getElementById('sales');
const rateInput = document.getElementById('commissionRate');
const marketingInput = document.getElementById('marketing');
const remainingEl = document.getElementById('remaining');
const commissionEl = document.getElementById('commissionAmount');
const netEl = document.getElementById('netAfterCommission');
const resultNoteEl = document.getElementById('resultNote');
const statusPillEl = document.getElementById('statusPill');
const resultCardEl = document.querySelector('.result-card');
const breakdownEl = document.getElementById('breakdown');
const resetBtn = document.getElementById('resetBtn');
const form = document.getElementById('calculator');

const currency = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function parseNumber(input) {
  const value = Number.parseFloat(input.value);
  return Number.isFinite(value) ? value : 0;
}

function formatCurrency(value) {
  return currency.format(value);
}

function setStatus(kind, label) {
  resultCardEl.classList.remove('good', 'warning', 'danger');
  statusPillEl.classList.remove('status-good', 'status-warning', 'status-danger', 'status-neutral');
  statusPillEl.classList.add(`status-${kind}`);
  statusPillEl.textContent = label;
}

function calculate() {
  const sales = Math.max(0, parseNumber(salesInput));
  const commissionRate = Math.max(0, parseNumber(rateInput));
  const marketing = Math.max(0, parseNumber(marketingInput));

  // Source-of-truth formulas from the provided workbook:
  // B8 = B3 * B4
  // B9 = B3 - B8
  // B10 = B9 - B5
  const commissionAmount = sales * (commissionRate / 100);
  const netAfterCommission = sales - commissionAmount;
  const remaining = netAfterCommission - marketing;

  remainingEl.textContent = formatCurrency(remaining);
  commissionEl.textContent = formatCurrency(commissionAmount);
  netEl.textContent = formatCurrency(netAfterCommission);

  const hasAnyInput = salesInput.value !== '' || rateInput.value !== '' || marketingInput.value !== '';
  const complete = salesInput.value !== '' && rateInput.value !== '' && marketingInput.value !== '';

  if (!hasAnyInput) {
    setStatus('neutral', 'WAITING');
    resultNoteEl.textContent = 'Add your inputs to calculate the remaining amount.';
    breakdownEl.hidden = true;
    return;
  }

  breakdownEl.hidden = false;

  if (!complete) {
    setStatus('neutral', 'PARTIAL');
    resultNoteEl.textContent = 'Complete all three inputs for the final result.';
    return;
  }

  if (remaining < 0) {
    setStatus('danger', 'LOSS');
    resultNoteEl.textContent = 'Marketing and commission exceed the estimated sales amount.';
  } else if (sales > 0 && remaining / sales < 0.10) {
    setStatus('warning', 'LOW MARGIN');
    resultNoteEl.textContent = 'The remaining amount is below 10% of estimated sales.';
  } else {
    setStatus('good', 'REMAINING');
    resultNoteEl.textContent = 'Positive amount remaining after commission and marketing.';
  }
}

form.addEventListener('input', calculate);

resetBtn.addEventListener('click', () => {
  form.reset();
  calculate();
  salesInput.focus();
});

calculate();
