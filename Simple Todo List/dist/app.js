"use strict";
// TYPE SECTION
// INTERFACE SECTION
// CLASS SECTION
// GLOBAL VARIABLES SECTION
const addTaskOverlay = document.getElementById('addTaskOverlay');
// FUNCTION SECTION
function closeOverlay(inputElement) {
    inputElement.classList.add("close");
}
function openOverlay(inputElement) {
    inputElement.classList.remove("close");
}
document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'a') {
        openOverlay(addTaskOverlay);
    }
});
addTaskOverlay.addEventListener('click', (event) => {
    if (event.target === addTaskOverlay) {
        closeOverlay(addTaskOverlay);
    }
});
// IMMEDIATE APPLICATION
//# sourceMappingURL=app.js.map