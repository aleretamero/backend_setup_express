import { TodoEntity } from '../entity/todo.entity';

export class ReturnTodoDto {
  public id: string;
  public title: string;
  public description: string;
  public done: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(todo: TodoEntity) {
    this.id = todo.id;
    this.title = todo.title;
    this.description = todo.description;
    this.done = todo.done;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
