import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

@InputType('SqlTextEntity', { isAbstract: true }) // to get input as InputType
@ObjectType()
@Entity({ name: 'DBA_HIST_SQLTEXT' })
export class SqlText {
  // @OneToMany(() => SqlHist, sqlHist => sqlHist.sqlText)
  // @JoinColumn([{ name: 'DBID' }, { name: 'SQL_ID' }])
  // sqlHists: SqlHist[];

  @Field(() => Number)
  @PrimaryColumn({ type: 'decimal', precision: 22, nullable: false })
  DBID: number;

  @Field(() => String)
  @PrimaryColumn({ type: 'varchar', length: 13, nullable: false })
  SQL_ID: string;

  @Field(() => String)
  @Column({ type: 'longtext', nullable: true })
  SQL_TEXT: string;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  COMMAND_TYPE: number;
}
