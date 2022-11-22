import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { CountResult } from 'src/common/dtos/countResult.dto';
import { errLog } from 'src/common/hooks/errLog';
import { getErrorMessage } from 'src/common/hooks/getErrorMessage';
import { querySnapshot, querySqlStat, querySqlText } from 'src/common/queries';
import {
  Connection,
  createConnection,
  createQueryBuilder,
  Like,
  MoreThan,
  Repository,
} from 'typeorm';
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
import { Db } from './entities/dbs.entity';
import { Snapshot } from './entities/snapshot.entity';
import { SqlStat } from './entities/sqlStat.entity';
import { SqlStatText } from './entities/sqlStatText.entity';
import { SqlText } from './entities/sqlText.entity';
import { TopSql } from './entities/topsql.entity';
import { Tuning } from './entities/tuning.entity';

@Injectable()
export class DbsService {
  constructor(
    @InjectRepository(Db)
    private readonly dbs: Repository<Db>,
    @InjectRepository(SqlStat)
    private readonly sqlHists: Repository<SqlStat>,
    @InjectRepository(SqlText)
    private readonly sqlTexts: Repository<SqlText>,
    @InjectRepository(Snapshot)
    private readonly snapshots: Repository<Snapshot>,
    @InjectRepository(SqlStatText)
    private readonly sqlStatTexts: Repository<SqlStatText>,
    @InjectRepository(TopSql)
    private readonly topSqls: Repository<TopSql>,
    @InjectRepository(Tuning)
    private readonly tunings: Repository<Tuning>, // @InjectConnection('connOracle') private readonly ora: Connection,
  ) {}
  async createDb({
    name,
    host,
    port,
    schema,
    username,
    password,
  }: CreateDbInput): Promise<CreateDbOutput> {
    try {
      const dbExists = await this.dbs.findOne({
        where: { host, port, schema },
      });
      if (dbExists) {
        return { ok: false, error: 'DB already exists.' };
      }
      const nameExists = await this.dbs.findOne({
        where: { name },
      });
      if (nameExists) {
        return {
          ok: false,
          error: 'The name already exists',
        };
      }

      const connection = await createConnection({
        type: 'oracle',
        name,
        host,
        port,
        username,
        password,
        serviceName: schema,
      });
      if (!connection.isConnected) {
        return { ok: false, error: 'Connection failed' };
      }
      const db = await connection.query('SELECT DBID FROM V$DATABASE');

      const dbid = db[0].DBID;

      await this.dbs.save(
        this.dbs.create({
          dbid,
          name,
          host,
          port,
          schema,
          username,
          password,
        }),
      );

      connection.close();
      return { ok: true };
    } catch (error) {
      return { ok: false, error: getErrorMessage(error) };
    }
  }

  async findDbs(): Promise<FindDbsOutput> {
    try {
      const dbs = await this.dbs.find();
      return { dbs };
    } catch (error) {
      errLog(__filename, error);
    }
  }

  async testDb({
    name,
    host,
    port,
    schema,
    username,
    password,
  }: TestDbInput): Promise<TestDbOuput> {
    try {
      console.log(port);
      // const { host, port, database, username, password } =
      //   await this.Dbs.findOne({ where: { name } });
      // if (!host) {
      //   return { ok: false, error: 'Connection does not exist' };
      // }
      // do sth
      const connection = await createConnection({
        type: 'oracle',
        name,
        host,
        port,
        username,
        password,
        serviceName: schema,
      });
      if (!connection.isConnected) {
        return { ok: false, error: 'Connection failed' };
      }
      connection.close();
      // await this.getPool({ host, port, database, username, password });
      return { ok: true };
    } catch (error) {
      errLog(__filename, error);
      return { ok: false, error: getErrorMessage(error) };
    }
  }

  // async execQuery({
  //   name,
  //   host,
  //   port,
  //   schema,
  //   username,
  //   password,
  // }: TestDbInput) {
  // }

  async deleteDb({ name }: DeleteDbInput): Promise<DeleteDbOutput> {
    try {
      const db = await this.dbs.findOne({ where: { name } });
      if (!db) {
        return { ok: false, error: 'The Db does not exists' };
      }
      this.dbs.delete(db.ID);
      return { ok: true };
    } catch (error) {
      errLog(__filename, error);
      return { ok: false, error: 'Could not delete DB' };
    }
  }

  // async gatherSqlStat(): Promise<GatherSqlStatOutput> {
  //   try {
  //     const sqlHist: SqlStat[] = await this.ora.query(querySqlStat);
  //     await this.sqlHists.insert(sqlHist);
  //     // await this.sqlHists.save(this.sqlHists.create(sqlHist));
  //     return { ok: true };
  //   } catch (error) {
  //     errLog(__filename, error);
  //     return { ok: false, error };
  //   }
  // }

  // async gatherSqlText(): Promise<GatherSqlTextOutput> {
  //   try {
  //     const sqlTexts: SqlText[] = await this.ora.query(querySqlText);
  //     await this.sqlTexts.upsert(sqlTexts, {
  //       conflictPaths: ['DBID', 'SQL_ID'],
  //     }); // how to avoid update? -> QBuilder + orIgnore
  //     // await this.sqlTexts.insert(sqlTexts); // dup error
  //     // await this.sqlTexts.save(this.sqlTexts.create(sqlText)); // does not work with bulk
  //     return { ok: true };
  //   } catch (error) {
  //     errLog(__filename, error);
  //     return { ok: false, error };
  //   }
  // }

  // async gatherSnapshot(): Promise<GatherSnapshotOutput> {
  //   try {
  //     const snapshots: Snapshot[] = await this.ora.query(querySnapshot);
  //     await this.snapshots.upsert(snapshots, {
  //       conflictPaths: ['DBID', 'SNAP_ID'],
  //     });
  //     return { ok: true };
  //   } catch (error) {
  //     errLog(__filename, error);
  //     return { ok: false, error };
  //   }
  // }

  async gather(input: GatherInput): Promise<GatherOutput> {
    try {
      const {
        name,
        host,
        port,
        username,
        password,
        schema: serviceName,
      } = await this.dbs.findOne({
        where: { name: input.name },
      });

      const connection = await createConnection({
        type: 'oracle',
        name,
        host,
        port,
        username,
        password,
        serviceName,
      });

      if (!connection.isConnected) {
        return { ok: false, error: 'Connection failed' };
      }

      const sqlHist: SqlStat[] = await connection.query(querySqlStat);
      await this.sqlHists.insert(sqlHist);

      const sqlTexts: SqlText[] = await connection.query(querySqlText);
      await this.sqlTexts.upsert(sqlTexts, {
        conflictPaths: ['DBID', 'SQL_ID'],
      });

      const snapshots: Snapshot[] = await connection.query(querySnapshot);
      await this.snapshots.upsert(snapshots, {
        conflictPaths: ['DBID', 'SNAP_ID'],
      });

      connection.close();
      return { ok: true };
    } catch (error) {
      errLog(__filename, error);
      return { ok: false, error: getErrorMessage(error) };
    }
  }

  isValidDate(date) {
    return !isNaN(date) && date instanceof Date;
  }

  async findSqlStatTexts({
    page,
    dbName,
    date,
    module,
    user,
  }: FindSqlStatTextsInput): Promise<FindSqlStatTextsOutput> {
    const PER_PAGE = 10;
    try {
      const [sqlStatTexts, totalResults] = await this.sqlStatTexts.findAndCount(
        {
          skip: (page - 1) * PER_PAGE,
          take: PER_PAGE,
          where: {
            ...(this.isValidDate(date) && {
              END_INTERVAL_TIME: MoreThan(date),
            }),
            ...(module && {
              MODULE: module,
            }),
          },
          // order: {
          // }
        },
      );
      return {
        ok: true,
        sqlStatTexts,
        totalPages: Math.ceil(totalResults / PER_PAGE),
        totalResults,
      };
    } catch (error) {
      errLog(__filename, error);
      return { ok: false, error };
    }
  }

  async findTopSqls({
    type,
    min,
    take,
    module,
    targetDb,
  }: FindTopSqlsInput): Promise<FindTopSqlsOutput> {
    try {
      const where =
        type == 'ELAPSED_TIME'
          ? { AVG_ELAPSED_SEC: MoreThan(min) }
          : { BUFFER_GETS_TOTAL: MoreThan(min) };

      where['MODULE'] = Like(`%${module}%`);

      const target = await this.dbs.findOne({ where: { name: targetDb } });
      console.log(target);

      if (target) {
        where['DBID'] = target.dbid;
      }

      const topSqls = await this.topSqls.find({
        where,
        take,
        order:
          type == 'ELAPSED_TIME'
            ? { AVG_ELAPSED_SEC: 'DESC' }
            : { BUFFER_GETS_TOTAL: 'DESC' },
      });
      return { ok: true, topSqls };
    } catch (error) {
      errLog(__filename, error);
      return { ok: false, error };
    }
  }

  async findTunings({ name }: FindTuningsInput): Promise<FindTuningsOutput> {
    try {
      const db = await this.dbs.findOne({ where: { name } });
      if (db) {
        const DBID = db.dbid;
        const tunings = await this.tunings.find({ where: { DBID } });
        return { ok: true, tunings };
      }
      return { ok: false, error: 'could not find db' };
    } catch (error) {
      errLog(__filename, error);
      return { ok: false, error };
    }
  }

  async createTunings({
    tunings,
  }: CreateTuningsInput): Promise<CreateTuningsOutput> {
    try {
      const where = tunings?.map(tuning => ({
        SQL_ID: tuning.SQL_ID,
        PLAN_HASH_VALUE: tuning.PLAN_HASH_VALUE,
      }));
      if (where.length == 0) {
        return { ok: false, error: 'No tunings are selected.' };
      }
      console.log('where:', where);
      const tuningsExists = await this.tunings.findOne({ where });
      if (tuningsExists) {
        return { ok: false, error: 'tunings are already exists.' };
      }
      await this.tunings.save(this.tunings.create(tunings));
      return { ok: true };
    } catch (error) {
      errLog(__filename, error);
      return { ok: false, error };
    }
  }

  async editTuning({
    DBID,
    SQL_ID,
    PLAN_HASH_VALUE,
    ASSIGNEE,
    COMPLETED,
    COMMENT,
  }: EditTuningInput): Promise<EditTuningOutput> {
    try {
      const tuning = await this.tunings.findOne({
        where: { DBID, SQL_ID, PLAN_HASH_VALUE },
      });
      if (!tuning) {
        return { ok: false, error: 'cannot find tuning' };
      }
      await this.tunings.save({
        ...tuning,
        ASSIGNEE,
        COMPLETED,
        COMMENT,
      });
      const updated = await this.tunings.findOne({
        DBID,
        SQL_ID,
        PLAN_HASH_VALUE,
      });
      return {
        ok: true,
        DBID,
        SQL_ID,
        PLAN_HASH_VALUE,
        ASSIGNEE: updated.ASSIGNEE,
        COMPLETED: updated.COMPLETED,
        COMMENT: updated.COMMENT,
      };
    } catch (error) {
      errLog(__filename, error);
      return { ok: false, error };
    }
  }

  async countTopSqls(): Promise<CountTopSqlsOutput> {
    try {
      const results: CountResult[] = await createQueryBuilder(TopSql)
        .innerJoin(Db, 'd', 'TopSql.DBID = d.dbid')
        .select('d.name, count(*) AS count')
        // .where('d.name in (:...dbNames)', { dbNames })
        .groupBy('d.name')
        .getRawMany();
      return { ok: true, results };
    } catch (error) {
      errLog(__filename, error);
      return { ok: false, error };
    }
  }

  async countTunings(): Promise<CountTuningsOutput> {
    try {
      const results: CountResult[] = await createQueryBuilder(Tuning)
        .innerJoin(Db, 'd', 'Tuning.DBID = d.dbid')
        .select('d.name, count(*) AS count')
        .groupBy('d.name')
        .getRawMany();
      return { ok: true, results };
    } catch (error) {
      errLog(__filename, error);
      return { ok: false, error };
    }
  }
}
