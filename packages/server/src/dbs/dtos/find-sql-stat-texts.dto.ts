import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { SqlStatText } from '../entities/sqlStatText.entity';

@InputType()
export class FindSqlStatTextsInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  dbName?: string;
  @Field(() => Date, { nullable: true })
  date?: Date;
  @Field(() => String, { nullable: true })
  module?: string;
  @Field(() => String, { nullable: true })
  user?: string;
}

@ObjectType()
export class FindSqlStatTextsOutput extends PaginationOutput {
  @Field(() => [SqlStatText], { nullable: true })
  sqlStatTexts?: SqlStatText[];
}
