import { DrugRepository } from './adapters/db/repositories/drug-repository';
import { VaccinationRepository } from './adapters/db/repositories/vaccination-repository';
import { CreateDrugHandler } from './application/cqrs/command/create-drug.handler';
import { CreateVaccinationHandler } from './application/cqrs/command/create-vaccination.handler';
import { DeleteDrugHandler } from './application/cqrs/command/delete-drug.handler';
import { DeleteVaccinationHandler } from './application/cqrs/command/delete-vaccination.handler';
import { UpdateDrugHandler } from './application/cqrs/command/update-drug.handler';
import { UpdateVaccinationHandler } from './application/cqrs/command/update-vaccination.handler';
import { FindSingleDrugHandler } from './application/cqrs/query/find-single-drug.handler';
import { ListingDrugHandler } from './application/cqrs/query/listing-drug.handler';
import { ListingVaccinationHandler } from './application/cqrs/query/listing-vaccination.handler';
import { DrugService } from './application/services/drug.service';
import { VaccinationService } from './application/services/vaccination.service';

export const CommandHandlers = [
  CreateDrugHandler,
  UpdateDrugHandler,
  DeleteDrugHandler,
  CreateVaccinationHandler,
  UpdateVaccinationHandler,
  DeleteVaccinationHandler,
];
export const QueryHandlers = [
  FindSingleDrugHandler,
  ListingDrugHandler,
  ListingVaccinationHandler,
];
export const Services = [
  {
    provide: 'DrugService',
    useClass: DrugService,
  },
  {
    provide: 'VaccinationService',
    useClass: VaccinationService,
  },
];
export const Repositories = [
  {
    provide: 'DrugRepository',
    useClass: DrugRepository,
  },
  {
    provide: 'VaccinationRepository',
    useClass: VaccinationRepository,
  },
];

export const VaccinationProviders = [
  ...CommandHandlers,
  ...QueryHandlers,
  ...Services,
  ...Repositories,
];
