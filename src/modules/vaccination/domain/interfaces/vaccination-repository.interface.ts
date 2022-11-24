import { Vaccination } from '@vaccination/domain/entities/vaccination';

export interface IVaccinationRepository {
  findById(id: number): Promise<Vaccination>;
  findAll(): Promise<Vaccination[]>;
  save(vaccination: Vaccination): Promise<Vaccination>;
  delete(id: number): Promise<void>;
}
