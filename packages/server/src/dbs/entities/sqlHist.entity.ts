import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, Unique } from 'typeorm';

@InputType('SqlHistEntity', { isAbstract: true }) // to get input as InputType
@ObjectType()
@Entity({ name: 'TB_SQL_HIST' })
// @Unique(['host', 'port', 'schema'])
export class SqlHist {
  @Field(() => Number, { nullable: false })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  SNAP_ID: number;
  @Field(() => Date, { nullable: false })
  @Column({ type: 'timestamp' })
  BEGIN_INTERVAL_TIME: number;
  @Field(() => Date, { nullable: false })
  @Column({ type: 'timestamp' })
  END_INTERVAL_TIME: number;
  @Field(() => Number, { nullable: false })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  DBID: number;
  @Field(() => Number, { nullable: false })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  INSTANCE_NUMBER: number;
  @Field(() => String, { nullable: false })
  @Column({ type: 'varchar', length: 20 })
  SQL_ID: number;
  @Field(() => Number, { nullable: false })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  PLAN_HASH_VALUE: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  VERSION_COUNT: number;
  @Field(() => String)
  @Column({ type: 'varchar', length: 64 })
  MODULE: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  FETCHES_TOTAL: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  FETCHES_DELTA: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  END_OF_FETCH_COUNT_TOTAL: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  END_OF_FETCH_COUNT_DELTA: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  SORTS_TOTAL: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  SORTS_DELTA: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  EXECUTIONS_TOTAL: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  EXECUTIONS_DELTA: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  LOADS_TOTAL: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  LOADS_DELTA: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  PARSE_CALLS_TOTAL: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  PARSE_CALLS_DELTA: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  DISK_READS_TOTAL: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  DISK_READS_DELTA: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  BUFFER_GETS_TOTAL: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  BUFFER_GETS_DELTA: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  ROWS_PROCESSED_TOTAL: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  ROWS_PROCESSED_DELTA: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  CPU_TIME_TOTAL: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  CPU_TIME_DELTA: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  ELAPSED_TIME_TOTAL: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  ELAPSED_TIME_DELTA: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  DIRECT_WRITES_TOTAL: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  DIRECT_WRITES_DELTA: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  PHYSICAL_READ_BYTES_TOTAL: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  PHYSICAL_READ_BYTES_DELTA: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  PHYSICAL_WRITE_BYTES_TOTAL: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  PHYSICAL_WRITE_BYTES_DELTA: number;
}
