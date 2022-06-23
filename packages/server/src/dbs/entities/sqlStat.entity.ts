import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@InputType('SqlStatEntity', { isAbstract: true }) // to get input as InputType
@ObjectType()
@Entity({ name: 'DBA_HIST_SQLSTAT' })
export class SqlStat {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: false })
  SNAP_ID: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: false })
  DBID: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: false })
  INSTANCE_NUMBER: number;

  @Field(() => String)
  @Column({ type: 'varchar', length: 13, nullable: false })
  SQL_ID: string;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: false })
  PLAN_HASH_VALUE: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  OPTIMIZER_COST: number;

  @Field(() => String)
  @Column({ type: 'varchar', length: 10, nullable: true })
  OPTIMIZER_MODE: string;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  OPTIMIZER_ENV_HASH_VALUE: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  SHARABLE_MEM: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  LOADED_VERSIONS: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  VERSION_COUNT: number;

  @Field(() => String)
  @Column({ type: 'varchar', length: 64, nullable: true })
  MODULE: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 64, nullable: true })
  ACTION: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 64, nullable: true })
  SQL_PROFILE: string;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  FORCE_MATCHING_SIGNATURE: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  PARSING_SCHEMA_ID: number;

  @Field(() => String)
  @Column({ type: 'varchar', length: 30, nullable: true })
  PARSING_SCHEMA_NAME: string;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  PARSING_USER_ID: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  FETCHES_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  FETCHES_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  END_OF_FETCH_COUNT_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  END_OF_FETCH_COUNT_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  SORTS_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  SORTS_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  EXECUTIONS_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  EXECUTIONS_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  PX_SERVERS_EXECS_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  PX_SERVERS_EXECS_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  LOADS_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  LOADS_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  INVALIDATIONS_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  INVALIDATIONS_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  PARSE_CALLS_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  PARSE_CALLS_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  DISK_READS_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  DISK_READS_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  BUFFER_GETS_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  BUFFER_GETS_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  ROWS_PROCESSED_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  ROWS_PROCESSED_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  CPU_TIME_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  CPU_TIME_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  ELAPSED_TIME_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  ELAPSED_TIME_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  IOWAIT_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  IOWAIT_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  CLWAIT_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  CLWAIT_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  APWAIT_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  APWAIT_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  CCWAIT_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  CCWAIT_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  DIRECT_WRITES_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  DIRECT_WRITES_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  PLSEXEC_TIME_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  PLSEXEC_TIME_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  JAVEXEC_TIME_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  JAVEXEC_TIME_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  IO_OFFLOAD_ELIG_BYTES_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  IO_OFFLOAD_ELIG_BYTES_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  IO_INTERCONNECT_BYTES_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  IO_INTERCONNECT_BYTES_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  PHYSICAL_READ_REQUESTS_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  PHYSICAL_READ_REQUESTS_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  PHYSICAL_READ_BYTES_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  PHYSICAL_READ_BYTES_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  PHYSICAL_WRITE_REQUESTS_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  PHYSICAL_WRITE_REQUESTS_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  PHYSICAL_WRITE_BYTES_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  PHYSICAL_WRITE_BYTES_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  OPTIMIZED_PHYSICAL_READS_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  OPTIMIZED_PHYSICAL_READS_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  CELL_UNCOMPRESSED_BYTES_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  CELL_UNCOMPRESSED_BYTES_DELTA: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  IO_OFFLOAD_RETURN_BYTES_TOTAL: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  IO_OFFLOAD_RETURN_BYTES_DELTA: number;

  @Field(() => String)
  @Column({ type: 'blob', nullable: true })
  BIND_DATA: string;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: true })
  FLAG: number;
}
