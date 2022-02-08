import { Field, ObjectType } from '@nestjs/graphql';
import { Db } from '../entities/dbs.entity';

@ObjectType()
export class FindDbsOutput {
  @Field(() => [Db])
  dbs: Db[];
}
