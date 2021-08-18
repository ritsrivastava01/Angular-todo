import { ITodo } from './interfaces/todo.interface';
import { ViewTodoDialogComponent } from '../shared/view-todo-dialog/view-todo-dialog.component';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Todo App';

  constructor(private translate: TranslateService, public dialog: MatDialog) {}

  public ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  public addNewTodoHandler = (): void => {
    this.openDialog();
  };

  private openDialog(): void {
    const newTodo: ITodo = {
      label: '',
      description: '',
      category: '',
      done: false,
    };
    const dialogRef = this.dialog.open(ViewTodoDialogComponent, {
      width: '450px',
      data: newTodo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
