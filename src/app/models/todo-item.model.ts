import { Status } from './todo-status';

export class TodoItemModel {
  private static nextId = 1;
  id: number;
  title: string;
  description: string;
  completed: boolean;
  status: Status;

  constructor(
    title: string,
    description: string,
    status: Status = 'normal',
    completed: boolean = false
  ) {
    this.id = TodoItemModel.nextId++;
    this.title = title;
    this.description = description;
    this.status = status;
    this.completed = completed;
  }

  switchIsDone() {
    this.completed = !this.completed;
  }
}
