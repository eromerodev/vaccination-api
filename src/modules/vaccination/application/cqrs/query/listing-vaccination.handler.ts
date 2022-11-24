import { map } from 'lodash';
import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { VaccinationDto } from '@vaccination/application/dto/vaccination.dto';
import { IVaccinationRepository } from '@vaccination/domain/interfaces/vaccination-repository.interface';
import { ListingVaccinationQuery } from './listing-vaccination.query';
import { Vaccination } from '@vaccination/domain/entities/vaccination';

@QueryHandler(ListingVaccinationQuery)
export class ListingVaccinationHandler
  implements IQueryHandler<ListingVaccinationQuery, VaccinationDto[]>
{
  /**
   *
   */
  constructor(
    @Inject('VaccinationRepository')
    private readonly vaccinationRepository: IVaccinationRepository,
  ) {}

  async execute(): Promise<VaccinationDto[]> {
    const data = await this.vaccinationRepository.findAll();
    return map(data, (drug: Vaccination) => {
      return { ...drug, date: drug.date.toISOString() };
    }) as VaccinationDto[];
  }
}
