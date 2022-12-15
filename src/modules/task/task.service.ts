import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskEntity } from '../../database/entities/task.entity';
import { plainToClass } from 'class-transformer';
import { CreateTaskInput } from './graphql/create-task.input';
import { UpdateTaskInput } from './graphql/update-task.input';
import { UserEntity } from '../../database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
  ) {}

  async create(input: CreateTaskInput, userId: string): Promise<TaskEntity> {
    const createTask = plainToClass(TaskEntity, input);
    createTask.user = <UserEntity>{ id: userId };
    const task = await this.tasksRepository.save(createTask);
    return this.findById(task.id);
  }

  async update(input: UpdateTaskInput): Promise<void> {
    const task = plainToClass(TaskEntity, input);
    await this.tasksRepository.update(task.id, input);
  }

  async findAll(): Promise<TaskEntity[]> {
    return await this.tasksRepository.find({
      order: {
        createdAt: 'DESC',
        updatedAt: 'DESC',
      },
      relations: ['user'],
    });
  }

  async findById(id: string): Promise<TaskEntity> {
    return await this.tasksRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });
  }
}
