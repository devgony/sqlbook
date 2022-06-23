import {
  Field,
  InputType,
  ObjectType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { ResultOutput } from 'src/common/dtos/result.dto';
import { Db } from '../entities/dbs.entity';
import { TopSql } from '../entities/topsql.entity';

enum TopSqlType {
  ELAPSED_TIME = 'ELAPSED_TIME',
  BUFFER_GET = 'BUFFER_GET',
}

registerEnumType(TopSqlType, { name: 'TopSqlType' });

@InputType()
export class FindTopSqlsInput {
  @Field(() => TopSqlType)
  @IsEnum(TopSqlType)
  type: TopSqlType;

  @Field(() => Number)
  min: number;

  @Field(() => Number)
  take: number;

  @Field(() => String)
  module: string;
}

@ObjectType()
export class FindTopSqlsOutput extends ResultOutput {
  @Field(() => [TopSql], { nullable: true })
  topSqls?: TopSql[];
}
