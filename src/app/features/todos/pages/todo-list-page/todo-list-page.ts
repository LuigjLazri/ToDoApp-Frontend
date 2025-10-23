import { Component } from '@angular/core';
import {TodoItemModel} from '../../../../models/todo-item.model';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {NgClass} from '@angular/common';
import {TodoService} from '../../../../core/services/TodoService';
import {Status} from '../../../../models/todo-status';

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
  todos: TodoItemModel[] = [];

  newTitle = '';
  newDescription = '';
  newStatus: Status = 'normal';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (data) => (this.todos = data),
      error: (err) => console.error('Error fetching todos:', err)
    });
  }

  addTodo(): void {
    if (!this.newTitle) {
      alert('Title is required.');
      return;
    }
    const newTodo = new TodoItemModel(
      this.newTitle,
      this.newDescription,
      this.newStatus,
      false
    );

    this.todoService.addTodo(newTodo).subscribe({
      next: (savedTodo) => {
        this.todos.push(savedTodo);
        this.resetForm();
      },
      error: (err) => console.error('Error adding todo:', err)
    });
  }

  private resetForm(): void {
    this.newTitle = '';
    this.newDescription = '';
    this.newStatus = 'normal';
  }


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
