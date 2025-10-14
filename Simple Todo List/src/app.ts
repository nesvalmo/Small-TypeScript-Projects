class Task {
  taskDate: Date;
  taskTitle: string;
  taskDescription: string;
  taskState: "done" | "postponed" | "new";
  constructor(inputTitle: string, inputDescription: string, inputState: "done" | "postponed" | "new") {
    this.taskTitle = inputTitle;
    this.taskDescription = inputDescription;
    this.taskState = inputState;
    this.taskDate = new Date();
  }
}

const myTask = new Task("task_name", "task_description", "new");
