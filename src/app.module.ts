import { Module } from '@nestjs/common';
import { TypeOrmConfig } from '@config/db';
import { AuthModule } from '@auth/auth.module';
import { VaccinationModule } from '@vaccination/vaccination.module';

@Module({
  imports: [TypeOrmConfig, AuthModule, VaccinationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
