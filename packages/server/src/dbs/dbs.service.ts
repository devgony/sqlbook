import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDbInput, CreateDbOutput } from './dtos/create-db.dto';
import { Db } from './entities/dbs.entity';

@Injectable()
export class DbsService {
  constructor(
    @InjectRepository(Db)
    private readonly dbs: Repository<Db>,
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
      const db = await this.dbs.save(
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
}
