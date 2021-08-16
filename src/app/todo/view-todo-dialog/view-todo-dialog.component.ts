import { ITodo } from '../../interfaces/todo.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'om-view-todo',
  templateUrl: './view-todo-dialog.component.html',
  styleUrls: ['./view-todo-dialog.component.scss'],
})
export class ViewTodoDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ViewTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITodo
  ) {}

  ngOnInit(): void {}
}
