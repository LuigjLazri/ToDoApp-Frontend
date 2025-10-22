import { Component } from '@angular/core';
import {TodoItemModel} from '../../../../models/todo-item.model';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-todo-list-page',
  imports: [
    CdkDropList,
    CdkDrag,
    NgClass,
  ],
  templateUrl: './todo-list-page.html',
  styleUrl: './todo-list-page.scss'
})
export class TodoListPage {
  todos: TodoItemModel[] = [
    new TodoItemModel('Buy groceries', 'Milk, eggs, and bread', new Date('2025-10-25'), 'important'),
    new TodoItemModel('Finish report', 'Due Monday', new Date('2025-10-22'), 'very important'),
    new TodoItemModel('Clean desk', 'Organize workspace', new Date('2025-10-24'), 'normal')
  ];


  drop(event: CdkDragDrop<TodoItemModel[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

  deleteItem(event: CdkDragDrop<TodoItemModel[]>) {
    const draggedItem = event.item.data as TodoItemModel;
    console.log("id: " + draggedItem.id)
    console.log("title: " + draggedItem.title)

    if (!draggedItem) return;

    this.todos = this.todos.filter(todo => todo.id !== draggedItem.id);
  }


}
