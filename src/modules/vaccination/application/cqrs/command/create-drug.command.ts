import { DrugDto } from '../../dto/drug.dto';

export class CreateDrugCommand {
  constructor(public createDrugDto: DrugDto) {}
}
