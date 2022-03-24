import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const oracledb = require('oracledb');
oracledb.initOracleClient({
  libDir: process.env.ORACLE_HOME,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
bootstrap();
