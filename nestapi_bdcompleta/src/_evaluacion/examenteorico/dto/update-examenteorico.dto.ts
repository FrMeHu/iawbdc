import { PartialType } from '@nestjs/mapped-types';
import { CreateExamenTeoricoDto } from './create-examenteorico.dto';

export class UpdateExamenTeoricoDto extends PartialType(CreateExamenTeoricoDto) {}
