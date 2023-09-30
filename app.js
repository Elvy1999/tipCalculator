//Dom elements
const bill = document.getElementById("inp-bill");
const tip_btns = document.querySelectorAll(".tip");
const inpTip = document.getElementById("inp-tip");
const people = document.getElementById("inp-people");
const error_msg = document.querySelector(".error-msg");

//Calculation variables
let billValue = 0.0;
let tipPercentage = 0.0;
let peopleNumber = 1;

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
}

function toggleMsg() {
  if (people.value <= 0) {
    error_msg.style.display = "block";
  } else {
    error_msg.style.display = "none";
  }
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
}

//event listeners
bill.addEventListener("input", setBillValue);
tip_btns.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});
inpTip.addEventListener("input", setTipValue);
people.addEventListener("input", toggleMsg);
