// Price of item to purchase
let price = 1.87;
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
const drawerUl = document.getElementById("drawer");
const priceSpan = document.getElementById("price");

function renderPrice() {
  priceSpan.innerText = `$${price}`;
}

function renderDrawer() {
  drawerUl.innerHTML = "";
  cid.forEach((ct, i) => {
    const denom = denoms.find(d => d.cid_key === ct[0])
    drawerUl.innerHTML += `
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

function onPurchaseBtnClick() {
  console.log(cash)
}

function onCashValueChange(e) {
  let input = cashInput.value;
  // Clean String
  const regex = /\d+\.?\d?\d?/
  input = input.match(regex)
  input = input ? input[0] : ""
  cashInput.value = input
  cash = parseFloat(input);
}

purchaseBtn.addEventListener('click', onPurchaseBtnClick)
cashInput.addEventListener('input', onCashValueChange)

renderDrawer();
renderPrice();