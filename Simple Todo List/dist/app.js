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
    }
}
const myTask = new Task("task_name", "task_description", "new");
//# sourceMappingURL=app.js.map