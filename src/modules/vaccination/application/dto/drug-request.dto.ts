import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString, Min } from 'class-validator';

export class DrugRequestDto {
  @ApiProperty({
    description: 'Approved or generic name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: true,
    required: true,
  })
  @IsBoolean()
  @Type(() => Boolean)
  approved: boolean;

  @ApiProperty({
    example: 0,
    required: true,
  })
  @IsNotEmpty()
  @Min(1)
  min_dose: number;

  @ApiProperty({
    example: 0,
    required: true,
  })
  @IsNotEmpty()
  @Min(1)
  max_dose: number;

  @ApiProperty({
    example: '2021-11-13T03:00:00.000Z',
    description: 'Drug available date',
    required: true,
  })
  available_at: string;
}

export class CreateDrugRequest extends DrugRequestDto {}

export class UpdateDrugRequest extends DrugRequestDto {
  id: number;
}
