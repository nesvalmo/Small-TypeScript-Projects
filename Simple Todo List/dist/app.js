"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Task {
    taskDate;
    taskTitle;
    taskDescription;
    taskState;
    constructor(inputTitle, inputDescription, inputState) {
        this.taskTitle = inputTitle;
        this.taskDescription = inputDescription;
        this.taskState = inputState;
        this.taskDate = new Date();
        return this;
    }
}
let taskDatabase = [];
function createTask(inputTitle, inputDescription) {
    const newTask = new Task(inputTitle, inputDescription, "new");
    taskDatabase.push(newTask);
    return taskDatabase[taskDatabase.length - 1];
}
let temp = createTask("Attend class", "You have programming class at 8:00 tomorrow.");
console.log(`${temp?.taskTitle} | ${temp?.taskState}\n${temp?.taskDate}\n${temp?.taskDescription}`);
//# sourceMappingURL=app.js.map