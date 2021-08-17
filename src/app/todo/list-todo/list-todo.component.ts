import { ViewTodoDialogComponent } from '../view-todo-dialog/view-todo-dialog.component';
import { ITodo } from './../../interfaces/todo.interface';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { TodoService } from '../service/todo.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs/operators';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'om-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss'],
})
export class ListTodoComponent implements OnInit, AfterViewInit {
  private originalTodoList: ITodo[] = [];
  public todoList: ITodo[] = [];
  public statusList: IStatus[] = [
    { key: 'completed ', value: 0 },
    { key: 'not-completed', value: 1 },
  ];
  @ViewChild('searchBox') searchBox: ElementRef<HTMLElement>;
  constructor(private todoService: TodoService, public dialog: MatDialog) {
    this.todoService.getTodoList().subscribe((list: ITodo[]) => {
      this.todoList = list;
      this.originalTodoList = list;
    });
  }

  ngAfterViewInit(): void {
    const searchResult$ = fromEvent(this.searchBox.nativeElement, 'input').pipe(
      map((e) => (e.target as HTMLInputElement).value),
      debounceTime(10),
      distinctUntilChanged(),
      switchMap((searchTerm) => this.todoService.searchTodo(searchTerm))
    );

    searchResult$.subscribe((x: ITodo[]) => {
      this.originalTodoList = x;
      this.todoList = x;
    });
  }

  ngOnInit(): void {}

  public todoClickHander = (data: string) => {
    this.openDialog();
  };

  public changeHandler = (data: MatSlideToggleChange): void => {
    console.log(data.checked);
    if (data.checked) {
      this.todoList = this.originalTodoList.filter((x) => {
        return !x.done;
      });
    } else {
      this.todoList = this.originalTodoList;
    }
    console.log(this.todoList);
  };

  public todoCompleteClickHandler = (id: string): void => {
    let todo = this.originalTodoList.find((x) => x.id === id);
    todo!.done = new Date().toString();
    this.todoService.updateTodo(todo).subscribe((x) => console.log(x));
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

interface IStatus {
  key: string;
  value: number;
}
