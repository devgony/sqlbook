import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DbsService } from './dbs.service';
import { CreateDbInput, CreateDbOutput } from './dtos/create-db.dto';
import { DeleteDbInput, DeleteDbOutput } from './dtos/delete-db.dto';
import { FindDbsOutput } from './dtos/find-dbs.dto';
import {
  FindSqlHistsInput,
  FindSqlHistsOutput,
} from './dtos/find-sql-hists.dto';
import { GatherSqlHistOutput } from './dtos/gather-sql-hist.dto';
import { GatherSqlTextOutput } from './dtos/gather-sql-text.dto';
import { TestDbInput, TestDbOuput } from './dtos/test-db.dto';

@Resolver()
export class DbsResolver {
  constructor(private readonly dbsService: DbsService) {}

  @Mutation(() => CreateDbOutput)
  async createDB(
    @Args('input') createDbInput: CreateDbInput,
  ): Promise<CreateDbOutput> {
    return this.dbsService.createDB(createDbInput);
  }

  @Mutation(() => DeleteDbOutput)
  async deleteDb(
    @Args('input') deletedbInput: DeleteDbInput,
  ): Promise<DeleteDbOutput> {
    return this.dbsService.deleteDb(deletedbInput);
  }

  @Query(() => FindDbsOutput)
  async findDbs(): Promise<FindDbsOutput> {
    return this.dbsService.findDbs();
  }

  @Query(() => TestDbOuput)
  async testDb(@Args('input') testdbInput: TestDbInput): Promise<TestDbOuput> {
    return this.dbsService.testDb(testdbInput);
  }

  @Query(() => GatherSqlHistOutput)
  async gatherSqlHist(): Promise<GatherSqlHistOutput> {
    return this.dbsService.gatherSqlHist();
  }

  @Query(() => GatherSqlTextOutput)
  async gatherSqlText(): Promise<GatherSqlTextOutput> {
    return this.dbsService.gatherSqlText();
  }

  @Query(() => FindSqlHistsOutput)
  findSqlHists(
    @Args('input') findSqlHistTextsInput: FindSqlHistsInput,
  ): Promise<FindSqlHistsOutput> {
    return this.dbsService.findSqlHists(findSqlHistTextsInput);
  }
}
