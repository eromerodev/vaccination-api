import { VaccinationDto } from '../../dto/vaccination.dto';

export class UpdateVaccinationCommand {
  constructor(public updateVaccinationDto: VaccinationDto) {}
}
