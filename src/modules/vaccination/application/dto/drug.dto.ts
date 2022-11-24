import { Expose } from 'class-transformer';

export class DrugDto {
  id: number;

  name: string;

  approved: boolean;

  @Expose({ name: 'min_dose' })
  minDose: number;

  @Expose({ name: 'max_dose' })
  maxDose: number;

  @Expose({ name: 'available_at' })
  availableAt: string;
}
