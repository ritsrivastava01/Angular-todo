import { TranslateModule } from '@ngx-translate/core';
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
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    TranslateModule,
  ],
  exports: [ListTodoComponent],
})
export class TodoModule {}
