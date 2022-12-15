import { TaskStatuses } from '../../../database/entities/task.entity';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional, IsString,
  Length,
} from 'class-validator';
import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import { GraphQLID } from 'graphql/type';

@InputType()
export class UpdateTaskInput {
  @Field(() => GraphQLID)
  id: string;

  @IsNotEmpty()
  @Length(5)
  @Field(() => String)
  name: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatuses)
  @Field(() => TaskStatuses)
  taskStatus?: TaskStatuses;

  @IsOptional()
  @IsDateString()
  @Field(() => GraphQLISODateTime)
  dueDate?: Date;
}
