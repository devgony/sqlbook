import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { ResultOutput } from 'src/common/dtos/result.dto';
import { Db } from '../entities/dbs.entity';

@InputType()
export class DeleteLinkInput extends PickType(Db, ['name']) {}

@ObjectType()
export class DeleteLinkOutput extends ResultOutput {}
