import { DrugDto } from './drug.dto';

export class VaccinationDto {
  id: number;
  name: string;
  drug: DrugDto;
  dose: number;
  date: string;
}
