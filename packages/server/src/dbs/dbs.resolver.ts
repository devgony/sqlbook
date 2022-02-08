import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { DbsService } from './dbs.service';
import { CreateDbInput, CreateDbOutput } from './dtos/create-db.dto';

@Resolver()
export class DbsResolver {
  constructor(private readonly dbsService: DbsService) {}

  @Mutation(() => CreateDbOutput)
  async createDB(
    @Args('input') createDbInput: CreateDbInput,
  ): Promise<CreateDbOutput> {
    return this.dbsService.createDB(createDbInput);
  }
}
