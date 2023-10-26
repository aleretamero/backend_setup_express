import { randomUUID } from 'node:crypto';

export class TodoEntity {
  public id: string;
  public title: string;
  public description: string;
  public done: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(title: string, description: string) {
    this.id = randomUUID();
    this.title = title;
    this.description = description;
    this.done = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
