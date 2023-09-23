var firstName = document.getElementById('fname-input');
var secondName = document.getElementById('sname-input');
var percentageDisplay = document.getElementById('percentage-display');
var resultDisplay = document.getElementById('result-display');
var progress = document.getElementById('progress-bar');

// hides progress bar on load until click
window.addEventListener('load', function () {
  $('#progress-bar').hide();
});

// API request function
function calculateLove() {
  const baseUrl = 'https://love-calculator.p.rapidapi.com';
  const endpoint = '/getPercentage';
  const url = `${baseUrl}${endpoint}?sname=${secondName.value}&fname=${firstName.value}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f2519ec2admshace2119bdc361dcp140410jsn4e6a253bcb55',
      'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
    }
  };
  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      // Set display values from API response
      firstName.value = data.fname;
      secondName.value = data.sname;
      percentageDisplay.textContent = `Compatibility Percentage: ${data.percentage}%`;
      resultDisplay.textContent = `Result: ${data.result}`;

      // Check compatibility percentage for colors
      const percentage = parseInt(data.percentage); // Parse the percentage as an integer
      if (percentage <= 45) {
        percentageDisplay.style.color = 'red';
      }

      if (percentage > 45 && percentage <= 70) {
        percentageDisplay.style.color = 'yellow';
      }

      if (percentage > 70) {
        percentageDisplay.style.color = 'green';
      }

      // Hide the loading bar after 1.3 seconds
      setTimeout(() => {
        $('#progress-bar').hide();
      }, 1300);
    })
    .catch(error => console.error(error));
} 
// button functions 
const calculateBtn = document.getElementById('calculate-btn');
calculateBtn.addEventListener('click', calculateLove);
// function to make loading appear on click // hidden
calculateBtn.addEventListener('click', function loadStatus() {
  $('#progress-bar').show();
});
// clear function sets back to empty string
calculateBtn.addEventListener('click', function () {
  var clearBtn = document.getElementById('clear-btn');
  clearBtn.addEventListener('click', function () {
    firstName.value = "";
    secondName.value = "";
    percentageDisplay.innerHTML = "";
    resultDisplay.innerHTML = "";
  });
});

// cursor glow movement
var cursorGlow = document.createElement('div');
cursorGlow.classList.add('cursorGlow');
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', function(event) {
  cursorGlow.style.display = 'block';
  cursorGlow.style.top = event.clientY + 'px';
  cursorGlow.style.left = event.clientX + 'px';
});