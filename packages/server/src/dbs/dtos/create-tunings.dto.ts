import { InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { Field } from '@nestjs/graphql';
import { ResultOutput } from 'src/common/dtos/result.dto';
import { Tuning } from '../entities/tuning.entity';

@InputType()
class TuningInput extends OmitType(Tuning, [
  'id',
  'created_at',
  'updated_at',
]) { }

@InputType()
export class CreateTuningsInput {
  @Field(() => [TuningInput])
  tunings: TuningInput[];
}

@ObjectType()
export class CreateTuningsOutput extends ResultOutput { }
