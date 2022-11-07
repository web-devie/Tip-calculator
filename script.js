const billAmt = document.querySelector(".input--bill");
const tipPrice = document.querySelector(".price--tip");
const totalPrice = document.querySelector(".price--total");

const totalPeople = document.querySelector(".input--people");

const btnReset = document.querySelector(".btn--reset");

const btnTipsDiv = document.querySelector(".tip-buttons");

const tipBtns = document.querySelectorAll(".tip--percent");
const people = totalPeople.value;

const btnActive = function (currentBtn) {
  tipBtns.forEach(function (tipBtn, i) {
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

const calcBillDetails = (amt, tip, people) => {
  tipPrice.textContent = `$${Math.round((tip / people) * 100) / 100}`;
  const totalAmt = amt / people + tip / people;
  totalPrice.textContent = `$${totalAmt.toFixed(2)}`;
};

tipBtns.forEach(function (tipBtn) {
  tipBtn.addEventListener("click", function () {
    btnActive(tipBtn);
    const percentIndex = tipBtn.textContent.indexOf("%");
    const tipPercent = Number(tipBtn.textContent.slice(0, percentIndex)) / 100;
    const bill = Number(billAmt.value);
    const people = Number(totalPeople.value);
    const totalTip = Math.round(bill * tipPercent * 100) / 100;
    calcBillDetails(bill, totalTip, people);
  });
});

btnReset.addEventListener("click", function (e) {
  window.location.reload();
});
