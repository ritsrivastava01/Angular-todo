import { ViewTodoDialogComponent } from '../../../shared/view-todo-dialog/view-todo-dialog.component';
import { ITodo } from './../../interfaces/todo.interface';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { TodoService } from '../service/todo.service';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'om-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss'],
  providers: [DatePipe],
})
export class ListTodoComponent implements OnInit, AfterViewInit {
  private originalTodoList: ITodo[] = [];
  public todoList: ITodo[] = [];
  public statusList: IStatus[] = [
    { key: 'completed ', value: 0 },
    { key: 'not-completed', value: 1 },
  ];
  @ViewChild('searchBox') searchBox: ElementRef<HTMLElement>;
  constructor(
    private todoService: TodoService,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {
    this.getTotoList();
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

  public todoClickedHander = (id: string) => {
    let todo = this.todoList.find((x) => x.id === id);
    this.openDialog(todo);
  };

  public changeHandler = (data: MatSlideToggleChange): void => {
    if (data.checked) {
      this.todoList = this.originalTodoList.filter((x) => {
        return !x.done;
      });
    } else {
      this.todoList = this.originalTodoList;
    }
  };

  public completeTodoHandler = (id: string): void => {
    let todo = this.originalTodoList.find((x) => x.id === id);
    todo!.done = this.datePipe.transform(Date.now(), 'dd-MM-yyyy')?.toString();
    this.todoService.updateTodo(todo).subscribe((x) => {
      this.snackBar.open('Todo complected successfully');
    });
  };

  public deleteTodoHandler = (id: string): void => {
    this.todoService.deleteTodo(id).subscribe((x) => {
      this.snackBar.open('Todo deleted successfully');
    });
  };
  private openDialog(todo: ITodo | undefined): void {
    const dialogRef = this.dialog.open(ViewTodoDialogComponent, {
      width: '300px',
      data: todo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  private getTotoList = (): void => {
    this.todoService.getTodoList().subscribe((list: ITodo[]) => {
      this.todoList = list;
      this.originalTodoList = list;
    });
  };
}

interface IStatus {
  key: string;
  value: number;
}
