import { IsNumberString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindOneTaskInput {
  @IsNumberString()
  @Field(() => String)
  id: string;
}
