import { TaskStatuses } from '../../../database/entities/task.entity';
import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { GraphQLID } from 'graphql/type';
import { UserObject } from '../../user/graphql/user';

@ObjectType()
export class TaskObject {
  @Field(() => GraphQLID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  dueDate: Date;

  @Field(() => TaskStatuses)
  taskStatus: TaskStatuses;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => UserObject)
  user: UserObject;
}
