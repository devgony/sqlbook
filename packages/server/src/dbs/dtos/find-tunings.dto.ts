import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { ResultOutput } from 'src/common/dtos/result.dto';
import { Db } from '../entities/dbs.entity';
import { Tuning } from '../entities/tuning.entity';

@InputType()
export class FindTuningsInput extends PickType(Db, ['name']) {}

@ObjectType()
export class FindTuningsOutput extends ResultOutput {
  @Field(() => [Tuning], { nullable: true })
  tunings?: Tuning[];
}
