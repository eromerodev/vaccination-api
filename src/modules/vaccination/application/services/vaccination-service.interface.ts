import { CreateVaccinationRequest } from '../dto/vaccinaction-request.dto';
import { UpdateVaccinationRequest } from '../dto/vaccinaction-request.dto';
import { VaccinationResponseDto } from '../dto/vaccination-response.dto';
import { VaccinationResponseListDto } from '../dto/vaccination-response.dto';

export interface IVaccinationService {
  create(
    createVaccinationRequest: CreateVaccinationRequest,
  ): Promise<VaccinationResponseDto>;

  update(
    updateVaccinationRequest: UpdateVaccinationRequest,
  ): Promise<VaccinationResponseDto>;

  find(): Promise<VaccinationResponseListDto>;

  delete(id: number): Promise<void>;
}
