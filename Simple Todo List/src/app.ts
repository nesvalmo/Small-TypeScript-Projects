// TYPE SECTION



// INTERFACE SECTION



// CLASS SECTION



// GLOBAL VARIABLES SECTION

const addTaskOverlay = document.getElementById('addTaskOverlay') as HTMLDivElement;

// FUNCTION SECTION

function closeOverlay(inputElement: HTMLElement): void {
    inputElement.classList.add("close");
}

function openOverlay(inputElement: HTMLElement): void {
    inputElement.classList.remove("close");
}

document.addEventListener('keydown', (event: KeyboardEvent) => {
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

