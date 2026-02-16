const pending = document.getElementById("pending");
const completed = document.getElementById("completed");

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (!text) return;

    const li = document.createElement("li");

    const label = document.createElement("span");
    label.textContent = text;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const del = document.createElement("button");
    del.textContent = "X";

    // mark complete
    checkbox.onchange = () => {
        li.classList.toggle("done");
        if (checkbox.checked) {
            completed.appendChild(li);
        } else {
            pending.appendChild(li);
        }
    };

    // delete
    del.onclick = () => li.remove();

    // edit on double click
    label.ondblclick = () => {
        const newText = prompt("Edit task", label.textContent);
        if (newText) label.textContent = newText;
    };

    li.append(checkbox, label, del);
    pending.appendChild(li);

    input.value = "";
}
