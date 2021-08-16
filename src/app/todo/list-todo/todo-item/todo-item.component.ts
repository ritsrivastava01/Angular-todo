import { ITodo } from './../../../interfaces/todo.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'om-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: ITodo;
  @Output() todoClick: EventEmitter<string> = new EventEmitter<string>();
  constructor() {
    this.todo = {};
  }

  ngOnInit(): void {}

  public todoClicked = () => this.todoClick.emit(this.todo.id);
}
