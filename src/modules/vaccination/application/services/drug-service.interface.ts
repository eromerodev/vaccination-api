import { CreateDrugRequest, UpdateDrugRequest } from '../dto/drug-request.dto';
import { DrugResponseDto, DrugResponseListDto } from '../dto/drug-response.dto';

export interface IDrugService {
  create(createDrugRequest: CreateDrugRequest): Promise<DrugResponseDto>;
  update(updateDrugRequest: UpdateDrugRequest): Promise<DrugResponseDto>;
  find(): Promise<DrugResponseListDto>;
  delete(id: number): Promise<void>;
}
