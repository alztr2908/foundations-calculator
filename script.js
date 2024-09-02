console.log("Hello World");
const buttonGroup = document.querySelectorAll("button");
const queryDisplay = document.querySelector(".results-ques");
const ansDisplay = document.querySelector(".results-ans");
let firstNum = "";
let secondNum = ansDisplay.textContent;
let origOp = "";
let hasPoint = false;

buttonGroup.forEach((button) => {
  button.addEventListener("click", (e) => {
    const clickedElement = e.currentTarget;
    switch (clickedElement.classList.value) {
      case "number-button":
        formatNumber(clickedElement.textContent);
        break;
      case "operator-button":
        formatEquation(clickedElement.textContent);
        break;
      case "utils-button":
        console.log("utils");
        break;
    }
  });
});

/* restrictions 
1. (+ - / *) is not repeatable
- can't equal without second operand
- straight equal at seccond operator
- firstNum op secondNum
2. if this happens res will be formatted as (ans op)
3. double decimal is not allowed
*/
const formatEquation = (el) => {
  // populating display for first time
  if (!origOp && el != "=") {
    if (firstNum == "") {
      firstNum = parseFloat(secondNum);
      hasPoint = false;
    }
    secondNum = "";
    origOp = el;
    queryDisplay.textContent = `${firstNum.toString()} ${el} `;
  } else {
    // if no secondNum, ans op but op will always just change
    if (secondNum) {
      let answer;
      secondNum = parseFloat(secondNum);

      if (el == "=") {
        answer = calculate(firstNum, secondNum, origOp);

        if (!isNaN(answer)) {
          firstNum = answer;
          ansDisplay.textContent = answer.toString();
        } else {
          firstNum = "0";
          ansDisplay.textContent = "Can't divide by zero";
        }

        queryDisplay.textContent += `${secondNum.toString()} =`;
        secondNum = "";
        hasPoint = false;
        origOp = "";
      }
    } else {
      if (el != "=") {
        queryDisplay.textContent = `${firstNum.toString()} ${el} `;
        origOp = el;
      }
    }
  }
};

const formatNumber = (el) => {
  const res = ansDisplay.textContent;
  // no decimal repeated
  if (el == ".") {
    if (!hasPoint) {
      el = ".";
      hasPoint = true;
    } else {
      el = "";
    }
  }
  if (secondNum == "0") {
    if (el == ".") {
      secondNum = "0";
    } else {
      secondNum = "";
    }
  }

  // enter new number after operation - reset firstNum
  if (!origOp) {
    firstNum = "";
  }

  secondNum += el;
  ansDisplay.textContent = secondNum;
};

// Operations
const calculate = (first, second, op) => {
  switch (op) {
    case "+":
      return add(first, second);
    case "-":
      return subtract(first, second);
    case "*":
      return multiply(first, second);
    case "/":
      return divide(first, second);
  }
};

const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  if (b == 0) {
    return NaN;
  }

  return (a / b).toFixed(2);
};
