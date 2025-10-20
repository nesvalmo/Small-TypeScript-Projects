// TYPE SECTION



// INTERFACE SECTION

interface Task {
    id: string;
    title: string;
    due: string;
    isComplete: boolean;
    completionDate?: string;
}

// CLASS SECTION



// GLOBAL VARIABLES SECTION

const addTaskOverlay = document.getElementById('addTaskOverlay') as HTMLDivElement;
const getStartedButton = document.getElementById('addTaskButton') as HTMLSpanElement;
const addTaskButton = document.getElementById('addTaskSubmit') as HTMLButtonElement;
const cancelTaskButton = document.getElementById('cancelAddTask') as HTMLButtonElement;
const taskTitleInput = document.getElementById('taskTitle') as HTMLInputElement;
const taskDueInput = document.getElementById('taskDue') as HTMLInputElement;
const taskContainer = document.getElementById('taskContainer') as HTMLDivElement;
const tableInfo = document.getElementById('table_info') as HTMLDivElement;
const previousTasksOverlay = document.getElementById('previousTasksOverlay') as HTMLDivElement;
const previousTasksButton = document.getElementById('previousTasksButton') as HTMLButtonElement;
const previousTasksContainer = document.getElementById('previousTasksContainer') as HTMLDivElement;

let tasks: Task[] = loadTasks();
let doneTasks: Task[] = loadCompletedTasks();

// FUNCTION SECTION

// DATA PERSISTENCE FUNCTIONS

function saveTasks(): void {
    let tasksJSON = JSON.stringify(doneTasks);
    localStorage.setItem('completeTasks', tasksJSON);
    console.log("Completed tasks saved!");
    tasksJSON = JSON.stringify(tasks);
    localStorage.setItem('incompleteTasks', tasksJSON);
    console.log("Pending tasks saved!");
}

function loadTasks(): Task[] {
    const tasksJSON = localStorage.getItem('incompleteTasks');
    if (tasksJSON == null) {
        return [];
    }
    try {
        return JSON.parse(tasksJSON) as Task[];
    } catch {
        console.error("Error parsing tasks from localStorage.");
        return [];
    }
}

function loadCompletedTasks(): Task[] {
    const tasksJSON = localStorage.getItem('completeTasks');
    if (tasksJSON == null) {
        return [];
    }
    try {
        return JSON.parse(tasksJSON) as Task[];
    } catch {
        console.error("Error parsing completed tasks from localStorage.");
        return [];
    }
}

// OVERLAY FUNCTIONS
function closeOverlay(inputElement: HTMLElement): void {
    inputElement.classList.add("close");
}

function openOverlay(inputElement: HTMLElement, focusElement?: HTMLElement): void {
    inputElement.classList.remove("close");
    if (focusElement) {
        // ensure focus happens after the overlay becomes visible
        setTimeout(() => {
            try {
                (focusElement as HTMLInputElement).focus();
            } catch {
                focusElement.focus();
            }
        }, 0);
    }
}

function hideElement(inputElement: HTMLElement): void {
    inputElement.classList.add("hide");
}

function showElement(inputElement: HTMLElement): void {
    inputElement.classList.remove("hide");
}

document.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key.toLowerCase() === 'a' && addTaskOverlay.classList.contains("close") && previousTasksOverlay.classList.contains("close")) {
    openOverlay(addTaskOverlay, taskTitleInput);
  } else if (event.key === 'Escape' && !addTaskOverlay.classList.contains("close")) {
    closeOverlay(addTaskOverlay);
  } else if (event.key === 'Escape' && !previousTasksOverlay.classList.contains("close")) {
    closeOverlay(previousTasksOverlay);
  }
});

document.addEventListener('click', (event: MouseEvent) => {
    if (event.target instanceof HTMLElement && event.target.classList.contains('complete_button')) {
        const taskId = (event.target as HTMLElement).id.replace('complete_', '');
        const targetTaskIndex = tasks.findIndex(task => task.id === taskId);
        if (tasks[targetTaskIndex]) {
            tasks[targetTaskIndex].isComplete = true;
            tasks[targetTaskIndex].completionDate = new Date().toLocaleDateString();
            doneTasks.push(tasks[targetTaskIndex]);
            tasks.splice(targetTaskIndex, 1);
        }
        event.target.parentElement?.classList.add('done_task');
        renderPreviousTasks();
        saveTasks();
        setTimeout(() => {
            renderTasks();
        }, 1000);
    }
});

document.addEventListener('click', (event: MouseEvent) => {
    if (event.target instanceof HTMLElement && event.target.classList.contains('restore_button')) {
        const taskId = (event.target as HTMLElement).id.replace('restore_', '');
        const targetTaskIndex = doneTasks.findIndex(task => task.id === taskId);
        if (doneTasks[targetTaskIndex]) {
            doneTasks[targetTaskIndex].isComplete = false;
            tasks.push(doneTasks[targetTaskIndex]);
            doneTasks.splice(targetTaskIndex, 1);
        }
        renderTasks();
        renderPreviousTasks();
        saveTasks();
    }
});

addTaskOverlay.addEventListener('click', (event) => {
    if (event.target === addTaskOverlay) {
        closeOverlay(addTaskOverlay);
    } else if (event.target === cancelTaskButton) {
        closeOverlay(addTaskOverlay);
    }
});

previousTasksOverlay.addEventListener('click', (event) => {
    if (event.target === previousTasksOverlay) {
        closeOverlay(previousTasksOverlay);
    }
});

getStartedButton.addEventListener('click', (event) => {
    openOverlay(addTaskOverlay, taskTitleInput);
});

previousTasksButton.addEventListener('click', (event) => {
    openOverlay(previousTasksOverlay);
});

addTaskButton.addEventListener('click', handleAddTask);

// TASK FUNCTIONS
function renderTasks(): void {
    if (tasks.length === 0 && doneTasks.length === 0) {
        hideElement(tableInfo);
        taskContainer.innerHTML = '<p class="no_tasks">No tasks here yet,<br />press ‘A’ to get started,<br />or rest...</p><img src="./media/resting.svg" alt="A guy resting near beach" id="noTaskImage">';
        return;
    } else if (tasks.length === 0) {
        hideElement(tableInfo);
        taskContainer.innerHTML = '<p class="no_tasks">Hooray!<br />All tasks completed!<br />Take a break or add more tasks.</p><img src="./media/resting.svg" alt="A guy resting near beach" id="noTaskImage">';
        return;
    }
    showElement(tableInfo);
    taskContainer.innerHTML = '';
    tasks.forEach((task) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.id = `task_${task.id}`;
        taskElement.innerHTML = `
            <div class="complete_button" id="complete_${task.id}"></div>
            <div class="task_title"><p>${task.title}</p></div>
            <div class="task_due"><p>${task.due}</p></div>
        `;
        taskContainer.appendChild(taskElement);
    });
}

function renderPreviousTasks(): void {
    if (doneTasks.length === 0) {
        previousTasksContainer.innerHTML = '<p class="no_tasks">You haven\'t completed<br />any tasks yet</p><img src="./media/empty_history.svg" alt="A guy looking at a to-do list" id="noTaskImage">';
        return;
    }
    previousTasksContainer.innerHTML = '';
    doneTasks.forEach((task) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.id = `task_${task.id}`;
        taskElement.innerHTML = `
            <div class="restore_button" id="restore_${task.id}"></div>
            <div class="task_title"><p>${task.title}</p></div>
            <div class="task_due"><p>${task.due}</p></div>
            <div class="task_completed"><p>${task.completionDate ? task.completionDate : ''}</p></div>
        `;
        previousTasksContainer.appendChild(taskElement);
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
    saveTasks();
}

// IMMEDIATE APPLICATION

renderTasks();
renderPreviousTasks();
