let progressBar = document.getElementById('progress-bar');
let progressRatio = document.getElementById('progress-ratio');
let skinCheckboxes = document.getElementsByClassName('btn-outline-select');
let skinRadio = document.getElementsByClassName('btn-outline-radio');
let form1Btn = document.getElementById('form-1-btn');
let form2Btn = document.getElementById('form-2-btn-next');
let processing = document.getElementById('processing');
let weatherDataLoading = document.getElementById('weather-data-loading');
let weatherDegree = document.getElementById('weather-degree');
let patientInputImg = document.getElementById('patient-img');
let uploadedImg = document.getElementById('uploaded-img');
let scanLine = document.getElementById('scan-line');
let successIcon = document.getElementById('success-icon');
let form12BtnNext = document.getElementById('form-12-btn-next');
const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const webCamModal = document.getElementById('webCamModal');
const webcam = new Webcam(webcamElement, 'user', canvasElement);
let skinProblemValue = [];
/* Multiple Select Form */
for (let checkbox of skinCheckboxes) {
  checkbox.addEventListener('click', function () {
    let checkboxInput = checkbox.querySelector('input');
    if (checkbox.classList.contains('btn-select')) {
      checkbox.classList.remove('btn-select');
      for (let i = 0; i < skinProblemValue.length; i++) {
        if (skinProblemValue[i] === checkboxInput.value) {
          skinProblemValue.splice(i, 1);
        }
      }
      if (skinProblemValue.length === 0) {
        form1Btn.classList.add('disabled');
      }
    }
    else {
      checkbox.classList.add('btn-select');
      skinProblemValue.push(checkboxInput.value);
      form1Btn.classList.remove('disabled');
    }

  })
}
/* One Select Only Form */
for (let radio of skinRadio) {
  radio.addEventListener('click', function () {
    let formNumber = radio.getAttribute('data-form-number');
    let nextFormNumber = parseInt(formNumber) + 1;
    let formBtnName = 'form-' + formNumber + '-btn-next';
    let formBtn = document.getElementById(formBtnName);
    let radioInput = radio.querySelector('input');
    if (radio.classList.contains('btn-select')) {
      radio.classList.remove('btn-select');
      for (let i = 0; i < skinProblemValue.length; i++) {
        if (skinProblemValue[i] === radioInput.value) {
          skinProblemValue.splice(i, 1);
        }
      }
      if (skinProblemValue.length === 0) {
        formBtn.classList.add('disabled');
      }
    }
    else {
      radio.classList.add('btn-select');
      skinProblemValue.push(radioInput.value);
      formBtn.classList.remove('disabled');
      nextPage(nextFormNumber);
    }
  })
}
/* Next */
function nextPage(pageNumber) {
  console.log('next page number', pageNumber);
  let currentPageNumber = pageNumber - 1;
  let currentPageName = 'page-' + currentPageNumber;
  let currentPage = document.getElementById(currentPageName);
  let nextPageName = 'page-' + pageNumber;
  let nextPage = document.getElementById(nextPageName);
  let currentBarWidthClassName = 'w-' + currentPageNumber + '-13';
  let nextBarWidthClassName = 'w-' + pageNumber + '-13';
  if (pageNumber === 7) {
    processing.classList.remove('d-none');
    currentPage.classList.add('d-none');
    progressBar.classList.remove(currentBarWidthClassName);
    progressBar.classList.add(nextBarWidthClassName);
    progressRatio.innerHTML = '13 / ' + pageNumber;
    setTimeout(
      function () {
        processing.classList.add('d-none');
        nextPage.classList.remove('d-none');
        console.log('all values', skinProblemValue);
      }, 5000
    );
  }
  else if (pageNumber === 11)
  {
    currentPage.classList.add('d-none');
    progressBar.classList.remove(currentBarWidthClassName);
    progressBar.classList.add(nextBarWidthClassName);
    progressRatio.innerHTML = '13 / ' + pageNumber;
    weatherDataLoading.classList.remove('d-none');
    currentWeatherDegree();
    setTimeout(
      function () {
        weatherDataLoading.classList.add('d-none');
        nextPage.classList.remove('d-none');
      }, 3000
    );
  }
  //else if (pageNumber === 12) {
  //  currentPage.classList.add('d-none');
  //  nextPage.classList.remove('d-none');
  //  progressBar.classList.remove(currentBarWidthClassName);
  //  progressBar.classList.add(nextBarWidthClassName);
  //  progressRatio.innerHTML = '13 / ' + pageNumber;
  //}
  else
  {
    currentPage.classList.add('d-none');
    nextPage.classList.remove('d-none');
    progressBar.classList.remove(currentBarWidthClassName);
    progressBar.classList.add(nextBarWidthClassName);
    progressRatio.innerHTML = '13 / ' + pageNumber;
    console.log('all values', skinProblemValue);
  }
}
/* Previous */
function previousPage(pageNumber) {
  let currentPageNumber = pageNumber + 1;
  let currentPageName = 'page-' + currentPageNumber;
  let currentBarWidthClassName = 'w-' + currentPageNumber + '-13';
  let previousPageName = 'page-' + pageNumber;
  let previousBarWidthClassName = 'w-' + pageNumber + '-13';
  let currentPage = document.getElementById(currentPageName);
  let previousPage = document.getElementById(previousPageName);
  currentPage.classList.add('d-none');
  previousPage.classList.remove('d-none');
  progressBar.classList.remove(currentBarWidthClassName);
  progressBar.classList.add(previousBarWidthClassName);
  progressRatio.innerHTML = '13 / ' + pageNumber;
}
/* Weather API Call */
function currentWeatherDegree() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    let responseObj = JSON.parse(this.responseText);
    let degree = responseObj.main.temp - 273.15;
    console.log('degree in kelvin', responseObj.main.temp);
    console.log('degree in celsius', degree);
    weatherDegree.innerHTML = degree.toFixed(0) + 'C';
  }
  // Personal API Key for OpenWeatherMap API
  xhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?id=360630&appid=f70730505445cd019317f4fdd344eded", true);
  xhttp.send();
}
/* Uplaod Img and View it */
function uploadImg(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      uploadedImg.src = e.target.result;
      scanLine.classList.remove('d-none');
      setTimeout(
        function () {
          successIcon.classList.remove('d-none');
          scanLine.classList.add('d-none');
          form12BtnNext.classList.remove('disabled');
        }, 8000
      );
    };

    reader.readAsDataURL(input.files[0]);
  }
}
/* Open Web Camera Modal and get access Web Camera */
function openWebCam() {
  webCamModal.classList.remove('d-none');
  webcam.start()
    .then(result => {
      console.log("webcam started");
    })
    .catch(err => {
      console.log(err);
    });
}
/* Take picture through Web Camera then save it and close Modal */
function takePic() {
  uploadedImg.src = webcam.snap();
  closeWebCam();
  scanLine.classList.remove('d-none');
  setTimeout(
    function () {
      successIcon.classList.remove('d-none');
      scanLine.classList.add('d-none');
      form12BtnNext.classList.remove('disabled');
    }, 8000
  );
}
/* Close Web Camera Modal */
function closeWebCam() {
  webcam.stop();
  webCamModal.classList.add('d-none');
}
/* Input Name Validation */
const name = document.getElementById('name');
const nameError = document.getElementById('name-error');
let nameValidation = false;
name.addEventListener('input', function (e) {
  if (e.target.value) {
    if (e.target.value.length < 2) {
      nameError.innerHTML = 'برجاء إدخال حرفين على الأقل من إسمك';
      nameValidation = false;
      enableLastStepBtn();
    }
    else
    {
      nameError.innerHTML = '';
      nameValidation = true;
      enableLastStepBtn();
    }
  }
  else
  {
    nameError.innerHTML = 'برجاء إدخال إسمك';
    nameValidation = false;
    enableLastStepBtn();
  }
})
/* Input Age Validation */
const age = document.getElementById('age');
const ageError = document.getElementById('age-error');
let ageValidation = false;
age.addEventListener('input', function (e) {
  if (e.target.value) {
    if (e.target.value <= 0 || e.target.value[0] == '-') {
      ageError.innerHTML = 'برجاء البدء برقم أعلى من الصفر';
      ageValidation = false;
      enableLastStepBtn();
    }
    else if (e.target.value > 100)
    {
      ageError.innerHTML = 'برجاء البدء بعمر أقل من الـ100';
      ageValidation = false;
      enableLastStepBtn();
    }
    else {
      ageError.innerHTML = '';
      ageValidation = true;
      enableLastStepBtn();
    }
  }
  else {
    ageError.innerHTML = 'برجاء إدخال عمرك';
    ageValidation = false;
    enableLastStepBtn();
  }
})
/* Input Age Validation */
const phone = document.getElementById('phone');
const phoneError = document.getElementById('phone-error');
let phoneValidation = false;
phone.addEventListener('input', function (e) {
  if (e.target.value) {
    if (e.target.value.length !== 11) {
      phoneError.innerHTML = 'برجاء إدخال 11 رقم فقط';
      phoneValidation = false;
      enableLastStepBtn();
    }
    else if (!(e.target.value.startsWith("010")
      || e.target.value.startsWith("011")
      || e.target.value.startsWith("012")
      || e.target.value.startsWith("015")))
    {
      phoneError.innerHTML = 'برجاء البدء بأحدى شباتك المحمول المتاحة فى مصر (010 - 011 - 012 - 015)';
      phoneValidation = false;
    }
    else {
      phoneError.innerHTML = '';
      phoneValidation = true;
      enableLastStepBtn();
    }
  }
  else {
    phoneError.innerHTML = 'برجاء إدخال رقم التليفون';
    phoneValidation = false;
    enableLastStepBtn();
  }
})
/* Enable Last Form Button */
const lastStepBtn = document.getElementById('last-step-btn');
function enableLastStepBtn() {
  if (nameValidation == true && ageValidation == true && phoneValidation == true) {
    lastStepBtn.classList.remove('disabled');
    lastStepBtn.setAttribute('href', 'results.html');
  }
  else
  {
    lastStepBtn.classList.add('disabled');
    lastStepBtn.setAttribute('href', '#');
  }
}