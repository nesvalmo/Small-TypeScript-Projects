// TYPE SECTION



// INTERFACE SECTION

interface Task {
    id: string;
    title: string;
    due: string;
    isComplete: boolean;
}

// CLASS SECTION



// GLOBAL VARIABLES SECTION

const addTaskOverlay = document.getElementById('addTaskOverlay') as HTMLDivElement;
const getStartedButton = document.getElementById('addTaskButton') as HTMLSpanElement;
const addTaskButton = document.getElementById('addTaskSubmit') as HTMLButtonElement;
const taskTitleInput = document.getElementById('taskTitle') as HTMLInputElement;
const taskDueInput = document.getElementById('taskDue') as HTMLInputElement;
const taskContainer = document.getElementById('taskContainer') as HTMLDivElement;

let tasks: Task[] = [];

// FUNCTION SECTION

// OVERLAY FUNCTIONS
function closeOverlay(inputElement: HTMLElement): void {
    inputElement.classList.add("close");
}

function openOverlay(inputElement: HTMLElement): void {
    inputElement.classList.remove("close");
}

document.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key.toLowerCase() === 'a') {
    openOverlay(addTaskOverlay);
  } else if (event.key === 'Escape' && !addTaskOverlay.classList.contains("close")) {
    closeOverlay(addTaskOverlay);
  }
});

addTaskOverlay.addEventListener('click', (event) => {
    if (event.target === addTaskOverlay) {
        closeOverlay(addTaskOverlay);
    }
});

getStartedButton.addEventListener('click', (event) => {
    openOverlay(addTaskOverlay);
});

addTaskButton.addEventListener('click', handleAddTask);

// TASK FUNCTIONS
function renderTasks(): void {
    if (tasks.length === 0) {
        if (taskContainer === null) {
            console.log("Task container not found.");
            return;
        }
        taskContainer.innerHTML = '<p class="no-tasks">No tasks here yet,<br />press ‘A’ to get started,<br />or rest...</p><img src="./media/resting.svg" alt="A guy resting near beach">';
        return;
    }
    if (taskContainer === null) {
        console.log("Task container not found.");
        return;
    }
    taskContainer.innerHTML = '';
    tasks.forEach((task) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.id = `task_${task.id}`;
        taskElement.innerHTML = `
            <div class="complete_button"></div>
            <div class="task_title"><p>${task.title}</p></div>
            <div class="task_due"><p>${task.due}</p></div>
        `;
        taskContainer.appendChild(taskElement);
    });
}

function createTask(title: string, due: string): Task {
    if (!title || title.trim().length === 0) {
        throw new Error("Task title cannot be empty.");
    }
    if (title.length > 100) {
        throw new Error("Task title is too long.");
    }

    const newTask: Task = {
        id: crypto.randomUUID(),
        title: title.trim(),
        due: due.trim(),
        isComplete: false
    };

    return newTask;
}

function handleAddTask(event: Event): void {
    event.preventDefault();
    
    const title = taskTitleInput.value;
    const due = taskDueInput.value;

    const newTask = createTask(title, due);

    tasks.push(newTask);
    renderTasks();
    taskTitleInput.value = '';
    taskDueInput.value = '';
    closeOverlay(addTaskOverlay);
}

// IMMEDIATE APPLICATION

renderTasks();
