const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");

let expression = "";

document.querySelector(".buttons").addEventListener("click", (e) => {
    const btn = e.target;

    if (!btn.dataset.value && !btn.dataset.action) return;

    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (value) {
        expression += value;
        update();
    }

    if (action === "clear") {
        expression = "";
        update();
    }

    if (action === "delete") {
        expression = expression.slice(0, -1);
        update();
    }

    if (action === "equal") {
        try {
            const result = eval(expression);
            resultEl.textContent = result;
        } catch {
            resultEl.textContent = "Error";
        }
    }
});

function update() {
    expressionEl.textContent = expression;
    resultEl.textContent = expression || "0";
}
