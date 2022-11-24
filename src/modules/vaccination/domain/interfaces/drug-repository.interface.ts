import { Drug } from '@vaccination/domain/entities/drug';

export interface IDrugRepository {
  findById(id: number): Promise<Drug>;
  findAll(): Promise<Drug[]>;
  save(drug: Drug): Promise<Drug>;
  delete(id: number): Promise<void>;
}
