import { ObjectType } from '@nestjs/graphql';
import { ResultOutput } from 'src/common/dtos/result.dto';

@ObjectType()
export class GatherSqlTextOutput extends ResultOutput {}
