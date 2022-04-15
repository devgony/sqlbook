import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@InputType('SqlHistEntity', { isAbstract: true }) // to get input as InputType
@ObjectType()
@Entity({ name: 'TB_SQL_HIST' })
export class SqlHist {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10 })
  SNAP_ID: number;
  @Field(() => Date)
  @Column({ type: 'timestamp' })
  BEGIN_INTERVAL_TIME: number;
  @Field(() => Date)
  @Column({ type: 'timestamp' })
  END_INTERVAL_TIME: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10 })
  DBID: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10 })
  INSTANCE_NUMBER: number;
  @Field(() => String)
  @Column({ type: 'varchar', length: 20 })
  SQL_ID: number;
  @Field(() => Number)
  @Column({ type: 'decimal', precision: 10 })
  PLAN_HASH_VALUE: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  VERSION_COUNT: number;
  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 64, nullable: true })
  MODULE: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  FETCHES_TOTAL: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  FETCHES_DELTA: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  END_OF_FETCH_COUNT_TOTAL: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  END_OF_FETCH_COUNT_DELTA: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  SORTS_TOTAL: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  SORTS_DELTA: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  EXECUTIONS_TOTAL: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  EXECUTIONS_DELTA: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  LOADS_TOTAL: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  LOADS_DELTA: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  PARSE_CALLS_TOTAL: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  PARSE_CALLS_DELTA: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  DISK_READS_TOTAL: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  DISK_READS_DELTA: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  BUFFER_GETS_TOTAL: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  BUFFER_GETS_DELTA: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  ROWS_PROCESSED_TOTAL: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  ROWS_PROCESSED_DELTA: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  CPU_TIME_TOTAL: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  CPU_TIME_DELTA: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  ELAPSED_TIME_TOTAL: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  ELAPSED_TIME_DELTA: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  DIRECT_WRITES_TOTAL: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  DIRECT_WRITES_DELTA: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  PHYSICAL_READ_BYTES_TOTAL: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  PHYSICAL_READ_BYTES_DELTA: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  PHYSICAL_WRITE_BYTES_TOTAL: number;
  @Field(() => Number, { nullable: true })
  @Column({ type: 'decimal', precision: 10, nullable: true })
  PHYSICAL_WRITE_BYTES_DELTA: number;
}
