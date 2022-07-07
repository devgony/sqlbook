import { InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { ResultOutput } from 'src/common/dtos/result.dto';
import { Db } from '../entities/dbs.entity';

@InputType()
export class CreateDbInput extends OmitType(Db, [
  'ID',
  'CREATED_AT',
  'UPDATED_AT',
]) { }

@ObjectType()
export class CreateDbOutput extends ResultOutput { }
