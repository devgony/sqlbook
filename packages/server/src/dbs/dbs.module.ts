import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbsService } from './dbs.service';
import { Db } from './entities/dbs.entity';
import { DbsResolver } from './dbs.resolver';
import { SqlHist } from './entities/sqlHist.entity';
import { SqlText } from './entities/sqlText.entity';
import { SqlHistText } from './entities/sqlHistText.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Db, SqlHist, SqlText, SqlHistText])],
  providers: [DbsResolver, DbsService],
  exports: [DbsService],
})
export class DbsModule {}
