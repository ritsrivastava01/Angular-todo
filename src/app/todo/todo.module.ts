import { CreateTodoComponent } from './create-todo/create-todo.component';
import { ViewTodoDialogComponent } from './view-todo-dialog/view-todo-dialog.component';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from './list-todo/todo-item/todo-item.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ListTodoComponent,
    ViewTodoDialogComponent,
    CreateTodoComponent,
    TodoItemComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [ListTodoComponent],
})
export class TodoModule {}
