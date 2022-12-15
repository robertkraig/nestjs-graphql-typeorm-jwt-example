import { UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskInput } from './graphql/create-task.input';
import { UpdateTaskInput } from './graphql/update-task.input';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskObject } from './graphql/task';
import { CurrentUser, GqlAuthGuard } from '../auth/auth-gql.guard';
import { UserPayload } from '../auth/graphql/auth';

@Resolver('task')
@UseGuards(GqlAuthGuard)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => TaskObject)
  async createTask(@Args('input') input: CreateTaskInput, @CurrentUser() user: UserPayload ): Promise<TaskObject> {
    return this.taskService.create(input, user.id);
  }

  @Mutation(() => TaskObject)
  async updateTask(@Args('input') input: UpdateTaskInput): Promise<TaskObject> {
    await this.taskService.update(input);

    return this.taskService.findById(input.id);
  }

  @Query(() => [TaskObject])
  async findAllTasks(): Promise<TaskObject[]> {
    return this.taskService.findAll();
  }

  @Query(() => TaskObject)
  async findOneTask(@Args('id') id: string): Promise<TaskObject> {
    return this.taskService.findById(id);
  }
}
