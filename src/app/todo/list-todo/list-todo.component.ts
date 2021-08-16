import { ViewTodoDialogComponent } from '../view-todo-dialog/view-todo-dialog.component';
import { ITodo } from './../../interfaces/todo.interface';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from '../service/todo.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'om-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss'],
})
export class ListTodoComponent implements OnInit {
  public todoList$: Observable<ITodo[]>;

  constructor(private todoService: TodoService, public dialog: MatDialog) {
    this.todoList$ = this.todoService.getTodoList();
  }

  ngOnInit(): void {}

  public todoClickHander = (data: string) => {
    this.openDialog();
  };

  private openDialog(): void {
    const selectedTodo = {};
    const dialogRef = this.dialog.open(ViewTodoDialogComponent, {
      width: '300px',
      data: selectedTodo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
}
