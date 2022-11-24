import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IDrugRepository } from '@vaccination/domain/interfaces/drug-repository.interface';
import { Drug } from '@vaccination/domain/entities/drug';
import { DrugEntity } from '../models/drug.entity';

@Injectable()
export class DrugRepository implements IDrugRepository {
  /**
   *
   */
  constructor(
    @InjectRepository(DrugEntity)
    private readonly repository: Repository<DrugEntity>,
  ) {}

  async findById(id: number): Promise<Drug> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) return {} as Drug;
    return entity as Drug;
  }

  async findAll(): Promise<Drug[]> {
    const result = await this.repository.find({
      order: {
        id: 'DESC',
      },
    });
    return result as Drug[];
  }

  async save(drug: Drug): Promise<Drug> {
    const entity = await this.repository.save({ ...drug });
    return entity as Drug;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
