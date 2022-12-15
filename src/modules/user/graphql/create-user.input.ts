import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class CreateUserInput {
  @IsNotEmpty()
  @Length(4)
  @Field(() => String)
  username: string;

  @IsNotEmpty()
  @Length(4)
  @Field(() => String)
  password: string;

  @IsNotEmpty()
  @Length(2)
  @Field(() => String)
  fullname: string;
}
