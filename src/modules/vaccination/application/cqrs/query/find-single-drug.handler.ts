import { Inject, NotFoundException } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { DrugDto } from '@vaccination/application/dto/drug.dto';
import { IDrugRepository } from '@vaccination/domain/interfaces/drug-repository.interface';
import { FindSingleDrugQuery } from './find-single-drug.query';

@QueryHandler(FindSingleDrugQuery)
export class FindSingleDrugHandler
  implements IQueryHandler<FindSingleDrugQuery, DrugDto>
{
  /**
   *
   */
  constructor(
    @Inject('DrugRepository') private readonly drugRepository: IDrugRepository,
  ) {}

  async execute(query: FindSingleDrugQuery): Promise<DrugDto> {
    const drug = await this.drugRepository.findById(
      query.singleDrugQueryDto.id,
    );

    if (!drug.id) {
      throw new NotFoundException('Drug resource not found');
    }

    return { ...drug, availableAt: drug.availableAt.toISOString() };
  }
}
