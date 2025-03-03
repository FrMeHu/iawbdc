import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { AlumnoRealizaPracticaService } from './alumnorealizapractica.service';
import { CreateAlumnoRealizaPracticaDto } from './dto/create-alumnorealizapractica.dto';
import { UpdateAlumnorealizapracticaDto } from './dto/update-alumnorealizapractica.dto';
import { AlumnoRealizaPractica } from './entities/alumnorealizapractica.entity';

@Controller('alumno_realiza_practica')
export class AlumnoRealizaPracticaController {
  constructor(private readonly arpService: AlumnoRealizaPracticaService) {}

  @Post()
  async create(@Body() createDto: CreateAlumnoRealizaPracticaDto) {
    return await this.arpService.create(createDto);
  }

  @Get(':id_alumno/:id_practica')
  async findOne(
    @Param('id_alumno') id_alumno: number,
    @Param('id_practica') id_practica: number,
  ) {
    return await this.arpService.findOne(id_alumno, id_practica);
  }

  @Delete(':id_alumno/:id_practica')
  remove(
    @Param('id_alumno', ParseIntPipe) id_alumno: number,
    @Param('id_practica', ParseIntPipe) id_practica: number,
  ) {
    return this.arpService.remove(id_alumno, id_practica);
    }

    @Patch(':id_alumno/:id_practica')
    async update(
      @Param('id_alumno', ParseIntPipe) id_alumno: number,
      @Param('id_practica', ParseIntPipe) id_practica: number,
      @Body() updateDto: UpdateAlumnorealizapracticaDto,
    ) {
      return await this.arpService.update(id_alumno, id_practica, updateDto);
    }
    @Get()
    async findAll(): Promise<AlumnoRealizaPractica[]> {
    return await this.arpService.findAll();
  }
  }

