import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbsService } from './dbs.service';
import { Db } from './entities/dbs.entity';
import { DbsResolver } from './dbs.resolver';
import { SqlStat } from './entities/sqlStat.entity';
import { SqlText } from './entities/sqlText.entity';
import { SqlStatText } from './entities/sqlStatText.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Db, SqlStat, SqlText, SqlStatText])],
  providers: [DbsResolver, DbsService],
  exports: [DbsService],
})
export class DbsModule {}
