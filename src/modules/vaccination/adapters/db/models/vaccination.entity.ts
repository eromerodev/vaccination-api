import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { DrugEntity } from './drug.entity';

@Entity('vaccination')
export class VaccinationEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'individual_name' })
  name: string;

  @Column({ name: 'dose' })
  dose: number;

  @Column({ name: 'vac_date' })
  date: Date;

  @OneToOne(() => DrugEntity)
  @JoinColumn([{ name: 'drug_id' }])
  drug!: DrugEntity;
}
