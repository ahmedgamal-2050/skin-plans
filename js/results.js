/* Next */
let resultProcessing = document.getElementById('result-processing');
let resultPage = document.getElementById('result-page');
function nextPage() {
  setTimeout(
    function () {
      resultProcessing.classList.add('d-none');
      resultPage.classList.remove('d-none');
    }, (14000)
  );
}
let processing = document.getElementById('processing');
let scanLine = document.getElementById('scan-line');
let successIcon = document.getElementById('success-icon');
let spinnerList = document.getElementsByClassName('spin-list');
for (let spinnerItem of spinnerList) {
  let spinner = spinnerItem.querySelector('.spinner');
  let spinnerText = spinnerItem.querySelector('.spin-text');
  let doneIcon = spinnerItem.querySelector('.done-icon');
  let spinCount = spinner.getAttribute('data-spin');
  setTimeout(
    function () {
      spinner.classList.add('d-none');
      spinnerText.classList.add('text-green')
      doneIcon.classList.remove('d-none');
    }, (1500 * parseInt(spinCount))
  );
}
nextPage();

