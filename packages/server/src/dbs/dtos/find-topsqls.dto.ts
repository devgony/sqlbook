import { Field, ObjectType } from '@nestjs/graphql';
import { ResultOutput } from 'src/common/dtos/result.dto';
import { Db } from '../entities/dbs.entity';
import { TopSql } from '../entities/topsql.entity';

@ObjectType()
export class FindTopSqlsOutput extends ResultOutput {
  @Field(() => [TopSql], { nullable: true })
  topSqls?: TopSql[];
}
