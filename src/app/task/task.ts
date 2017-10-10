export class Task{
    taskId: number;
    taskName: string;
    taskDescription: string;
    assignedTo: string;
    assignedBy: string;

    constructor(taskId: number, taskName: string, taskDescription: string, assignedTo: string, assignedBy: string){
        this.taskId = taskId;
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.assignedTo = assignedTo;
        this.assignedBy = assignedBy;
    }
}