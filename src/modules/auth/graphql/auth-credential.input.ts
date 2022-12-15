import { IsNotEmpty, IsString } from 'class-validator';
import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class AuthCredentialInput {
  @IsNotEmpty()
  @Field(() => String)
  username: string;

  @IsNotEmpty()
  @Field(() => String)
  password: string;
}
