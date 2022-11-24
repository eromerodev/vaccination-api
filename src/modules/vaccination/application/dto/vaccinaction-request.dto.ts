import { ApiProperty } from '@nestjs/swagger';

export class VaccinationRequestDto {
  @ApiProperty({
    example: 'Enrique Romero',
    description: 'Individual or person name',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: 1,
    required: true,
  })
  drug_id: number;

  @ApiProperty({
    example: 3,
    required: true,
  })
  dose: number;

  @ApiProperty({
    example: '2022-11-23T03:00:00.000Z',
    description: 'Vaccination date',
    required: true,
  })
  date: string;
}

export class CreateVaccinationRequest extends VaccinationRequestDto {}

export class UpdateVaccinationRequest extends VaccinationRequestDto {
  id: number;
}
