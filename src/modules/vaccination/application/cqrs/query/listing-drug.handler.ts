import { map } from 'lodash';
import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { DrugDto } from '@vaccination/application/dto/drug.dto';
import { IDrugRepository } from '@vaccination/domain/interfaces/drug-repository.interface';
import { ListingDrugQuery } from './listing-drug.query';
import { Drug } from '@vaccination/domain/entities/drug';

@QueryHandler(ListingDrugQuery)
export class ListingDrugHandler
  implements IQueryHandler<ListingDrugQuery, DrugDto[]>
{
  /**
   *
   */
  constructor(
    @Inject('DrugRepository') private readonly drugRepository: IDrugRepository,
  ) {}

  async execute(): Promise<DrugDto[]> {
    const data = await this.drugRepository.findAll();
    return map(data, (drug: Drug) => {
      return { ...drug, availableAt: drug.availableAt.toISOString() };
    }) as DrugDto[];
  }
}
