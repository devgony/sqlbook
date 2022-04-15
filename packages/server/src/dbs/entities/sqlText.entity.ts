import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@InputType('SqlTextEntity', { isAbstract: true }) // to get input as InputType
@ObjectType()
@Entity({ name: 'TB_SQL_TEXT' })
export class SqlText {
  @PrimaryColumn({ type: 'decimal', precision: 38 })
  @Field(() => Int)
  DBID: number;
  @PrimaryColumn({ type: 'varchar', length: 13 })
  @Field(() => String)
  SQL_ID: number;
  @Field(() => String)
  @Column({ type: 'text' })
  SQL_TEXT: string;
}
