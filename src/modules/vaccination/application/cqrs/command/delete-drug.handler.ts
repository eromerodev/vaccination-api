import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteDrugCommand } from './delete-drug.command';
import { IDrugRepository } from '@vaccination/domain/interfaces/drug-repository.interface';

@CommandHandler(DeleteDrugCommand)
export class DeleteDrugHandler
  implements ICommandHandler<DeleteDrugCommand, void>
{
  /**
   *
   */
  constructor(
    @Inject('DrugRepository') private readonly drugRepository: IDrugRepository,
  ) {}

  async execute(command: DeleteDrugCommand): Promise<void> {
    await this.drugRepository.delete(command.drugId);
  }
}
