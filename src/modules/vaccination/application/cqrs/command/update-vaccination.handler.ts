import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VaccinationDto } from '@vaccination/application/dto/vaccination.dto';
import { UpdateVaccinationCommand } from './update-vaccination.command';
import { IVaccinationRepository } from '@vaccination/domain/interfaces/vaccination-repository.interface';
import { Vaccination } from '@vaccination/domain/entities/vaccination';

@CommandHandler(UpdateVaccinationCommand)
export class UpdateVaccinationHandler
  implements ICommandHandler<UpdateVaccinationCommand, VaccinationDto>
{
  /**
   *
   */
  constructor(
    @Inject('VaccinationRepository')
    private readonly vaccinationRepository: IVaccinationRepository,
  ) {}

  async execute(command: UpdateVaccinationCommand): Promise<VaccinationDto> {
    const currentVaccination = await this.vaccinationRepository.findById(
      command.updateVaccinationDto.id,
    );

    if (!currentVaccination.id) {
      throw new NotFoundException('Vaccination resource not found');
    }

    const { drug } = command.updateVaccinationDto;
    const updatedVacination = new Vaccination();

    updatedVacination.id = currentVaccination.id;
    updatedVacination.name = command.updateVaccinationDto.name;
    updatedVacination.dose = command.updateVaccinationDto.dose;
    updatedVacination.date = new Date(command.updateVaccinationDto.date);

    updatedVacination.drug = {
      ...drug,
      availableAt: new Date(drug.availableAt),
    };

    //business rules
    updatedVacination.validateDose();
    updatedVacination.validateDate();

    //update
    const vaccination = await this.vaccinationRepository.save(
      updatedVacination,
    );
    return {
      id: vaccination.id,
      name: vaccination.name,
      dose: vaccination.dose,
      date: vaccination.date.toISOString(),
      drug,
    };
  }
}
