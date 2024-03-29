import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, Index, PrimaryColumn, Unique } from 'typeorm';

@InputType('TuningEntity', { isAbstract: true }) // to get input as InputType
@ObjectType()
@Entity({ name: 'TB_TUNING' })
@Unique('TB_TUNING_IDX1', ['SQL_ID', 'PLAN_HASH_VALUE'])
export class Tuning extends CoreEntity {
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, scale: 0, nullable: false })
  DBID: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, scale: 0, nullable: false })
  INSTANCE_NUMBER: number;

  @Field(() => String)
  @Column({ type: 'varchar', length: 13, nullable: false })
  SQL_ID: string;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 22, scale: 0, nullable: true })
  PLAN_HASH_VALUE: number;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  ASSIGNEE?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 1, default: 'N' })
  COMPLETED?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'longtext', nullable: true })
  COMMENT?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 30, nullable: true })
  PARSING_SCHEMA_NAME?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 64, nullable: true })
  MODULE?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 13, nullable: true })
  JOB_NAME?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'longtext', nullable: true })
  SQL_TEXT?: string;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 44, scale: 0, nullable: true })
  EXECUTIONS?: number;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 44, scale: 0, nullable: true })
  BUFFER_GETS_TOTAL?: number;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 44, scale: 0, nullable: true })
  ROWS_PROCESSED?: number;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 51, scale: 6, nullable: true })
  TOTAL_ELAPSED_MIN?: number;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 45, scale: 0, nullable: true })
  AVG_ROWS?: number;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 51, scale: 6, nullable: true })
  AVG_ELAPSED_SEC?: number;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 45, scale: 0, nullable: true })
  AVG_BUFFER_GETS?: number;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 46, scale: 1, nullable: true })
  AVG_DISK_READS?: number;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 51, scale: 6, nullable: true })
  TOTAL_CPU_MIN?: number;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 51, scale: 6, nullable: true })
  TOTAL_IOWAIT_MIN?: number;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 51, scale: 6, nullable: true })
  TOTAL_CLWAIT_MIN?: number;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 51, scale: 6, nullable: true })
  TOTAL_APWAIT_MIN?: number;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 51, scale: 6, nullable: true })
  TOTAL_CCWAIT_MIN?: number;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 51, scale: 6, nullable: true })
  AVG_CPU_SEC?: number;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 51, scale: 6, nullable: true })
  AVG_IOWAIT_SEC?: number;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 51, scale: 6, nullable: true })
  AVG_CLWAIT_SEC?: number;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 51, scale: 6, nullable: true })
  AVG_APWAIT_SEC?: number;

  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 51, scale: 6, nullable: true })
  AVG_CCWAIT_SEC?: number;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  LAST_EXEC_TIME?: Date;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  FIRST_EXEC_TIME?: Date;
}
