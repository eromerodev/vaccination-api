import { map } from 'lodash';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { IVaccinationService } from './vaccination-service.interface';
import { FindSingleDrugQuery } from '../cqrs/query/find-single-drug.query';
import { CreateVaccinationCommand } from '../cqrs/command/create-vaccination.command';
import { UpdateVaccinationCommand } from '../cqrs/command/update-vaccination.command';
import { DeleteVaccinationCommand } from '../cqrs/command/delete-vaccination.command';
import { ListingVaccinationQuery } from '../cqrs/query/listing-vaccination.query';
import { SingleDrugQueryDto } from '../dto/single-drug-query.dto';
import { VaccinationDto } from '../dto/vaccination.dto';
import { CreateVaccinationRequest } from '../dto/vaccinaction-request.dto';
import { UpdateVaccinationRequest } from '../dto/vaccinaction-request.dto';
import { VaccinationResponseDto } from '../dto/vaccination-response.dto';
import { VaccinationResponseListDto } from '../dto/vaccination-response.dto';
import { drugDtoToResponse } from '../dto/drug-response.dto';

@Injectable()
export class VaccinationService implements IVaccinationService {
  /**
   *
   */
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async create(
    createVaccinationRequest: CreateVaccinationRequest,
  ): Promise<VaccinationResponseDto> {
    //1. find drug
    const singleDrugQueryDto = plainToClass(
      SingleDrugQueryDto,
      createVaccinationRequest,
    );

    const drug = await this.queryBus.execute(
      new FindSingleDrugQuery(singleDrugQueryDto),
    );

    //2. create vaccinate
    const createVaccinationDto = new VaccinationDto();
    createVaccinationDto.name = createVaccinationRequest.name;
    createVaccinationDto.dose = createVaccinationRequest.dose;
    createVaccinationDto.date = createVaccinationRequest.date;
    createVaccinationDto.drug = drug;

    const output = await this.commandBus.execute(
      new CreateVaccinationCommand(createVaccinationDto),
    );

    return {
      ...output,
      drug: drugDtoToResponse(output.drug),
    };
  }

  async update(
    updateVaccinationRequest: UpdateVaccinationRequest,
  ): Promise<VaccinationResponseDto> {
    //1. find drug
    const singleDrugQueryDto = plainToClass(
      SingleDrugQueryDto,
      updateVaccinationRequest,
    );

    const drug = await this.queryBus.execute(
      new FindSingleDrugQuery(singleDrugQueryDto),
    );

    //2. create vaccinate
    const updateVaccinationDto = new VaccinationDto();
    updateVaccinationDto.id = updateVaccinationRequest.id;
    updateVaccinationDto.name = updateVaccinationRequest.name;
    updateVaccinationDto.dose = updateVaccinationRequest.dose;
    updateVaccinationDto.date = updateVaccinationRequest.date;
    updateVaccinationDto.drug = drug;

    const output = await this.commandBus.execute(
      new UpdateVaccinationCommand(updateVaccinationDto),
    );

    return {
      ...output,
      drug: drugDtoToResponse(output.drug),
    };
  }

  async find(): Promise<VaccinationResponseListDto> {
    const data: VaccinationResponseDto[] = [];
    const vaccinationListDto = await this.queryBus.execute(
      new ListingVaccinationQuery(),
    );

    //data format
    map(vaccinationListDto, (vaccinationDto: VaccinationDto) => {
      data.push({
        ...vaccinationDto,
        drug: drugDtoToResponse(vaccinationDto.drug),
      });
    });

    return { data };
  }

  async delete(id: number): Promise<void> {
    await this.commandBus.execute(new DeleteVaccinationCommand(id));
  }
}
