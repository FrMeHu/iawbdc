import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ExamenteoricoService } from './examenteorico.service';
import { CreateExamenTeoricoDto } from './dto/create-examenteorico.dto';
import { UpdateExamenTeoricoDto } from './dto/update-examenteorico.dto';
import { ExamenTeorico } from './entities/examenteorico.entity';

@Controller('examenes_teoricos')
export class ExamenteoricoController {
  constructor(private readonly examenTeoricoService: ExamenteoricoService) {}

  @Post()
  async create(@Body() createDto: CreateExamenTeoricoDto): Promise<ExamenTeorico> {
    return await this.examenTeoricoService.create(createDto);
  }

  @Get()
  async findAll(): Promise<ExamenTeorico[]> {
    return await this.examenTeoricoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ExamenTeorico> {
    return await this.examenTeoricoService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateExamenTeoricoDto,
  ): Promise<ExamenTeorico> {
    return await this.examenTeoricoService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.examenTeoricoService.remove(id);
  }
}
