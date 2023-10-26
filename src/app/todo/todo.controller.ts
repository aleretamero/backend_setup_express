import { NextFunction, Request, Response } from 'express';
import { createTodoDtoSchema } from './dtos/create-todo.dto';
import { TodoService } from './todo.service';
import { updateTodoDtoSchema } from './dtos/update-todo.dto';

export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const createTodoDto = createTodoDtoSchema.parse(req.body);

      const todo = await this.todoService.create(createTodoDto);

      res.status(201).json(todo);
    } catch (error) {
      next(error);
    }
  };

  index = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const todos = await this.todoService.findAll();

      res.status(200).json(todos);
    } catch (error) {
      next(error);
    }
  };

  show = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const todo = await this.todoService.findById(id);

      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const updateTodoDto = updateTodoDtoSchema.parse(req.body);

      const todo = await this.todoService.update(id, updateTodoDto);

      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  };

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const todo = await this.todoService.delete(id);

      res.status(204).json(todo);
    } catch (error) {
      next(error);
    }
  };
}
