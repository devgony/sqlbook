import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ViewColumn, ViewEntity } from 'typeorm';
import { SqlHist } from './sqlHist.entity';

@InputType('SqlHistTextEntity', { isAbstract: true }) // to get input as InputType
@ObjectType()
@ViewEntity({
  expression: `
    SELECT * FROM TB_SQL_HIST LEFT JOIN TB_SQL_TEXT USING(DBID, SQL_ID)
    `,
})
export class SqlHistText extends SqlHist {
  @Field(() => String)
  @ViewColumn()
  SQL_TEXT: string;
}
