interface Task {
    id: string;
    title: string;
    due: string;
    isComplete: boolean;
}
declare const addTaskOverlay: HTMLDivElement;
declare const getStartedButton: HTMLSpanElement;
declare const addTaskButton: HTMLButtonElement;
declare const taskTitleInput: HTMLInputElement;
declare const taskDueInput: HTMLInputElement;
declare const taskContainer: HTMLDivElement;
declare let tasks: Task[];
declare function closeOverlay(inputElement: HTMLElement): void;
declare function openOverlay(inputElement: HTMLElement): void;
declare function renderTasks(): void;
declare function createTask(title: string, due: string): Task;
declare function handleAddTask(event: Event): void;
//# sourceMappingURL=app.d.ts.map