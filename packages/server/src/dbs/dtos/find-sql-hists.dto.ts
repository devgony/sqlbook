import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { SqlHist } from '../entities/sqlHist.entity';

@InputType()
export class FindSqlHistsInput extends PaginationInput {}

@ObjectType()
export class FindSqlHistsOutput extends PaginationOutput {
  @Field(() => [SqlHist], { nullable: true })
  sqlHists?: SqlHist[];
}
