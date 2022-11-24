import { Inject, Controller, Body, Param } from '@nestjs/common';
import { Post, Put, Get, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { IVaccinationService } from '@vaccination/application/services/vaccination-service.interface';
import {
  CreateVaccinationRequest,
  UpdateVaccinationRequest,
  VaccinationRequestDto,
} from '@vaccination/application/dto/vaccinaction-request.dto';

@Controller('vaccination')
@ApiBearerAuth('JwtAuth')
@UseGuards(JwtAuthGuard)
@ApiTags('Vaccination')
export class VaccinationController {
  /**
   *
   */
  constructor(
    @Inject('VaccinationService')
    private readonly vaccinationService: IVaccinationService,
  ) {}

  @ApiOperation({
    summary: 'Create vaccination resource',
  })
  @ApiBody({
    type: VaccinationRequestDto,
  })
  @Post()
  async create(@Body() createVaccinationRequest: CreateVaccinationRequest) {
    return await this.vaccinationService.create(createVaccinationRequest);
  }

  @ApiOperation({
    summary: 'Update vaccination resource',
  })
  @ApiBody({
    type: VaccinationRequestDto,
  })
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() updateVaccinationRequest: UpdateVaccinationRequest,
  ) {
    return await this.vaccinationService.update({
      id,
      ...updateVaccinationRequest,
    });
  }

  @ApiOperation({
    summary: 'Return a list of resources',
  })
  @Get()
  async find() {
    return await this.vaccinationService.find();
  }

  @ApiOperation({
    summary: 'Delete vaccination resource by id',
  })
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    await this.vaccinationService.delete(id);
  }
}
