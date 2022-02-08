import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, Unique } from 'typeorm';

@InputType('DBEntity', { isAbstract: true }) // to get input as InputType
@ObjectType()
@Entity()
@Unique(['host', 'port', 'serviceName'])
export class Db extends CoreEntity {
  @Field(() => String, { nullable: false })
  @Column({ unique: true, nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  host: string;

  @Field(() => Int, { nullable: false })
  @Column({ nullable: false })
  port: number;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  serviceName: string;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  username: string;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  password: string;
}
