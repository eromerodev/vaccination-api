import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VaccinationDto } from '@vaccination/application/dto/vaccination.dto';
import { CreateVaccinationCommand } from './create-vaccination.command';
import { IVaccinationRepository } from '@vaccination/domain/interfaces/vaccination-repository.interface';
import { Vaccination } from '@vaccination/domain/entities/vaccination';

@CommandHandler(CreateVaccinationCommand)
export class CreateVaccinationHandler
  implements ICommandHandler<CreateVaccinationCommand, VaccinationDto>
{
  /**
   *
   */
  constructor(
    @Inject('VaccinationRepository')
    private readonly vaccinationRepository: IVaccinationRepository,
  ) {}

  async execute(command: CreateVaccinationCommand): Promise<VaccinationDto> {
    const newVaccination = new Vaccination();
    const { drug } = command.createVaccinationDto;

    newVaccination.name = command.createVaccinationDto.name;
    newVaccination.dose = command.createVaccinationDto.dose;
    newVaccination.date = new Date(command.createVaccinationDto.date);

    newVaccination.drug = {
      ...drug,
      availableAt: new Date(drug.availableAt),
    };

    //business rules
    newVaccination.validateDose();
    newVaccination.validateDate();

    //create
    const vaccination = await this.vaccinationRepository.save(newVaccination);
    return {
      id: vaccination.id,
      name: vaccination.name,
      dose: vaccination.dose,
      date: vaccination.date.toISOString(),
      drug,
    };
  }
}
