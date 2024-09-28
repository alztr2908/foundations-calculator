console.log("Hello World");
const buttonGroup = document.querySelectorAll("button");
const queryDisplay = document.querySelector(".results-ques");
const ansDisplay = document.querySelector(".results-ans");
let savedOperand = "";
let currentOperand = ansDisplay.textContent;
let currentOperation = "";

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
  savedOperand = "";
  currentOperand = "0";
  currentOperation = "";
  queryDisplay.textContent = "";
  ansDisplay.textContent = currentOperand;
};

const deleteNumber = () => {
  currentOperand = currentOperand.substring(0, currentOperand.length - 1);
  if (currentOperand == "") {
    currentOperand = "0";
  }
  ansDisplay.textContent = currentOperand;
};

const changeSign = () => {
  if (currentOperand == "" || currentOperand == "0") {
    currentOperand = "0";
    ansDisplay.textContent = currentOperand;
    return;
  }

  if (currentOperand[0] == "-") {
    currentOperand = currentOperand.substring(1, currentOperand.length);
  } else {
    currentOperand = "-" + currentOperand;
  }
  ansDisplay.textContent = currentOperand;
};

const getPercentage = () => {
  currentOperand = divide(parseFloat(currentOperand), 100);
  ansDisplay.textContent = currentOperand;
};

const formatNumber = (el) => {
  if (currentOperand == "") {
    currentOperand = "0";
  }

  // no decimal repeated
  if (el == ".") {
    if (currentOperand.includes(".")) {
      el = "";
    } else {
      el = ".";
    }
  }
  if (currentOperand == "0" && el != ".") {
    currentOperand = "";
  }

  // reset equation by entering another number instead of
  // continuing with another operation
  if (!currentOperation) {
    savedOperand = "";
  }

  currentOperand += el;
  ansDisplay.textContent = currentOperand;
};

/* restrictions 
1. (+ - / *) is not repeatable
- can't equal without second operand
- straight equal at seccond operator
- savedOperand op currentOperand
2. if this happens res will be formatted as (ans op)
3. double decimal is not allowed
*/
const formatEquation = (el) => {
  // populating display for first time
  if (!currentOperation && el != "=") {
    if (savedOperand == "") {
      savedOperand = parseFloat(currentOperand);
    }
    currentOperand = "";
    currentOperation = el;
    queryDisplay.textContent = `${savedOperand.toString()} ${el} `;
  } else {
    // if no currentOperand, ans op but op will always just change
    if (currentOperand) {
      let answer;
      currentOperand = parseFloat(currentOperand);

      if (el == "=") {
        answer = calculate(savedOperand, currentOperand, currentOperation);

        if (!isNaN(answer)) {
          savedOperand = answer;
          ansDisplay.textContent = answer.toString();
        } else {
          savedOperand = "0";
          ansDisplay.textContent = "Can't divide by zero";
        }

        queryDisplay.textContent += `${currentOperand.toString()} =`;
        currentOperand = "";
        currentOperation = "";
      }
    } else {
      if (el != "=") {
        queryDisplay.textContent = `${savedOperand.toString()} ${el} `;
        currentOperation = el;
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
