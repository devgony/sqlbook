import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ViewColumn, ViewEntity } from 'typeorm';
import { SqlStat } from './sqlStat.entity';

@InputType('SqlStatTextEntity', { isAbstract: true }) // to get input as InputType
@ObjectType()
@ViewEntity({
  name: `VW_SQL_STAT_TEXT`,
  expression: `
    SELECT * FROM TB_SQL_STAT LEFT JOIN TB_SQL_TEXT USING(DBID, SQL_ID)
    `,
})
export class SqlStatText extends SqlStat {
  @Field(() => String)
  @ViewColumn()
  SQL_TEXT: string;
}
