import { ITodo } from './../../interfaces/todo.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  public getTodoList(): Observable<Array<ITodo>> {
    return this.http.get<ITodo[]>('http://localhost:3000/tasks');
  }
}
