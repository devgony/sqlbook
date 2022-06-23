import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ViewColumn, ViewEntity } from 'typeorm';
import { SqlStat } from './sqlStat.entity';

@InputType('SqlStatTextEntity', { isAbstract: true }) // to get input as InputType
@ObjectType()
@ViewEntity({
  name: `VW_SQLSTAT_TEXT`,
  expression: `
    SELECT * FROM DBA_HIST_SQLSTAT LEFT JOIN DBA_HIST_SQLTEXT USING(DBID, SQL_ID)
    `,
})
export class SqlStatText extends SqlStat {
  @Field(() => String)
  @ViewColumn()
  SQL_TEXT: string;
}
