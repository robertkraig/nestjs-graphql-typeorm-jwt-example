import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserPayload {
  @Field(() => String)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  role: string;

  @Field(() => Boolean)
  isAdmin: boolean;
}

@ObjectType()
export class AuthObject {
  @Field(() => String)
  Token: string;

  @Field(() => UserPayload)
  User: UserPayload;
}


