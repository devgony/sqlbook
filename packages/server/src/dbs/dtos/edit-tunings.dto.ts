import { InputType, IntersectionType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { ResultOutput } from 'src/common/dtos/result.dto';
import { Tuning } from '../entities/tuning.entity';

@InputType()
export class EditTuningInput extends IntersectionType(
  PickType(Tuning, [
    'SQL_ID',
    'PLAN_HASH_VALUE',
  ]),
  PartialType(
    PickType(Tuning, [
      'ASSIGNEE',
      'COMPLETED',
      'COMMENT',
    ]))
) { }

@ObjectType()
export class EditTuningOutput extends IntersectionType(
  ResultOutput,
  PartialType(PickType(Tuning, [
    'SQL_ID',
    'PLAN_HASH_VALUE',
  ]),
  ))
{ }
