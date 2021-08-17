import { ITodo } from './../../interfaces/todo.interface';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private listTodo: ITodo[];
  constructor(private http: HttpClient) {
    this.fetchTodoList$();
  }

  public getTodoList = (): Observable<Array<ITodo>> => {
    return !this.listTodo ? this.fetchTodoList$() : of(this.listTodo);
  };

  public searchTodo = (searchText: string): Observable<ITodo[]> => {
    searchText = searchText.toLowerCase();
    console.log(this.listTodo);
    return of(
      this.listTodo.filter(
        (x: ITodo) =>
          x.description?.toLowerCase().includes(searchText) ||
          x.label?.toLowerCase().includes(searchText)
      )
    );
  };

  public updateTodo = (todo: ITodo | undefined): Observable<ITodo> => {
    console.log(todo);
    return this.http.patch<ITodo>(
      `http://localhost:3000/tasks/${todo?.id}`,
      todo
    );
  };

  private fetchTodoList$ = (): Observable<ITodo[]> => {
    return this.http.get<ITodo[]>('http://localhost:3000/tasks').pipe(
      catchError(() => {
        return [];
      }),
      map((response: ITodo[]) => {
        this.listTodo = response;
        return this.listTodo;
      })
    );
  };
}
