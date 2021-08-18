import { ITodo } from '../../app/interfaces/todo.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'om-view-todo-dialog',
  templateUrl: './view-todo-dialog.component.html',
  styleUrls: ['./view-todo-dialog.component.scss'],
})
export class ViewTodoDialogComponent implements OnInit {
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public category: string[] = [];
  constructor(
    public dialogRef: MatDialogRef<ViewTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITodo
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.category = this.data.category ? this.data?.category?.split(',') : [];
  }
  cancelClick(): void {
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.category.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(item: string): void {
    const index = this.category.indexOf(item);
    if (index >= 0) {
      this.category.splice(index, 1);
    }
  }
}
