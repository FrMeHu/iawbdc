import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { Profesor } from './entities/profesor.entity';

@Controller('profesores')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  async create(@Body() createProfesorDto: CreateProfesorDto): Promise<Profesor> {
    return await this.profesorService.create(createProfesorDto);
  }

  @Get()
  async findAll(): Promise<Profesor[]> {
    return await this.profesorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Profesor> {
    return await this.profesorService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfesorDto: UpdateProfesorDto,
  ): Promise<Profesor> {
    return await this.profesorService.update(id, updateProfesorDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.profesorService.remove(id);
  }
}
