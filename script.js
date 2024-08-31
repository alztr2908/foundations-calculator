console.log("Hello World");
const buttonGroup = document.querySelectorAll("button");

buttonGroup.forEach((button) => {
  button.addEventListener("click", (e) => {
    switch (e.currentTarget.classList.value) {
      case "number-button":
        console.log("number");
        break;
      case "operator-button":
        console.log("operator");
        break;
      case "utils-button":
        console.log("utils");
        break;
    }
  });
});
