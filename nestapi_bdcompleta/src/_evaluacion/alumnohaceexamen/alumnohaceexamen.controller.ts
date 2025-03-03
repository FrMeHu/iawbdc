import { Controller, Post, Body, Get, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { AlumnoHaceExamenService } from './alumnohaceexamen.service';
import { CreateAlumnoHaceExamenDto } from './dto/create-alumnohaceexaman.dto';
import { UpdateAlumnoHaceExamenDto } from './dto/update-alumnohaceexaman.dto';
import { AlumnoHaceExamenTeorico } from './entities/alumnohaceexaman.entity';

@Controller('alumno_hace_examen')
export class AlumnoHaceExamenController {
  constructor(private readonly aheService: AlumnoHaceExamenService) {}

  @Post()
  async create(@Body() createDto: CreateAlumnoHaceExamenDto): Promise<AlumnoHaceExamenTeorico> {
    return await this.aheService.create(createDto);
  }

  @Get(':id_alumno/:id_examen')
  async findOne(
    @Param('id_alumno', ParseIntPipe) id_alumno: number,
    @Param('id_examen', ParseIntPipe) id_examen: number,
  ): Promise<AlumnoHaceExamenTeorico> {
    return await this.aheService.findOne(id_alumno, id_examen);
  }

  @Patch(':id_alumno/:id_examen')
  async update(
    @Param('id_alumno', ParseIntPipe) id_alumno: number,
    @Param('id_examen', ParseIntPipe) id_examen: number,
    @Body() updateDto: UpdateAlumnoHaceExamenDto,
  ): Promise<AlumnoHaceExamenTeorico> {
    return await this.aheService.update(id_alumno, id_examen, updateDto);
  }

  @Delete(':id_alumno/:id_examen')
  async remove(
    @Param('id_alumno', ParseIntPipe) id_alumno: number,
    @Param('id_examen', ParseIntPipe) id_examen: number,
  ): Promise<void> {
    return await this.aheService.remove(id_alumno, id_examen);
  }
}
