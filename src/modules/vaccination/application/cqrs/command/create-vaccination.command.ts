import { VaccinationDto } from '../../dto/vaccination.dto';

export class CreateVaccinationCommand {
  constructor(public createVaccinationDto: VaccinationDto) {}
}
