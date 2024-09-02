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
        formatUtilsButton(clickedElement.textContent);
        break;
    }
  });
});

const formatUtilsButton = (el) => {
  switch (el) {
    case "AC":
      clearScreen();
      break;
    case "DEL":
      deleteNumber();
      break;
    case "±":
      changeSign();
      break;
    case "%":
      getPercentage();
      break;
  }
};

const clearScreen = () => {
  firstNum = "";
  secondNum = "0";
  hasPoint = false;
  origOp = "";
  queryDisplay.textContent = "";
  ansDisplay.textContent = secondNum;
};

const deleteNumber = () => {
  secondNum = secondNum.substring(0, secondNum.length - 1);
  if (secondNum == "") {
    secondNum = "0";
  }
  ansDisplay.textContent = secondNum;
};

const changeSign = () => {
  if (secondNum[0] == "-") {
    secondNum = secondNum.substring(1, secondNum.length);
  } else {
    secondNum = "-" + secondNum;
  }
  ansDisplay.textContent = secondNum;
};

const getPercentage = () => {
  secondNum = divide(parseFloat(secondNum), 100);
  ansDisplay.textContent = secondNum;
};

const formatNumber = (el) => {
  if (secondNum == "") {
    secondNum = "0";
  }

  // no decimal repeated
  if (el == ".") {
    if (!hasPoint) {
      el = ".";
      hasPoint = true;
    } else {
      el = "";
    }
  }
  if (secondNum == "0" && el != ".") {
    secondNum = "";
  }

  // enter new number after operation - reset firstNum
  if (!origOp) {
    firstNum = "";
  }

  secondNum += el;
  ansDisplay.textContent = secondNum;
};

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
