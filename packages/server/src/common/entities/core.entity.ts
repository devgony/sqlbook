import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class CoreEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  ID: number;

  @Field(() => Date)
  @CreateDateColumn()
  CREATED_AT: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  UPDATED_AT: Date;
}
