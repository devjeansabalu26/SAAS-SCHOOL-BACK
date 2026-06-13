import { Controller, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AlumnosService } from './alumnos.service';
import { Protected } from '../../common/decorators/protected.decorator';

@ApiTags('Alumnos')
@ApiBearerAuth('Bearer')
@Controller('alumnos')
@Protected()
export class AlumnosController {
  constructor(private readonly alumnosService: AlumnosService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los alumnos',
    description: 'Retorna una lista de todos los alumnos registrados',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de alumnos obtenida exitosamente',
    schema: {
      example: [
        {
          id: 1,
          nombre: 'Maria',
          apellido: 'García',
          email: 'maria@example.com',
        },
      ],
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  findAll() {
    return this.alumnosService.findAll();
  }
}
