import { TaskObject } from '../../task/graphql/task';
import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { GraphQLID } from 'graphql/type';
import { RoleObject } from '../../role/graphql/role';

@ObjectType()
export class UserObject {
  @Field(() => GraphQLID)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  fullname: string;

  @Field(() => RoleObject, { nullable: true })
  role?: RoleObject;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => [TaskObject])
  tasks: TaskObject[];
}
