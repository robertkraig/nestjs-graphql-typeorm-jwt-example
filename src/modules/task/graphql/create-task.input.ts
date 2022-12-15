import { TaskStatuses } from '../../../database/entities/task.entity';
import {
  IsNotEmpty,
  IsDateString,
  IsOptional,
  Length,
  IsString,
} from 'class-validator';
import { Field, InputType, registerEnumType } from '@nestjs/graphql';

registerEnumType(TaskStatuses, {
  name: 'TaskStatuses',
});

@InputType()
export class CreateTaskInput {
  @IsNotEmpty()
  @IsString()
  @Length(5)
  @Field(() => String)
  name: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => TaskStatuses, { nullable: true })
  taskStatus?: TaskStatuses;

  @IsOptional()
  @IsDateString()
  @Field(() => Date, { nullable: true })
  dueDate?: Date;
}
