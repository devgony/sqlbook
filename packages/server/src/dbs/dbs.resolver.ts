import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DbsService } from './dbs.service';
import { CountTopSqlsOutput } from './dtos/count-topsqls.dto';
import { CountTuningsOutput } from './dtos/count-tunings.dto';
import { CreateDbInput, CreateDbOutput } from './dtos/create-db.dto';
import {
  CreateTuningsInput,
  CreateTuningsOutput,
} from './dtos/create-tunings.dto';
import { DeleteDbInput, DeleteDbOutput } from './dtos/delete-db.dto';
import { EditTuningInput, EditTuningOutput } from './dtos/edit-tunings.dto';
import { FindDbsOutput } from './dtos/find-dbs.dto';
import {
  FindSqlStatTextsInput,
  FindSqlStatTextsOutput,
} from './dtos/find-sql-stat-texts.dto';
import { FindTopSqlsInput, FindTopSqlsOutput } from './dtos/find-topsqls.dto';
import { FindTuningsInput, FindTuningsOutput } from './dtos/find-tunings.dto';
import { GatherSnapshotOutput } from './dtos/gather-snapshot-dto';
import { GatherSqlStatOutput } from './dtos/gather-sql-stat.dto';
import { GatherSqlTextOutput } from './dtos/gather-sql-text.dto';
import { GatherInput, GatherOutput } from './dtos/gather.dto';
import { TestDbInput, TestDbOuput } from './dtos/test-db.dto';

@Resolver()
export class DbsResolver {
  constructor(private readonly dbsService: DbsService) {}

  @Mutation(() => CreateDbOutput)
  async createDb(
    @Args('input') createDbInput: CreateDbInput,
  ): Promise<CreateDbOutput> {
    return this.dbsService.createDb(createDbInput);
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

  // @Query(() => GatherSqlStatOutput)
  // async gatherSqlStat(): Promise<GatherSqlStatOutput> {
  //   return this.dbsService.gatherSqlStat();
  // }

  // @Query(() => GatherSqlTextOutput)
  // async gatherSqlText(): Promise<GatherSqlTextOutput> {
  //   return this.dbsService.gatherSqlText();
  // }

  // @Query(() => GatherSnapshotOutput)
  // async gatherSnapshot(): Promise<GatherSnapshotOutput> {
  //   return this.dbsService.gatherSnapshot();
  // }

  @Query(() => GatherOutput)
  async gather(@Args('input') gatherInput: GatherInput): Promise<GatherOutput> {
    return this.dbsService.gather(gatherInput);
  }

  @Query(() => FindSqlStatTextsOutput)
  findSqlStatTexts(
    @Args('input') findSqlHistTextsInput: FindSqlStatTextsInput,
  ): Promise<FindSqlStatTextsOutput> {
    return this.dbsService.findSqlStatTexts(findSqlHistTextsInput);
  }

  @Query(() => FindTopSqlsOutput)
  findTopSqls(
    @Args('input') findTopSqlsInput: FindTopSqlsInput,
  ): Promise<FindTopSqlsOutput> {
    return this.dbsService.findTopSqls(findTopSqlsInput);
  }

  @Query(() => FindTuningsOutput)
  findTunings(
    @Args('input') findTuningsInput: FindTuningsInput,
  ): Promise<FindTuningsOutput> {
    return this.dbsService.findTunings(findTuningsInput);
  }

  @Mutation(() => CreateTuningsOutput)
  createTunings(
    @Args('input') createTuningsInput: CreateTuningsInput,
  ): Promise<CreateTuningsOutput> {
    return this.dbsService.createTunings(createTuningsInput);
  }

  @Mutation(() => EditTuningOutput)
  editTuning(
    @Args('input') editTuningInput: EditTuningInput,
  ): Promise<EditTuningOutput> {
    return this.dbsService.editTuning(editTuningInput);
  }

  @Query(() => CountTopSqlsOutput)
  countTopSqls(): Promise<CountTopSqlsOutput> {
    return this.dbsService.countTopSqls();
  }

  @Query(() => CountTuningsOutput)
  countTunings(): Promise<CountTuningsOutput> {
    return this.dbsService.countTunings();
  }
}
