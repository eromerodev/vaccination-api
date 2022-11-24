import { ConflictException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DrugDto } from '@vaccination/application/dto/drug.dto';
import { CreateDrugCommand } from './create-drug.command';
import { IDrugRepository } from '@vaccination/domain/interfaces/drug-repository.interface';
import { Drug } from '@vaccination/domain/entities/drug';

@CommandHandler(CreateDrugCommand)
export class CreateDrugHandler
  implements ICommandHandler<CreateDrugCommand, DrugDto>
{
  /**
   *
   */
  constructor(
    @Inject('DrugRepository') private readonly drugRepository: IDrugRepository,
  ) {}

  async execute(command: CreateDrugCommand): Promise<DrugDto> {
    const newDrug = new Drug();
    newDrug.name = command.createDrugDto.name;
    newDrug.approved = command.createDrugDto.approved;
    newDrug.minDose = command.createDrugDto.minDose;
    newDrug.maxDose = command.createDrugDto.maxDose;
    newDrug.availableAt = new Date(command.createDrugDto.availableAt);

    if (newDrug.minDose > newDrug.maxDose) {
      throw new ConflictException('min_dose must not be greater than max_dose');
    }

    const drug = await this.drugRepository.save(newDrug);
    return { ...drug, availableAt: drug.availableAt.toISOString() };
  }
}
