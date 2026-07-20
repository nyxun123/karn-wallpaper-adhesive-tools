const ratioForm = document.querySelector('#ratio-form');
const powderMassInput = document.querySelector('#powder-mass');
const waterRatioInput = document.querySelector('#water-ratio');
const waterResult = document.querySelector('#water-result');
const totalResult = document.querySelector('#total-result');
const ratioResult = document.querySelector('#ratio-result');
const calculationError = document.querySelector('#calculation-error');
const testRecordForm = document.querySelector('#test-record-form');
const printButton = document.querySelector('#print-record');
const clearButton = document.querySelector('#clear-record');

function formatKilograms(grams) {
  return `${(grams / 1000).toFixed(3)} kg`;
}

function calculate(event) {
  event?.preventDefault();

  const powderMass = Number.parseFloat(powderMassInput.value);
  const waterRatio = Number.parseFloat(waterRatioInput.value);

  if (!Number.isFinite(powderMass) || powderMass <= 0 || !Number.isFinite(waterRatio) || waterRatio <= 0) {
    calculationError.textContent = document.documentElement.lang === 'ru'
      ? 'Введите положительные значения массы порошка и частей воды.'
      : 'Enter positive numbers for powder mass and water parts.';
    calculationError.hidden = false;
    return;
  }

  const waterMass = powderMass * waterRatio;
  const totalMass = powderMass + waterMass;

  waterResult.textContent = formatKilograms(waterMass);
  totalResult.textContent = formatKilograms(totalMass);
  ratioResult.textContent = `1:${waterRatio.toLocaleString(undefined, { maximumFractionDigits: 3 })}`;
  calculationError.hidden = true;
}

ratioForm.addEventListener('submit', calculate);
printButton.addEventListener('click', () => window.print());
clearButton.addEventListener('click', () => {
  testRecordForm.reset();
  document.querySelectorAll('.checklist input').forEach((checkbox) => {
    checkbox.checked = false;
  });
});

calculate();
