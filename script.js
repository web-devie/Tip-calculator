const billInput = document.querySelector(".input--bill");
const tipBtns = document.querySelectorAll(".tip--percent");
const customPercent = document.querySelector(".custom--input");
const peopleInput = document.querySelector(".input--people");
const errorMsg = document.querySelector(".err--active");
const tipPrice = document.querySelector(".price--tip");
const totalPrice = document.querySelector(".price--total");
const btnReset = document.querySelector(".btn--reset");
const btnOverlay = document.querySelector(".reset--btn-overlay");
// const

let billVal = 0;
let totalTip = 0;
let totalBill = 0;
let tipPercent = 0.15;
let peopleVal = 1;

/*---------------- Bill Inpt Logic ----------------- */
billInput.addEventListener("input", updateBill);
function updateBill() {
  //It helps to set the billVal to the user input value
  billVal = Number(billInput.value);
  btnOverlay.style.display = "none";
}

/*---------------- Tip Buttons Logic ----------------- */
// Setting the current active button
const btnActive = function (currentBtn) {
  tipBtns.forEach(function (tipBtn) {
    if (tipBtn.classList.contains("active")) {
      //   console.log("Prev Active", tipBtn);
      tipBtn.classList.remove("active");
      //   console.log("Removed Active", tipBtn);
    } else {
      //   console.log("Current", i, tipBtn);
      if (tipBtn === currentBtn) {
        currentBtn.classList.add("active");
      }
      //   console.log("---------------------");
    }
  });
};

// Adding event listener for every button
tipBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    btnActive(btn);
    customPercent.value = "";
    //These 2 lines below gives the percentage value to calc the bil
    const percentIndex = btn.textContent.indexOf("%");
    tipPercent = Number(btn.textContent.slice(0, percentIndex)) / 100;

    //Calling calculateBill() function
    calculateBill(); // Here, it calculates with peopleVal with 1 as it is default val
  });
});

/*---------------- Custom percent Logic ----------------- */
customPercent.addEventListener("input", function () {
  tipBtns.forEach(function (btn) {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
    }
  });
  tipPercent = Number(customPercent.value) / 100;
  calculateBill();
});

/*---------------- People Logic ----------------- */
let eventCount;
//Event listener for people input
peopleInput.addEventListener("input", updatePeople);
function updatePeople() {
  //For bakcspace event that needs to happen after the wrong entry
  peopleInput.addEventListener("keydown", function (e) {
    eventCount = 0;
    if (e.which === 8) {
      eventCount++;
      // console.log(eventCount);
    }
  });
  if (Number(peopleInput.value) !== 0) {
    peopleVal = Number(peopleInput.value); // Updated peopleVal
    calculateBill(); //After updating people value we again calcualte bill with actual peopleVal.
  } else {
    errorMsg.style.display = "block";
    peopleInput.style.outlineColor = "tomato";
    if (eventCount === 1) {
      // console.log(eventCount);
      errorMsg.style.display = "none";
      peopleInput.style.outlineColor = "";
    }
  }
}

/*---------------- Bill Calcualtion Logic ----------------- */
function calculateBill() {
  // -- Tip calculation --
  const tip = billVal * tipPercent; //Overall tip calculation
  totalTip = tip / peopleVal; // tip per person calculation
  tipPrice.textContent = `$${totalTip.toFixed(2)}`;
  // -- Bill calculation --
  totalBill = billVal / peopleVal + totalTip;
  totalPrice.textContent = `$${totalBill.toFixed(2)}`;
}

// Resets everything
btnReset.addEventListener("click", function (e) {
  window.location.reload();
  btnOverlay.style.display = "block";
});

// const setPeopleVal = function () {
//   if (totalPeople.value > 0) {
//     peopleVal = Number(totalPeople.value);
//     return peopleVal;
//   } else {
//     return peopleVal;
//   }
// };
// totalPeople.addEventListener("input", setPeopleVal);

// const calcBillDetails = (amt, tip, people) => {
//   console.log("tot ppl", people);
//   tipPrice.textContent = `$${Math.round((tip / people) * 100) / 100}`;
//   const totalAmt = amt / people + tip / people;
//   totalPrice.textContent = `$${totalAmt.toFixed(2)}`;
// };

// tipBtns.forEach(function (tipBtn) {
//   tipBtn.addEventListener("click", function () {
//     btnActive(tipBtn);
//     const percentIndex = tipBtn.textContent.indexOf("%");
//     const tipPercent = Number(tipBtn.textContent.slice(0, percentIndex)) / 100;
//     bill = Number(billAmt.value);
//     // const people = Number(totalPeople.value);
//     totalTip = Math.round(bill * tipPercent * 100) / 100;
//     setPeopleVal();
//     setPeopleVal();
//     calcBillDetails(bill, totalTip, peopleVal);
//   });
