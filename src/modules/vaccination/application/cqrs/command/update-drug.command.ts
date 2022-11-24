import { DrugDto } from '../../dto/drug.dto';

export class UpdateDrugCommand {
  constructor(public updateDrugDto: DrugDto) {}
}
