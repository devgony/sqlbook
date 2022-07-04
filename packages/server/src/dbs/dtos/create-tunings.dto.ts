import { InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { ResultOutput } from 'src/common/dtos/result.dto';
import { Tuning } from '../entities/tuning.entity';

@InputType()
export class CreateTuningsInput extends OmitType(Tuning, [
  'id',
  'created_at',
  'updated_at',
]) { }

@ObjectType()
export class CreateTuningsOutput extends ResultOutput { }
