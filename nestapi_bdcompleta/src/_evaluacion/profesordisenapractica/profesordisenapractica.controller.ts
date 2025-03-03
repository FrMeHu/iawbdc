import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { ProfesorDisenaPracticaService } from './profesordisenapractica.service';
import { CreateProfesorDisenaPracticaDto } from './dto/create-profesordisenapractica.dto';
import { ProfesorDisenaPractica } from './entities/profesordisenapractica.entity';
import { UpdateProfesorDisenaPracticaDto } from './dto/update-profesordisenapractica.dto';

@Controller('profesor_disena_practica')
export class ProfesorDisenaPracticaController {
  constructor(private readonly pdpService: ProfesorDisenaPracticaService) {}

  @Post()
  async create(@Body() createDto: CreateProfesorDisenaPracticaDto) {
    return await this.pdpService.create(createDto);
  }

  @Get()
  async findAll(): Promise<ProfesorDisenaPractica[]> {
    return await this.pdpService.findAll();
  }

  @Get(':id_profesor/:id_practica')
  async findOne(
    @Param('id_profesor', ParseIntPipe) id_profesor: number,
    @Param('id_practica', ParseIntPipe) id_practica: number,
  ) {
    return await this.pdpService.findOne(id_profesor, id_practica);
  }

  @Patch(':id_profesor/:id_practica')
  async update(
    @Param('id_profesor', ParseIntPipe) id_profesor: number,
    @Param('id_practica', ParseIntPipe) id_practica: number,
    @Body() updateDto: UpdateProfesorDisenaPracticaDto,
  ) {
    return await this.pdpService.update(id_profesor, id_practica, updateDto);
  }

  @Delete(':id_profesor/:id_practica')
  async remove(
    @Param('id_profesor', ParseIntPipe) id_profesor: number,
    @Param('id_practica', ParseIntPipe) id_practica: number,
  ) {
    await this.pdpService.remove(id_profesor, id_practica);
  }


}
