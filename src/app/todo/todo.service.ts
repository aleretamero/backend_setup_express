import { BadRequest, NotFound } from 'tsmaker-common';

import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { ReturnTodoDto } from './dtos/return-todo.dto';

import { TodoEntity } from './entity/todo.entity';
import { TodoRepository } from './todo.repository';

export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  create = async ({
    title,
    description,
  }: CreateTodoDto): Promise<ReturnTodoDto> => {
    const todo = new TodoEntity(title, description);

    await this.todoRepository.create(todo);

    return todo;
  };

  findAll = async (): Promise<ReturnTodoDto[]> => {
    const todos = await this.todoRepository.findAll();

    return todos.map((todo) => new ReturnTodoDto(todo));
  };

  findById = async (todoId: string): Promise<ReturnTodoDto> => {
    const todo = await this.todoRepository.findById(todoId);

    if (!todo) throw new NotFound(`Todo: id ${todoId} not found!`);

    return new ReturnTodoDto(todo);
  };

  update = async (
    todoId: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<ReturnTodoDto> => {
    if (Object.entries(updateTodoDto).length === 0)
      throw new BadRequest('The body of request is empty!');

    const todo = await this.todoRepository.findById(todoId);

    if (!todo) throw new NotFound(`Todo: id ${todoId} not found!`);

    await this.todoRepository.update(todoId, {
      ...updateTodoDto,
      updatedAt: new Date(),
    });

    return todo;
  };

  delete = async (todoId: string): Promise<void> => {
    const todo = await this.todoRepository.findById(todoId);

    if (!todo) throw new NotFound(`Todo: id ${todoId} not found!`);

    await this.todoRepository.delete(todoId);
  };
}
