// DOM Elements
const output = document.getElementById("output");
const history = document.getElementById("history");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let lastCalculation = "";

// Button Click Events
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (button.classList.contains("number")) appendNumber(value);
        else if (button.classList.contains("operator")) appendOperator(value);
        else if (button.classList.contains("equal")) calculateResult();
        else if (action === "clear") clearDisplay();
        else if (action === "delete") deleteLast();
    });
});

// Append number
function appendNumber(num) {
    if (num === "." && currentInput.includes(".")) return;
    currentInput += num;
    updateDisplay();
}

// Append operator
function appendOperator(op) {
    if (currentInput === "") return;
    const lastChar = currentInput.slice(-1);
    if (["+", "-", "*", "/"].includes(lastChar)) {
        currentInput = currentInput.slice(0, -1);
    }
    currentInput += op;
    updateDisplay();
}

// Calculate
function calculateResult() {
    try {
        if (currentInput === "") return;
        if (currentInput.includes("/0")) {
            output.innerText = "Error";
            return;
        }
        let result = eval(currentInput);
        history.innerText = currentInput + " =";
        currentInput = result.toString();
        updateDisplay();
    }
    catch {
        output.innerText = "Error";
    }
}

// Clear
function clearDisplay() {
    currentInput = "";
    history.innerText = "";
    updateDisplay();
}

// Delete
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

// Update Display
function updateDisplay() {
    output.innerText = currentInput || "0";
}

// Keyboard Support
document.addEventListener("keydown", (e) => {
    if ((e.key >= 0 && e.key <= 9) || e.key === ".") appendNumber(e.key);
    if (["+", "-", "*", "/"].includes(e.key)) appendOperator(e.key);
    if (e.key === "Enter") calculateResult();
    if (e.key === "Backspace") deleteLast();
    if (e.key === "Escape") clearDisplay();
});