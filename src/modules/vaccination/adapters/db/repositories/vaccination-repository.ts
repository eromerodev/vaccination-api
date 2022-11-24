import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IVaccinationRepository } from '@vaccination/domain/interfaces/vaccination-repository.interface';
import { Vaccination } from '@vaccination/domain/entities/vaccination';
import { VaccinationEntity } from '../models/vaccination.entity';

@Injectable()
export class VaccinationRepository implements IVaccinationRepository {
  /**
   *
   */
  constructor(
    @InjectRepository(VaccinationEntity)
    private readonly repository: Repository<VaccinationEntity>,
  ) {}

  async findById(id: number): Promise<Vaccination> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) return {} as Vaccination;
    return entity as Vaccination;
  }

  async findAll(): Promise<Vaccination[]> {
    const result = await this.repository.find({
      relations: ['drug'],
      order: {
        id: 'DESC',
      },
    });
    console.log(result);
    return result as Vaccination[];
  }

  async save(vaccination: Vaccination): Promise<Vaccination> {
    const entity = await this.repository.save({ ...vaccination });
    return entity as Vaccination;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
