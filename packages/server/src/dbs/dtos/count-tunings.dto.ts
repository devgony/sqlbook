import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CountResult } from 'src/common/dtos/countResult.dto';
import { ResultOutput } from 'src/common/dtos/result.dto';

@ObjectType()
export class CountTuningsOutput extends ResultOutput {
  @Field(() => [CountResult], { nullable: true })
  results?: CountResult[];
}
