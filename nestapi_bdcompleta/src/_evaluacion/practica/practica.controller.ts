import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PracticaService } from './practica.service';
import { CreatePracticaDto } from './dto/create-practica.dto';
import { UpdatePracticaDto } from './dto/update-practica.dto';

@Controller('practicas')
export class PracticaController {
  constructor(private readonly practicaService: PracticaService) {}

  @Post()
  create(@Body() createPracticaDto: CreatePracticaDto) {
    return this.practicaService.create(createPracticaDto);
  }

  @Get()
  findAll() {
    return this.practicaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.practicaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePracticaDto: UpdatePracticaDto) {
    return this.practicaService.update(id, updatePracticaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.practicaService.remove(id);
  }
}
