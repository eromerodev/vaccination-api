import { map } from 'lodash';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { IDrugService } from './drug-service.interface';
import { CreateDrugCommand } from '../cqrs/command/create-drug.command';
import { UpdateDrugCommand } from '../cqrs/command/update-drug.command';
import { ListingDrugQuery } from '../cqrs/query/listing-drug.query';
import { DrugDto } from '../dto/drug.dto';
import { CreateDrugRequest, UpdateDrugRequest } from '../dto/drug-request.dto';
import {
  drugDtoToResponse,
  DrugResponseDto,
  DrugResponseListDto,
} from '../dto/drug-response.dto';
import { DeleteDrugCommand } from '../cqrs/command/delete-drug.command';

@Injectable()
export class DrugService implements IDrugService {
  /**
   *
   */
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async create(createDrugRequest: CreateDrugRequest): Promise<DrugResponseDto> {
    const createDrugDto = plainToClass(DrugDto, createDrugRequest);
    const output = await this.commandBus.execute(
      new CreateDrugCommand(createDrugDto),
    );
    return {
      id: output.id,
      ...createDrugRequest,
    };
  }

  async update(updateDrugRequest: UpdateDrugRequest): Promise<DrugResponseDto> {
    const updateDrugDto = plainToClass(DrugDto, updateDrugRequest);
    const output = await this.commandBus.execute(
      new UpdateDrugCommand(updateDrugDto),
    );
    return {
      id: output.id,
      ...updateDrugRequest,
    };
  }

  async find(): Promise<DrugResponseListDto> {
    const data: DrugResponseDto[] = [];
    const drugListDto = await this.queryBus.execute(new ListingDrugQuery());
    map(drugListDto, (drugDto: DrugDto) => {
      data.push(drugDtoToResponse(drugDto));
    });

    return { data };
  }

  async delete(id: number): Promise<void> {
    await this.commandBus.execute(new DeleteDrugCommand(id));
  }
}
