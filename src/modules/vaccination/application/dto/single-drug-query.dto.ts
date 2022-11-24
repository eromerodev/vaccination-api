import { Expose } from 'class-transformer';

export class SingleDrugQueryDto {
  @Expose({ name: 'drug_id' })
  id: number;
}
