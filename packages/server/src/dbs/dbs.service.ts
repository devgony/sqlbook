import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { errLog } from 'src/common/hooks/errLog';
import { getErrorMessage } from 'src/common/hooks/getErrorMessage';
import { querySqlHist, querySqlText } from 'src/common/queries';
import { Connection, createConnection, Repository } from 'typeorm';
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
import { Db } from './entities/dbs.entity';
import { SqlHist } from './entities/sqlHist.entity';
import { SqlText } from './entities/sqlText.entity';

@Injectable()
export class DbsService {
  constructor(
    @InjectRepository(Db)
    private readonly dbs: Repository<Db>,
    @InjectRepository(SqlHist) private readonly sqlHists: Repository<SqlHist>,
    @InjectRepository(SqlText) private readonly sqlTexts: Repository<SqlText>,
    @InjectConnection('connOracle') private readonly ora: Connection,
  ) {}

  async createDB({
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
        return { ok: false, error: ' DB already exists.' };
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
      await this.dbs.save(
        this.dbs.create({
          name,
          host,
          port,
          schema,
          username,
          password,
        }),
      );
      return { ok: true };
    } catch (error) {
      return { ok: false, error: 'Could not create DB' };
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
      // const { host, port, database, username, password } =
      //   await this.Dbs.findOne({ where: { name } });
      // if (!host) {
      //   return { ok: false, error: 'Connection does not exist' };
      // }
      // do sth
      const connection = await createConnection({
        type: 'mysql',
        name,
        host,
        port,
        username,
        password,
        database: schema,
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

  async deleteDb({ name }: DeleteDbInput): Promise<DeleteDbOutput> {
    try {
      const db = await this.dbs.findOne({ where: { name } });
      if (!db) {
        return { ok: false, error: 'The Db does not exists' };
      }
      this.dbs.delete(db.id);
      return { ok: true };
    } catch (error) {
      errLog(__filename, error);
      return { ok: false, error: 'Could not delete DB' };
    }
  }

  async gatherSqlHist(): Promise<GatherSqlHistOutput> {
    try {
      const sqlHist: SqlHist[] = await this.ora.query(querySqlHist);
      await this.sqlHists.insert(sqlHist);
      // await this.sqlHists.save(this.sqlHists.create(sqlHist));
      return { ok: true };
    } catch (error) {
      errLog(__filename, error);
      return { ok: false, error };
    }
  }

  async gatherSqlText(): Promise<GatherSqlTextOutput> {
    try {
      const sqlTexts: SqlText[] = await this.ora.query(querySqlText);
      await this.sqlTexts.upsert(sqlTexts, {
        conflictPaths: ['DBID', 'SQL_ID'],
      }); // how to avoid update? -> QBuilder + orIgnore
      // await this.sqlTexts.insert(sqlTexts); // dup error
      // await this.sqlTexts.save(this.sqlTexts.create(sqlText)); // does not work with bulk
      return { ok: true };
    } catch (error) {
      errLog(__filename, error);
      return { ok: false, error };
    }
  }

  async findSqlHists({ page }: FindSqlHistsInput): Promise<FindSqlHistsOutput> {
    const PER_PAGE = 10;
    try {
      const [sqlHists, totalResults] = await this.sqlHists.findAndCount({
        skip: (page - 1) * PER_PAGE,
        take: PER_PAGE,
        // order: {
        // }
        // relations: ['SqlText'],
      });
      return {
        ok: true,
        sqlHists,
        totalPages: Math.ceil(totalResults / PER_PAGE),
        totalResults,
      };
    } catch (error) {
      errLog(__filename, error);
      return { ok: false, error };
    }
  }
}
