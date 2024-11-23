const textarea = document.getElementById("textarea");

let undoStack = [];
let redoStack = [];

function saveState() {
    const currentState = {
        text: textarea.value,
        style: {
            fontSize: textarea.style.fontSize,
            fontWeight: textarea.style.fontWeight,
            fontStyle: textarea.style.fontStyle,
            textDecoration: textarea.style.textDecoration,
            textAlign: textarea.style.textAlign,
            textTransform: textarea.style.textTransform,
            color: textarea.style.color,
        },
        buttonStates: {
            bold: document.querySelector("button[onclick='f2(this)']").classList.contains("active"),
            italic: document.querySelector("button[onclick='f3(this)']").classList.contains("active"),
            underline: document.querySelector("button[onclick='f4(this)']").classList.contains("active"),
            uppercase: document.querySelector("button[onclick='f8(this)']").classList.contains("active"),
        }
    };

    undoStack.push(currentState);
    redoStack = [];
}

saveState();

textarea.addEventListener("input", saveState);

function undo() {
    if (undoStack.length > 1) {
        redoStack.push(undoStack.pop());
        const previousState = undoStack[undoStack.length - 1];
        textarea.value = previousState.text;
        Object.assign(textarea.style, previousState.style);
        updateButtonState(previousState.buttonStates);
    }
}

function redo() {
    if (redoStack.length > 0) {
        const redoState = redoStack.pop();
        undoStack.push(redoState);
        textarea.value = redoState.text;
        Object.assign(textarea.style, redoState.style);
        updateButtonState(redoState.buttonStates);
    }
}

function updateButtonState(buttonStates) {
    document.querySelector("button[onclick='f2(this)']").classList.toggle("active", buttonStates.bold);
    document.querySelector("button[onclick='f3(this)']").classList.toggle("active", buttonStates.italic);
    document.querySelector("button[onclick='f4(this)']").classList.toggle("active", buttonStates.underline);
    document.querySelector("button[onclick='f8(this)']").classList.toggle("active", buttonStates.uppercase);
}

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === "z") {
        event.preventDefault();
        undo();
    } else if (event.ctrlKey && event.key === "y") {
        event.preventDefault();
        redo();
    }
});

function f1(e) {
    let value = e.value;
    textarea.style.fontSize = value + "px";
    saveState();
}

function f2(e) {
    if (textarea.style.fontWeight === "bold") {
        textarea.style.fontWeight = "normal";
        e.classList.remove("active");
    } else {
        textarea.style.fontWeight = "bold";
        e.classList.add("active");
    }
    saveState();
}

function f3(e) {
    if (textarea.style.fontStyle === "italic") {
        textarea.style.fontStyle = "normal";
        e.classList.remove("active");
    } else {
        textarea.style.fontStyle = "italic";
        e.classList.add("active");
    }
    saveState();
}

function f4(e) {
    if (textarea.style.textDecoration === "underline") {
        textarea.style.textDecoration = "none";
        e.classList.remove("active");
    } else {
        textarea.style.textDecoration = "underline";
        e.classList.add("active");
    }
    saveState();
}

function f5(e) {
    textarea.style.textAlign = "left";
    saveState();
}

function f6(e) {
    textarea.style.textAlign = "center";
    saveState();
}

function f7(e) {
    textarea.style.textAlign = "right";
    saveState();
}

function f8(e) {
    if (textarea.style.textTransform === "uppercase") {
        textarea.style.textTransform = "none";
        e.classList.remove("active");
    } else {
        textarea.style.textTransform = "uppercase";
        e.classList.add("active");
    }
    saveState();
}

function f9(e) {
    textarea.style.fontWeight = "normal";
    textarea.style.fontStyle = "normal";
    textarea.style.textAlign = "left";
    textarea.value = "";
    saveState();
}

function f10(e) {
    let value = e.value;
    textarea.style.color = value;
    saveState();
}

function exportAsText() {
    const text = textarea.value;
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.txt';
    link.click();
}
