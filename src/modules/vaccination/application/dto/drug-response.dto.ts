import { DrugRequestDto } from './drug-request.dto';
import { DrugDto } from './drug.dto';

export type DrugResponseDto = {
  id: number;
} & DrugRequestDto;

export type DrugResponseListDto = {
  data: DrugResponseDto[];
};

export const drugDtoToResponse = (drugDto: DrugDto) => {
  return {
    id: drugDto.id,
    name: drugDto.name,
    approved: drugDto.approved,
    min_dose: drugDto.minDose,
    max_dose: drugDto.maxDose,
    available_at: drugDto.availableAt,
  };
};
