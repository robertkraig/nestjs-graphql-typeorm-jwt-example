import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLID } from 'graphql/type';

@ObjectType()
export class RoleObject {
  @Field(() => GraphQLID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  isAdmin: boolean;
}
