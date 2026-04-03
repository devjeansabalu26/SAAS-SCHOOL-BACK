import { Controller, Get } from '@nestjs/common';
import { ColegiosService } from './colegios.service';

@Controller('colegios')
export class ColegiosController {
  constructor(private readonly colegiosService: ColegiosService) {}

  @Get()
  findAll() {
    return this.colegiosService.findAll();
  }
}
