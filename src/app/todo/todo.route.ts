import { Router } from 'express';
import { TodoController } from './todo.controller';
import { todoController } from './todo.module';

class TodoRouter {
  public readonly router = Router();

  constructor(private readonly todoController: TodoController) {
    this.routes();
  }

  private routes(): void {
    this.router.post('/', this.todoController.create);
    this.router.get('/', this.todoController.index);
    this.router.get('/:id', this.todoController.show);
    this.router.put('/:id', this.todoController.update);
    this.router.delete('/:id', this.todoController.delete);
  }
}

export const todoRouter = new TodoRouter(todoController).router;
