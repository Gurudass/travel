// Disable Right-click (Context menu)
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Disable specific keyboard shortcuts (F12, Ctrl+Shift+I, Ctrl+U, etc.)
document.onkeydown = (e) => {
    if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && ['I', 'J'].includes(e.key)) || // Ctrl+Shift+I/J
        (e.ctrlKey && ['U', 'S'].includes(e.key)) // Ctrl+U/S
    ) {
        e.preventDefault();
    }
};

// Detect Developer Tools opening (without showing an alert)
let devtools = /./;
devtools.toString = function () {
    this.open = true;
};
console.log(devtools);
