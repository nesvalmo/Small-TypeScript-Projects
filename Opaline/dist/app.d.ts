interface Task {
    id: string;
    title: string;
    due: string;
    isComplete: boolean;
    completionDate?: Date;
}
declare const addTaskOverlay: HTMLDivElement;
declare const getStartedButton: HTMLSpanElement;
declare const addTaskButton: HTMLButtonElement;
declare const cancelTaskButton: HTMLButtonElement;
declare const taskTitleInput: HTMLInputElement;
declare const taskDueInput: HTMLInputElement;
declare const taskContainer: HTMLDivElement;
declare const tableInfo: HTMLDivElement;
declare const previousTasksOverlay: HTMLDivElement;
declare const previousTasksButton: HTMLButtonElement;
declare const previousTasksContainer: HTMLDivElement;
declare let tasks: Task[];
declare let doneTasks: Task[];
declare function closeOverlay(inputElement: HTMLElement): void;
declare function openOverlay(inputElement: HTMLElement, focusElement?: HTMLElement): void;
declare function hideElement(inputElement: HTMLElement): void;
declare function showElement(inputElement: HTMLElement): void;
declare function renderTasks(): void;
declare function renderPreviousTasks(): void;
declare function createTask(title: string, due: string): Task;
declare function handleAddTask(event: Event): void;
//# sourceMappingURL=app.d.ts.map