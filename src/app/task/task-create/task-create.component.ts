import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskService} from "../task.service";
import {Task} from "../Task";
import {ActivatedRoute, Router} from '@angular/router';


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
    if(this.taskId){
      this.taskService.findById(this.taskId).subscribe(
        task => {
             this.taskId = task.taskId;
             this.taskForm.patchValue({
               taskName : task.taskName,
               taskDescription: task.taskDescription,
               assignedTo: task.assignedTo,
               assignedBy: task.assignedBy,
             });
             
        },error => {
          console.log(error);
        }
      );
    }
  }

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
      }else{
        let task: Task = new Task(null,
            this.taskForm.controls['taskName'].value,
            this.taskForm.controls['taskDescription'].value,
            this.taskForm.controls['assignedTo'].value,
            this.taskForm.controls['assignedBy'].value);
            this.taskService.saveTask(task).subscribe();
        }
  

      this.taskForm.reset();
      this.router.navigate(['/task']);
    }
  }

  redirectTaskPage(){
    this.router.navigate(['/task']);
  }

}
