import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CountResult {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  count: number;
}
