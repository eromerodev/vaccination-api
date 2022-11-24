import { Inject, Controller, Body, Param } from '@nestjs/common';
import { Post, Put, Get, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { IDrugService } from '@vaccination/application/services/drug-service.interface';
import {
  DrugRequestDto,
  CreateDrugRequest,
  UpdateDrugRequest,
} from '@vaccination/application/dto/drug-request.dto';

@Controller('drugs')
@ApiBearerAuth('JwtAuth')
@UseGuards(JwtAuthGuard)
@ApiTags('Drugs')
export class DrugController {
  /**
   *
   */
  constructor(
    @Inject('DrugService')
    private readonly drugService: IDrugService,
  ) {}

  @ApiOperation({
    summary: 'Create drug resource',
  })
  @ApiBody({
    type: DrugRequestDto,
  })
  @Post()
  async create(@Body() createDrugRequest: CreateDrugRequest) {
    return this.drugService.create(createDrugRequest);
  }

  @ApiOperation({
    summary: 'Update drug resource',
  })
  @ApiBody({
    type: DrugRequestDto,
  })
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() updateDrugRequest: UpdateDrugRequest,
  ) {
    return this.drugService.update({ id, ...updateDrugRequest });
  }

  @ApiOperation({
    summary: 'Return a list of resources',
  })
  @Get()
  async find() {
    return await this.drugService.find();
  }

  @ApiOperation({
    summary: 'Delete drug resource by id',
  })
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    await this.drugService.delete(id);
  }
}
