import { Component } from '@angular/core';
import {TodoItemModel} from '../../../../models/todo-item.model';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {NgClass} from '@angular/common';
import {TodoService} from '../../../../core/services/TodoService';
import {Status} from '../../../../models/todo-status';
import {NewTodoItemButton} from '../../components/new-todo-item-button/new-todo-item-button';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-todo-list-page',
  imports: [
    CdkDropList,
    CdkDrag,
    NgClass,
    NewTodoItemButton,
    FormsModule,
  ],
  templateUrl: './todo-list-page.html',
  styleUrl: './todo-list-page.scss'
})
export class TodoListPage {
  todos: TodoItemModel[] = [];
  modalOpen = false;
  newTitle = 'title';
  newDescription = 'descrption';
  newStatus: Status = 'important';

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
      },
      error: (err) => console.error('Error adding todo:', err)
    });
  }

  resetForm(): void {
    this.newTitle = '';
    this.newDescription = '';
    this.newStatus = 'normal';
  }


  drop(event: CdkDragDrop<TodoItemModel[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

  deleteItem(event: CdkDragDrop<TodoItemModel[]>) {
    if (event.container.id !== 'trash') return;
    const todo = event.item.data as TodoItemModel;
    if (todo?.id == null) {
      console.warn('Todo has no id, cannot delete.');
      return;
    }

    this.todoService.deleteTodo(todo).subscribe({
      next: () => {
        this.todos = this.todos.filter(t => t.id !== todo.id);
      },
      error: (err) => {
        console.error('delete failed', err);
      }
    });
  }

  openCloseModal() { this.modalOpen = !this.modalOpen; }
  closeModal() { this.modalOpen = false; }
}
