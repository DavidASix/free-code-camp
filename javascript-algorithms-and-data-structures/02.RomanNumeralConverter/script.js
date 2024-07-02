const numerals = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

const convertBtn = document.getElementById("convert-btn");
const outputSpan = document.getElementById("output");
convertBtn.onclick = convertNumber;

function convertNumber() {
  let number = document.getElementById("number").value;

  if (number === "") {
    return (outputSpan.innerText = "Please enter a valid number");
  }
  number = parseInt(number);
  if (number < 1) {
    return (outputSpan.innerText =
      "Please enter a number greater than or equal to 1");
  } else if (number > 3999) {
    return (outputSpan.innerText =
      "Please enter a number less than or equal to 3999");
  }
  let remainder = number;
  let romanNumeral = "";
  for (const key of Object.keys(numerals)) {
    romanNumeral += key.repeat(Math.floor(remainder / numerals[key]));
    remainder %= numerals[key];
  }
  outputSpan.innerText = romanNumeral;
}
