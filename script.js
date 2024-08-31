console.log("Hello World");
const buttonGroup = document.querySelectorAll("button");
const queryDisplay = document.querySelector(".results-ques");
const ansDisplay = document.querySelector("results-ans");
let firstNum = "";
let secondNum = "";
let containOp = false;

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
  const lastElement = res.charAt(res.length - 1);

  // avoid op repition in display
  if (!op.includes(lastElement)) {
    queryDisplay.textContent += el;
    firstNum = parseInt(secondNum);
    console.log(firstNum);
    secondNum = "";
    containOp = true;
  }

  if (containOp) {
    secondNum = parseInt(secondNum);
    calculate(firstNum, secondNum, el);
  }
  // console.log(firstNum);
};

const formatNumber = (el) => {
  const res = queryDisplay.textContent;
  if (!res.includes(".")) {
    queryDisplay.textContent += el;
    secondNum += el;
  }
};

const calculate = (first, second, op) => {
  console.log(first);
  console.log(second);
  let answer;
  switch (op) {
    case "+":
      answer = first + second;
      ansDisplay.textContent = answer.toString();
      break;
    case "-":
      answer = first - second;
      ansDisplay.textContent = answer.toString();
      break;
    case "*":
      answer = first * second;
      ansDisplay.textContent = answer.toString();
      break;
    case "/":
      answer = first / second;
      ansDisplay.textContent = answer.toString();
      break;
  }
};
