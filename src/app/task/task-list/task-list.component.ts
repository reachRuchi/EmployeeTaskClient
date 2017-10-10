import { Component, OnInit } from '@angular/core';
import {Task} from "../task";
import {TaskService} from "../task.service";
import {Router} from "@angular/router";

@Component({
  //selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [TaskService]
})

export class TaskListComponent implements OnInit {
  private tasks : Task[];
  constructor(private router: Router,private taskService: TaskService) { }

  ngOnInit() {//when component loading get all the tasks and set the tasks[]
    this.getAllTasks();
  }

  getAllTasks(){
    this.taskService.findAll().subscribe(
      tasks =>{
        this.tasks = tasks;
      },
      err =>{
        console.log(err);
      }
    );
  }

  redirectNewTaskPage(){
    this.router.navigate(['/task/create']);
  }

  editTaskPage(task: Task){
    if(task){
      this.router.navigate(['/task/edit',task.taskId]);
    }
  }

  deleteTaskPage(task:Task){
    if(task){
      this.taskService.deleteTaskById(task.taskId).subscribe(
        res => {
          this.getAllTasks();
          this.router.navigate(['/task']);
          console.log('done');
        }
      );
    }
  }

}
