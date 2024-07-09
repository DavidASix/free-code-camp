// Price of item to purchase
let price = 19.5;
// Cash in drawer
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const denoms = [
  { name: "Penny", value: 0.01, cid_key: "PENNY" },
  { name: "Nickel", value: 0.05, cid_key: "NICKEL" },
  { name: "Dime", value: 0.1, cid_key: "DIME" },
  { name: "Quarter", value: 0.25, cid_key: "QUARTER" },
  { name: "Dollar", value: 1, cid_key: "ONE" },
  { name: "Five Dollars", value: 5, cid_key: "FIVE" },
  { name: "Ten Dollars", value: 10, cid_key: "TEN" },
  { name: "Twenty Dollars", value: 20, cid_key: "TWENTY" },
  { name: "One Hundred Dollars", value: 100, cid_key: "ONE HUNDRED" },
];

let cash = 0;

const cashInput = document.getElementById("cash");
const changeDueSpan = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const drawerTbody = document.getElementById("drawer");
const priceSpan = document.getElementById("price");

function renderPrice() {
  priceSpan.innerText = `$${price}`;
}

function renderDrawer() {
  drawerTbody.innerHTML = "";
  cid.forEach((ct, i) => {
    const denom = denoms.find(d => d.cid_key === ct[0])
    drawerTbody.innerHTML += `
    <tr>
      <td>
        ${ct[0].slice(0, 1).toUpperCase() + ct[0].slice(1).toLowerCase()}
      </td>
      <td>
        ${Math.round(ct[1] / denom.value)}
      </td>
      <td>
        $${denom.value}
      </td>
      <td>
        $${ct[1]}
      </td>
    </tr>
    `;
  });
}

function calculateChange(changeRequired) {
  // Returns an object of denominations and values to give change
  let changeRemaining = changeRequired;
  let change = {}
  let denomsUsed = 0;
  Array.from(denoms)
  .reverse()
  .forEach(denom => {
    // Get the minimum of either the required amount of denoms, or the amount we have
    let denomsAvailable = Math.round(cid.find(c => c[0] === denom.cid_key)[1] / denom.value);
    denomsUsed = Math.floor(changeRemaining / denom.value);
    denomsUsed =  Math.min(denomsUsed, denomsAvailable)

    changeRemaining = Number((changeRemaining - (denomsUsed * denom.value)).toFixed(2));
    change[denom.cid_key] = {used: denomsUsed, value: denom.value, total: denom.value * denomsUsed};
  });
  return {change, changeRemaining};
}

function onPurchaseBtnClick() {
  onCashValueChange(); // Called on button press to assist automated tests
  const changeRequired = cash - price;
  const {change, changeRemaining} = calculateChange(changeRequired);
  const cidTotal = cid.reduce((sum, ct) => sum + ct[1], 0);
  if (changeRequired < 0) {
    return alert("Customer does not have enough money to purchase the item");
  } else if (!changeRequired) {
    return changeDueSpan.innerText = "No change due - customer paid with exact cash"
  } else if (changeRemaining) {
    return changeDueSpan.textContent = "Status: INSUFFICIENT_FUNDS";
  }
  changeDueSpan.textContent = changeRequired === cidTotal ? "Status: CLOSED " : "Status: OPEN ";
  const outputText = Object.keys(change).map(c => change[c].used ? `${c}: $${change[c].total}` : "")
  changeDueSpan.textContent += outputText.join(" ");
}

function onCashValueChange(e) {
  let input = cashInput.value;
  // Clean String
  const regex = /\d+\.?\d?\d?/
  input = input.match(regex)
  input = input ? input[0] : ""
  cashInput.value = input
  cash = parseFloat(input||0);
}

purchaseBtn.addEventListener('click', onPurchaseBtnClick)
cashInput.addEventListener('input', onCashValueChange)

renderDrawer();
renderPrice();
onCashValueChange()