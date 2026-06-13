import { Controller, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ColegiosService } from './colegios.service';
import { Protected } from '../../common/decorators/protected.decorator';

@ApiTags('Colegios')
@ApiBearerAuth('Bearer')
@Controller('colegios')
@Protected()
export class ColegiosController {
  constructor(private readonly colegiosService: ColegiosService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los colegios',
    description: 'Retorna una lista de todos los colegios en el sistema',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de colegios obtenida exitosamente',
    schema: {
      example: [
        {
          id: 1,
          nombre: 'Colegio San José',
          ciudad: 'Lima',
          telefono: '+51998765432',
        },
      ],
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  findAll() {
    return this.colegiosService.findAll();
  }
}
