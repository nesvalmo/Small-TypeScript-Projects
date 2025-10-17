"use strict";
// TYPE SECTION
// CLASS SECTION
// GLOBAL VARIABLES SECTION
const addTaskOverlay = document.getElementById('addTaskOverlay');
const getStartedButton = document.getElementById('addTaskButton');
const addTaskButton = document.getElementById('addTaskSubmit');
const cancelTaskButton = document.getElementById('cancelAddTask');
const taskTitleInput = document.getElementById('taskTitle');
const taskDueInput = document.getElementById('taskDue');
const taskContainer = document.getElementById('taskContainer');
const tableInfo = document.getElementById('table_info');
const previousTasksOverlay = document.getElementById('previousTasksOverlay');
const previousTasksButton = document.getElementById('previousTasksButton');
const previousTasksContainer = document.getElementById('previousTasksContainer');
let tasks = [];
let doneTasks = [];
// FUNCTION SECTION
// OVERLAY FUNCTIONS
function closeOverlay(inputElement) {
    inputElement.classList.add("close");
}
function openOverlay(inputElement, focusElement) {
    inputElement.classList.remove("close");
    if (focusElement) {
        // ensure focus happens after the overlay becomes visible
        setTimeout(() => {
            try {
                focusElement.focus();
            }
            catch (_a) {
                focusElement.focus();
            }
        }, 0);
    }
}
function hideElement(inputElement) {
    inputElement.classList.add("hide");
}
function showElement(inputElement) {
    inputElement.classList.remove("hide");
}
document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'a' && addTaskOverlay.classList.contains("close") && previousTasksOverlay.classList.contains("close")) {
        openOverlay(addTaskOverlay, taskTitleInput);
    }
    else if (event.key === 'Escape' && !addTaskOverlay.classList.contains("close")) {
        closeOverlay(addTaskOverlay);
    }
    else if (event.key === 'Escape' && !previousTasksOverlay.classList.contains("close")) {
        closeOverlay(previousTasksOverlay);
    }
});
document.addEventListener('click', (event) => {
    var _a;
    if (event.target instanceof HTMLElement && event.target.classList.contains('complete_button')) {
        const taskId = event.target.id.replace('complete_', '');
        const targetTaskIndex = tasks.findIndex(task => task.id === taskId);
        if (tasks[targetTaskIndex]) {
            tasks[targetTaskIndex].isComplete = true;
            tasks[targetTaskIndex].completionDate = new Date();
            doneTasks.push(tasks[targetTaskIndex]);
            tasks.splice(targetTaskIndex, 1);
        }
        (_a = event.target.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add('done_task');
        renderPreviousTasks();
        setTimeout(() => {
            renderTasks();
        }, 1000);
    }
});
document.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.classList.contains('restore_button')) {
        const taskId = event.target.id.replace('restore_', '');
        const targetTaskIndex = doneTasks.findIndex(task => task.id === taskId);
        if (doneTasks[targetTaskIndex]) {
            doneTasks[targetTaskIndex].isComplete = false;
            tasks.push(doneTasks[targetTaskIndex]);
            doneTasks.splice(targetTaskIndex, 1);
        }
        renderTasks();
        renderPreviousTasks();
    }
});
addTaskOverlay.addEventListener('click', (event) => {
    if (event.target === addTaskOverlay) {
        closeOverlay(addTaskOverlay);
    }
    else if (event.target === cancelTaskButton) {
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
function renderTasks() {
    if (tasks.length === 0 && doneTasks.length === 0) {
        hideElement(tableInfo);
        taskContainer.innerHTML = '<p class="no_tasks">No tasks here yet,<br />press ‘A’ to get started,<br />or rest...</p><img src="./media/resting.svg" alt="A guy resting near beach" id="noTaskImage">';
        return;
    }
    else if (tasks.length === 0) {
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
function renderPreviousTasks() {
    if (doneTasks.length === 0) {
        previousTasksContainer.innerHTML = '<p class="no_tasks">You haven\'t completed<br />any tasks yet</p><img src="./media/resting.svg" alt="A guy resting near beach" id="noTaskImage">';
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
            <div class="task_completed"><p>${task.completionDate ? task.completionDate.toLocaleDateString() : ''}</p></div>
        `;
        previousTasksContainer.appendChild(taskElement);
    });
}
function createTask(title, due) {
    if (!title || title.trim().length === 0) {
        throw new Error("Task title cannot be empty.");
    }
    if (title.length > 100) {
        throw new Error("Task title is too long.");
    }
    const newTask = {
        id: crypto.randomUUID(),
        title: title.trim(),
        due: due.trim(),
        isComplete: false
    };
    return newTask;
}
function handleAddTask(event) {
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
renderPreviousTasks();
//# sourceMappingURL=app.js.map