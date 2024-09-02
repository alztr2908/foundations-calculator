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
3. double decimal is not alloweds
*/
const formatEquation = (el) => {
  const op = ["+", "-", "*", "/"];
  const res = queryDisplay.textContent;
  const lastElement = res.slice(res.length - 1);

  // populating display for first time
  if (!firstNum && !op.includes(lastElement)) {
    firstNum = parseFloat(secondNum);
    secondNum = "";
    hasPoint = false;
    origOp = el;
    queryDisplay.textContent = `${ansDisplay.textContent} ${el} `;
    return;
  }

  // calculate - firstNum included only
  if (origOp) {
    // if no secondNum, ans op but op will always just change
    if (secondNum) {
      let answer;
      secondNum = parseFloat(secondNum);

      if (el == "=") {
        answer = calculate(firstNum, secondNum, origOp);
        queryDisplay.textContent += `${secondNum.toString()} ${el}`;
        ansDisplay.textContent = answer.toString();
        firstNum = answer;
        secondNum = "";
        hasPoint = false;
        origOp = "";
      }
    } else {
      if (el != "=") {
        queryDisplay.textContent = `${ansDisplay.textContent} ${el} `;
        origOp = el;
      }
    }
  } else {
    firstNum = "";
    hasPoint = false;
    origOp = "";
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
    // case "*":
    //   return multiply(first, second);
    // case "/":
    //   return divide(first, second);
  }
};

const add = (first, second) => {
  return first + second;
};

const subtract = (first, second) => {
  return first - second;
};
