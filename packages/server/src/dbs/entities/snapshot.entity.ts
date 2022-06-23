import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

@InputType('SnapshotEntity', { isAbstract: true }) // to get input as InputType
@ObjectType()
@Entity({ name: 'DBA_HIST_SNAPSHOT' })
export class Snapshot {
  @Field(() => Number)
  @PrimaryColumn({ type: 'decimal', precision: 22, nullable: false })
  SNAP_ID: number;

  @Field(() => Number)
  @PrimaryColumn({ type: 'decimal', precision: 22, nullable: false })
  DBID: number;

  @Field(() => Number)
  @Column({ type: 'decimal', precision: 22, nullable: false })
  INSTANCE_NUMBER: number;

  @Field(() => Date)
  @Column({ type: 'timestamp', nullable: false })
  STARTUP_TIME: Date;

  @Field(() => Date)
  @Column({ type: 'timestamp', nullable: false })
  BEGIN_INTERVAL_TIME: Date;

  @Field(() => Date)
  @Column({ type: 'timestamp', nullable: false })
  END_INTERVAL_TIME: Date;
}
