import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugController } from './adapters/controllers/drug.controller';
import { VaccinationController } from './adapters/controllers/vaccination.controller';
import { DrugEntity } from './adapters/db/models/drug.entity';
import { VaccinationEntity } from './adapters/db/models/vaccination.entity';
import { VaccinationProviders } from './vaccination.providers';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([DrugEntity, VaccinationEntity]),
  ],
  controllers: [DrugController, VaccinationController],
  providers: [...VaccinationProviders],
})
export class VaccinationModule {}
