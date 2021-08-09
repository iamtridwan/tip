const customInput = document.getElementById("tip");
const bill = document.getElementById("bill");
const num = document.getElementById("num");
let amount = document.getElementById("amount");
let total = document.getElementById("total");
let buttons = document.querySelectorAll(".tipPer");
let reset = document.querySelector(".reset");
const notice = document.getElementById("notice");

//working  with custom button
customInput.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    changeTheme();
    let percent = customInput.value;
    let cost = bill.value;
    let people = num.value;
    if (Number(people) <= 0) {
      amount.textContent = "$0.00";
      total.textContent = "$0.00";
      notice.style.display = "block";
      num.style.border = "2px solid crimson";
    } else {
      const value = tipCalc(cost, percent, people);
      amount.textContent = `$${value[0]}`;
      total.textContent = `$${value[1]}`.slice(0, 6);
      customInput.value = "";
      notice.style.display = "none";
    }
  }
});
num.addEventListener("click", (e) => {
  notice.style.display = "none";
  num.style.border = "2px solid hsl(172, 67%, 45%)";
});

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (event.currentTarget) {
      button.style.backgroundColor = "hsl(172, 67%, 45%)";
      button.style.color = "hsl(183, 100%, 15%)";
    } else {
      button.style.backgroundColor = "hsl(183, 100%, 15%)";
      button.style.color = "hsl(0, 0%, 100%)";
    }

    changeTheme();
    let val = "";
    for (let i of button.textContent) {
      if (i != "%") {
        val += i;
      }
    }
    let cost = bill.value;
    let people = num.value;
    if (Number(people) <= 0) {
      amount.textContent = "$0.00";
      total.textContent = "$0.00";
      notice.style.display = "block";
      num.style.border = "2px solid crimson";
    } else {
      const value = tipCalc(cost, Number(val), people);
      amount.textContent = `$${value[0]}`;
      total.textContent = `$${value[1]}`.slice(0, 6);
      customInput.value = "";
      notice.style.display = "none";
    }
  });
});
reset.addEventListener("click", (event) => {
  amount.textContent = "$0.00";
  total.textContent = "$0.00";
  bill.value = "";
  num.value = "";
  notice.style.display = "none";
  bill.style.border = "none";
  num.style.border = "none";
  buttons.forEach((button) => {
    button.style.backgroundColor = "hsl(183, 100%, 15%)";
    button.style.color = "hsl(0, 0%, 100%)";
  });
});

bill.addEventListener("click", (event) => {
  bill.style.border = "2px solid hsl(172, 67%, 45%)";
  changeTheme();
});

function tipCalc(cost, percent, num) {
  let result = (percent / 100) * cost;
  let rounded = Math.floor((result / num) * 100);
  const amount = rounded / 100;
  let total = totalTip(cost, num);
  total = total + amount;
  return [amount, total];
}

function totalTip(cost, num) {
  let result = cost / num;
  result = Math.floor(result * 100);
  return result / 100;
}
function changeTheme() {
  reset.style.backgroundColor = "hsl(172, 67%, 45%)";
}
