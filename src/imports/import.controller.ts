import { Controller, Get } from '@nestjs/common';
import { ImportService } from '../imports/import.service';
import { Import } from './import.entity';

@Controller('imports')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Get('/')
  public async getAll(): Promise<Import[]> {
    return this.importService.getAll();
  }
}
