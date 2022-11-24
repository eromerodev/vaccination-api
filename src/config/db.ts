import * as pg from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';

pg.types.setTypeParser(20, pg.types.getTypeParser(21));
pg.types.setTypeParser(1700, 'text', parseFloat);

//I put the DB credentials here for dev purpose only...
//(in real life projects you can use aws secret, vault, env variables, etc....)

export const TypeOrmConfig = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'vaccination',
  autoLoadEntities: true,
  logging: true,
  synchronize: false,
  migrationsRun: false,
});
