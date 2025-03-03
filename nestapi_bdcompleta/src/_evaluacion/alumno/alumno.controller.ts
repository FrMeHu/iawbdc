import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';

@Controller('alumnos')
export class AlumnoController {
  constructor(private readonly alumnoService: AlumnoService) {}

  @Post()
  async create(@Body() createAlumnoDto: CreateAlumnoDto): Promise<Alumno> {
    return await this.alumnoService.create(createAlumnoDto);
  }

  @Get()
  async findAll(): Promise<Alumno[]> {
    return await this.alumnoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Alumno> {
    return await this.alumnoService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAlumnoDto: UpdateAlumnoDto,
  ): Promise<Alumno> {
    return await this.alumnoService.update(id, updateAlumnoDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.alumnoService.remove(id);
  }
}
