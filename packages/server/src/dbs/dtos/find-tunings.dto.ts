import { Field, ObjectType } from "@nestjs/graphql";
import { ResultOutput } from "src/common/dtos/result.dto";
import { Tuning } from "../entities/tuning.entity";

@ObjectType()
export class FindTuningsOutput extends ResultOutput {
  @Field(() => [Tuning], { nullable: true })
  tunings?: Tuning[];
}
