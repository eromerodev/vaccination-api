import { ConflictException, Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DrugDto } from '@vaccination/application/dto/drug.dto';
import { UpdateDrugCommand } from './update-drug.command';
import { IDrugRepository } from '@vaccination/domain/interfaces/drug-repository.interface';

@CommandHandler(UpdateDrugCommand)
export class UpdateDrugHandler
  implements ICommandHandler<UpdateDrugCommand, DrugDto>
{
  /**
   *
   */
  constructor(
    @Inject('DrugRepository') private readonly drugRepository: IDrugRepository,
  ) {}

  async execute(command: UpdateDrugCommand): Promise<DrugDto> {
    const currentDrug = await this.drugRepository.findById(
      command.updateDrugDto.id,
    );

    if (!currentDrug.id) {
      throw new NotFoundException('Drug resource not found');
    }

    currentDrug.name = command.updateDrugDto.name;
    currentDrug.approved = command.updateDrugDto.approved;
    currentDrug.minDose = command.updateDrugDto.minDose;
    currentDrug.maxDose = command.updateDrugDto.maxDose;
    currentDrug.availableAt = new Date(command.updateDrugDto.availableAt);

    if (currentDrug.minDose > currentDrug.maxDose) {
      throw new ConflictException('min_dose must not be greater than max_dose');
    }

    const drug = await this.drugRepository.save(currentDrug);
    return { ...drug, availableAt: drug.availableAt.toISOString() };
  }
}
