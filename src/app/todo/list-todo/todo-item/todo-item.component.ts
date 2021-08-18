import { ITodo } from './../../../interfaces/todo.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'om-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: ITodo;
  @Output() todoClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteTodoClicked: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() completeTodoClicked: EventEmitter<string> =
    new EventEmitter<string>();
  public category: string[] = [];
  constructor() {
    this.todo = {};
  }

  ngOnInit(): void {
    this.category = this.todo?.category ? this.todo?.category?.split(',') : [];
  }

  public clickTodo = () => this.todoClicked.emit(this.todo.id);

  public deleteTodo = () => this.deleteTodoClicked.emit(this.todo.id);

  public completeTodo = (): void => this.completeTodoClicked.emit(this.todo.id);
}
