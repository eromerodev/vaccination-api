import { SingleDrugQueryDto } from '@vaccination/application/dto/single-drug-query.dto';

export class FindSingleDrugQuery {
  constructor(public singleDrugQueryDto: SingleDrugQueryDto) {}
}
