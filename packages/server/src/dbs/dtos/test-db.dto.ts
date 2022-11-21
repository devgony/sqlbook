import { InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { ResultOutput } from 'src/common/dtos/result.dto';
import { Db } from '../entities/dbs.entity';

@InputType()
export class TestDbInput extends OmitType(Db, [
  'ID',
  'dbid',
  'CREATED_AT',
  'UPDATED_AT',
]) {}

@ObjectType()
export class TestDbOuput extends ResultOutput {}
