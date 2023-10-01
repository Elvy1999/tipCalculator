//Dom elements
const bill = document.getElementById("inp-bill");
const tip_btns = document.querySelectorAll(".tip");
const inpTip = document.getElementById("inp-tip");
const people = document.getElementById("inp-people");
const error_msg = document.querySelector(".error-msg");
const tip_per_person_id = document.getElementById("tip-per-person");
const total_per_person_id = document.getElementById("total-per-person");

//Calculation variables
let billValue = 0.0;
let tipPercentage = 0.0;
let peopleNumber = 0;
let total_per_person = 0;
let tip_per_person = 0;

//Functions
function validateFloat(s) {
  var rgx = /^[0-9]*\.?[0-9]*$/; // only allows numbers and one decial point
  return s.match(rgx); // checks to see if the stirng matches the conditions in the rgx
}

function setBillValue() {
  //does not allow input that does not pass the validatefloat function to get added to the input field,
  // such as letters or speacial characters
  if (!validateFloat(bill.value)) {
    bill.value = bill.value.substring(0, bill.value.length - 1);
  }
  billValue = parseFloat(bill.value);
  callBoth();
}

function remove_btns_active() {
  tip_btns.forEach((btn) => {
    btn.classList.remove("btn-active");
  });
}

function handleClick(e) {
  remove_btns_active();
  tipPercentage = parseFloat(e.target.innerHTML) / 100;
  e.target.classList.add("btn-active");
  console.log(tipPercentage);
  callBoth();
}

function toggleMsg() {
  if (people.value <= 0) {
    error_msg.style.display = "block";
    return false;
  } else {
    error_msg.style.display = "none";
    return true;
  }
}

function setPeopleValue() {
  toggleMsg();
  peopleNumber = people.value;
  callBoth();
}

function setTipValue() {
  remove_btns_active();
  let value = parseInt(this.value);
  if (value < 0) {
    this.value = "0";
  } else if (value > 100) {
    this.value = "100";
  }
  tipPercentage = this.value / 100;
  console.log(tipPercentage);
  callBoth();
}

function calcTotalBill() {
  if (peopleNumber >= 1 && billValue >= 1) {
    total_per_person = billValue / peopleNumber;
    total_per_person = parseFloat(total_per_person.toFixed(2));
    total_per_person_id.innerText = total_per_person;
  } else {
    total_per_person_id.innerText = "0.00";
  }
}

function calcTotalTip() {
  if (peopleNumber >= 1 && billValue >= 1) {
    tip_per_person = total_per_person * tipPercentage;
    console.log(tip_per_person);
    tip_per_person = parseFloat(tip_per_person.toFixed(2));
    tip_per_person_id.innerText = tip_per_person;
  } else {
    tip_per_person_id.innerText = "0.00";
  }
}

function callBoth() {
  calcTotalBill();
  calcTotalTip();
}

//event listeners
bill.addEventListener("input", setBillValue);
tip_btns.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});
inpTip.addEventListener("input", setTipValue);
people.addEventListener("input", setPeopleValue);
