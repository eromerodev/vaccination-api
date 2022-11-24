import { DrugResponseDto } from './drug-response.dto';

export type VaccinationResponseDto = {
  id: number;
  name: string;
  drug: DrugResponseDto;
  dose: number;
  date: string;
};

export type VaccinationResponseListDto = {
  data: VaccinationResponseDto[];
};
