import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Db } from '../entities/dbs.entity';

@ObjectType()
export class FindDbsOutput {
  @Field(() => [Db])
  dbs: Db[];
}
