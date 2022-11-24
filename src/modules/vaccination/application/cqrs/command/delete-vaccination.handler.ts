import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteVaccinationCommand } from './delete-vaccination.command';
import { IVaccinationRepository } from '@vaccination/domain/interfaces/vaccination-repository.interface';

@CommandHandler(DeleteVaccinationCommand)
export class DeleteVaccinationHandler
  implements ICommandHandler<DeleteVaccinationCommand, void>
{
  /**
   *
   */
  constructor(
    @Inject('VaccinationRepository')
    private readonly vaccinationRepository: IVaccinationRepository,
  ) {}

  async execute(command: DeleteVaccinationCommand): Promise<void> {
    await this.vaccinationRepository.delete(command.vaccinationId);
  }
}
