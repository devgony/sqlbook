import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { ResultOutput } from 'src/common/dtos/result.dto';
import { Db } from '../entities/dbs.entity';

@InputType()
export class DeleteDbInput extends PickType(Db, ['name']) {}

@ObjectType()
export class DeleteDbOutput extends ResultOutput {}
