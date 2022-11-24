import { BusinessException } from '@shared/exceptions/business.exception';
import { Drug } from './drug';

export class Vaccination {
  id: number;
  name: string;
  drug: Drug;
  dose: number;
  date: Date;

  validateDose() {
    if (this.dose < this.drug.minDose || this.dose > this.drug.maxDose) {
      throw new BusinessException(
        'The dose is not within the allowed parameters',
      );
    }
  }

  validateDate() {
    if (this.date <= this.drug.availableAt) {
      throw new BusinessException(
        'The vaccination date must be greater than drug available date',
      );
    }
  }
}
