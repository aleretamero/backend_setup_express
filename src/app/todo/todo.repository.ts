import { TodoEntity } from './entity/todo.entity';

export class TodoRepository {
  private db: TodoEntity[] = [];

  create = async (todo: TodoEntity): Promise<void> => {
    this.db.push(todo);
  };

  findAll = async (): Promise<TodoEntity[]> => {
    return this.db;
  };

  findById = async (id: string): Promise<TodoEntity | null> => {
    return this.db.find((todo) => todo.id === id) ?? null;
  };

  update = async (
    id: string,
    newContent: Partial<TodoEntity>,
  ): Promise<void> => {
    const todo = this.db.find((todo) => todo.id === id);

    if (todo) Object.assign(todo, newContent);
  };

  delete = async (id: string): Promise<void> => {
    this.db = this.db.filter((todo) => todo.id !== id);
  };
}
