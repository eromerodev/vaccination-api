import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('drug')
export class DrugEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'drug_name' })
  name: string;

  @Column({ name: 'is_approved' })
  approved: boolean;

  @Column({ name: 'min_dose' })
  minDose: number;

  @Column({ name: 'max_dose' })
  maxDose: number;

  @Column({ name: 'available_at' })
  availableAt: Date;
}
