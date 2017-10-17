import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskService} from "../task.service";
import {Task} from "../Task";
import {ActivatedRoute, Router} from '@angular/router';
import {Cookie} from 'ng2-cookies/ng2-cookies'; 

@Component({
  //selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css'],
  providers: [TaskService]
})

export class TaskCreateComponent implements OnInit, OnDestroy {

  taskId: number;
  task: Task;

  taskForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private taskService: TaskService) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.taskId = params['taskId'];
      console.log(params);
    });
    
    

    this.taskForm = new FormGroup({
      taskName: new FormControl('', Validators.required),
      taskDescription: new FormControl('', Validators.required),
      assignedTo: new FormControl('', Validators.required),
      assignedBy: new FormControl('', Validators.required)
    });
    console.log(this.taskId);
    
    console.log("cookie implementation");
    console.log(Cookie.get("cookieSample"))
    
    console.log("Using the local storage object for fetching the values of the form and getting them displayed on the update form");
    
    var taskToUpdate = (localStorage.getItem("tasks")); 
    var tasks2 = JSON.parse(taskToUpdate);
    for(var i = 0; i<tasks2.length;i++){
      if(tasks2[i].taskId == this.taskId){
            console.log(tasks2[i]);
        
            this.taskForm.controls['taskName'].setValue(tasks2[i].taskName);
            this.taskForm.controls['taskDescription'].setValue(tasks2[i].taskDescription);
            this.taskForm.controls['assignedTo'].setValue(tasks2[i].assignedTo);
            this.taskForm.controls['assignedBy'].setValue(tasks2[i].assignedBy);

        }
      }
    }

    // if(this.taskId){
    //   this.taskService.findById(this.taskId).subscribe(
    //     task => {
    //          this.taskId = task.taskId;
    //          //console.log(task);
    //          this.taskForm.patchValue({
    //            taskName : task.taskName,
    //            taskDescription: task.taskDescription,
    //            assignedTo: task.assignedTo,
    //            assignedBy: task.assignedBy,
               
    //          });
             
    //     },error => {
    //       console.log(error);
    //     }

    //   );
      
    // }
    
  

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit(){
    if(this.taskForm.valid){
      if(this.taskId){
        let task: Task = new Task(this.taskId,
            this.taskForm.controls['taskName'].value,
            this.taskForm.controls['taskDescription'].value,
            this.taskForm.controls['assignedTo'].value,
            this.taskForm.controls['assignedBy'].value);
            this.taskService.saveTask(task).subscribe();
            //console.log(task);
      }else{
        let task: Task = new Task(null,
            this.taskForm.controls['taskName'].value,
            this.taskForm.controls['taskDescription'].value,
            this.taskForm.controls['assignedTo'].value,
            this.taskForm.controls['assignedBy'].value);
            this.taskService.saveTask(task).subscribe();
            //console.log(task);
            this.taskForm.reset();
            this.router.navigate(['/task']);
        }
  
        
      this.taskForm.reset();
      this.router.navigate(['/task']);
      Cookie.delete("cookieSample");
    }
  }

  redirectTaskPage(){
    this.router.navigate(['/task']);
  }

}
