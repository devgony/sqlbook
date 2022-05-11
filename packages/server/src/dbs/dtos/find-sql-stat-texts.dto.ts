import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { SqlStatText } from '../entities/sqlStatText.entity';

@InputType()
export class FindSqlStatTextsInput extends PaginationInput {
  @Field(() => String)
  dbName: string;
  @Field(() => Date)
  date: Date;
  @Field(() => String)
  module: string;
  @Field(() => String)
  user: string;
}

@ObjectType()
export class FindSqlStatTextsOutput extends PaginationOutput {
  @Field(() => [SqlStatText], { nullable: true })
  sqlStatTexts?: SqlStatText[];
}
