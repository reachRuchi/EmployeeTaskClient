import { Injectable } from '@angular/core';
import {Task} from './task';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TaskService {

  private apiUrl = 'http://localhost:8080/tasks';

  constructor(private http:Http) { }

  //get all the tasks
  findAll(): Observable<Task[]>{
    return this.http.get(this.apiUrl)
                .map((res:Response)=> res.json())
                .catch((error:any)=>Observable.throw(error.json().error || 'Server Error'));
  }

  //say find by id
  findById(taskId: number): Observable<Task>{
    return this.http.get(this.apiUrl+ '/' + taskId)
                    .map((res:Response)=>res.json())
                    .catch((error:any)=> Observable.throw(error.json().error || 'Error'));
  }

  //saveUser post request
  saveTask(task:Task): Observable<Task>{
    return this.http.post(this.apiUrl,task)
                    .catch((error:any)=>Observable.throw(error.json.error || 'Server error'));
  }

  //delete task By Id
  deleteTaskById(taskId:number): Observable<boolean>{
    return this.http.delete(this.apiUrl+'/'+ taskId)
                     .map((res:Response) => res.json())
                     .catch((error:any)=> Observable.throw(error.json().error || 'Server error'));
                    
    }

  //update task
  //updateTask(task: Task): Observable<Task>{
    //return this.http.put(this.apiUrl +'/'+task.taskId , task)
      //              .map((res:Response) => res.json())
        //            .catch((error:any)=>Observable.throw(error.json().error || 'Server Error'));
  //}


}
