const checkBtn = document.getElementById("check-btn")
const resultSpan = document.getElementById("result")
checkBtn.onclick = checkPalindrome

function checkPalindrome() {
  let word = document.getElementById("text-input").value
  if (!word) {
    return alert("Please input a value")
  }
  const cleanedWord = word.replace(/[^a-zA-Z1-9]/g, "").toLowerCase()
  const isPalindrome = cleanedWord.split("").reverse().join("") === cleanedWord;
  resultSpan.innerText = `${word} is ${isPalindrome ? "" : "not"} a palindrome`
  console.log({cleanedWord, isPalindrome})
}