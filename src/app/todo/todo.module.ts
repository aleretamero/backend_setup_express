import { TodoController } from './todo.controller';
import { TodoRepository } from './todo.repository';
import { TodoService } from './todo.service';

class TodoModule {
  private readonly todoRepository: TodoRepository;
  private readonly todoService: TodoService;
  public readonly todoController: TodoController;

  constructor() {
    this.todoRepository = new TodoRepository();
    this.todoService = new TodoService(this.todoRepository);
    this.todoController = new TodoController(this.todoService);
  }
}

const todoModule = new TodoModule();

export const todoController = todoModule.todoController;
