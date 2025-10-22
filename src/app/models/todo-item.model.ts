import { Status } from './todo-status';

export class TodoItemModel {
  private static nextId = 1;
  id: number;
  title: string;
  description: string;
  deadline: Date;
  isDone: boolean;
  status: Status;

  constructor(
    title: string,
    description: string,
    deadline: Date,
    status: Status = 'normal',
    isDone: boolean = false
  ) {
    this.id = TodoItemModel.nextId++;
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.status = status;
    this.isDone = isDone;
  }

  switchIsDone() {
    this.isDone = !this.isDone;
  }
}
