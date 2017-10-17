import { Component, OnInit } from '@angular/core';
import {Task} from "../task";
import {TaskService} from "../task.service";
import {Router} from "@angular/router";
import {Cookie} from 'ng2-cookies/ng2-cookies';

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
        localStorage.setItem("tasks",JSON.stringify(this.tasks));
        Cookie.set("cookieSample",JSON.stringify(this.tasks));
        console.log(this.tasks);
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
          //this.getAllTasks();
          //console.log('done');
          //this.router.navigate(['/task']);
        }
      );
      
    }
    this.router.navigate(['/task']);
    
    this.getAllTasks();
    this.redirectTaskPage();
  }

  redirectTaskPage(){

    this.router.navigate(['/task']);
    
    this.getAllTasks();
    console.log("done");
  }

}
