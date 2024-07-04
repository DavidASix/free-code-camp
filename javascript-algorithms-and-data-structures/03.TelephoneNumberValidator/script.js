const checkButton = document.getElementById("check-btn");
const clearButton = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");
const userInput = document.getElementById("user-input");

function checkValidity() {
  // TFN stands for Telephone Number in telecom
  let tfn = userInput.value
  if (tfn === "") {
    return alert('Please provide a phone number')
  }
  const regex = /^(?:1(?:\s|-)?)?(?:\([0-9]{3}\)|[0-9]{3})(?:\s|-)?[0-9]{3}(?:\s|-)?[0-9]{4}$/
  resultsDiv.innerText = `${regex.test(tfn) ? "Valid" : "Invalid"} US number: ${tfn}`;
}

function clearForm() {
  resultsDiv.innerText = "";
  userInput.value = ""
}

checkButton.addEventListener('click', checkValidity);
clearButton.addEventListener('click', clearForm);