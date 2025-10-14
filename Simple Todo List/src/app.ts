// TYPE SECTION

type stateType = "done" | "new" | "postponed";

// CLASS SECTION

class Task {
  taskDate: Date;
  taskTitle: string;
  taskDescription: string;
  taskState: stateType;
  constructor(inputTitle: string, inputDescription: string, inputState: stateType) {
    this.taskTitle = inputTitle;
    this.taskDescription = inputDescription;
    this.taskState = inputState;
    this.taskDate = new Date();

    return this;
  }
}

// GLOBAL VARIABLES SECTION

let taskDatabase: Task[] = [];

// FUNCTION SECTION

function createTask(inputTitle: string, inputDescription: string): Task | undefined {
    const newTask = new Task(inputTitle, inputDescription, "new");
    taskDatabase.push(newTask);
    return taskDatabase[taskDatabase.length - 1];
}

function openOverlay(): void {
  const overlayElement = document.getElementById("addTaskOverlay");
  if (overlayElement) {
    overlayElement.style.display = "flex";
  }
}

function closeOverlay(): void {
  const overlayElement = document.getElementById("addTaskOverlay");
  if (overlayElement) {
    overlayElement.style.display = "none";
  }
}

// APPLICATION

let temp = createTask("Attend class", "You have programming class at 8:00 tomorrow.");

console.log(`${temp?.taskTitle} | ${temp?.taskState}\n${temp?.taskDate}\n${temp?.taskDescription}`);
